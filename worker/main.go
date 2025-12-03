package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"time"

	amqp "github.com/rabbitmq/amqp091-go"
)

type WeatherData struct {
	Latitude    float64 `json:"latitude"`
	Longitude   float64 `json:"longitude"`
	Temperature float64 `json:"temperature"`
	Humidity    float64 `json:"humidity"`
	WindSpeed   float64 `json:"wind_speed"`
	Timestamp   string  `json:"timestamp"`
}

func main() {
	rabbitUser := os.Getenv("RABBITMQ_DEFAULT_USER")
	rabbitPass := os.Getenv("RABBITMQ_DEFAULT_PASS")
	rabbitHost := os.Getenv("RABBIT_HOST")
	backendUrl := os.Getenv("BACKEND_URL")

	if backendUrl == "" {
		backendUrl = "http://backend:3000/api/weather"
	}

	rabbitUrl := "amqp://" + rabbitUser + ":" + rabbitPass + "@" + rabbitHost + ":5672/"

	var conn *amqp.Connection
	var err error

	for {
		conn, err = amqp.Dial(rabbitUrl)
		if err == nil {
			log.Println("Conectado ao RabbitMQ com sucesso!")
			break
		}
		log.Printf("RabbitMQ indisponível (%s). Tentando em 5s...", err)
		time.Sleep(5 * time.Second)
	}
	defer conn.Close()

	ch, err := conn.Channel()
	failOnError(err, "Falha ao abrir canal")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		"weather_data",
		true,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Falha ao declarar fila")

	msgs, err := ch.Consume(
		q.Name,
		"",
		false,
		false,
		false,
		false,
		nil,
	)
	failOnError(err, "Falha ao registrar consumidor")

	forever := make(chan struct{})

	go func() {
		for d := range msgs {
			log.Printf("Recebido: %s", d.Body)

			var data WeatherData
			err := json.Unmarshal(d.Body, &data)
			if err != nil {
				log.Printf("Erro ao ler JSON: %s", err)
				d.Nack(false, false)
				continue
			}

			err = sendToBackend(data, backendUrl)
			if err != nil {
				log.Printf("Erro ao enviar para API (API offline?): %s", err)
				d.Ack(false)
			} else {
				log.Println("Sucesso! Dado enviado para a API.")
				d.Ack(false)
			}
		}
	}()

	log.Printf(" [*] Worker Go rodando. Aguardando mensagens...")
	<-forever
}

func sendToBackend(data WeatherData, url string) error {
	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 && resp.StatusCode != 201 {
		log.Printf("Backend retornou status: %d", resp.StatusCode)
	}

	return nil
}

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}
