import time
import json
import requests
import pika
import os

LAT = "-5.025300"
LON = "-39.837800"
URL = f"https://api.open-meteo.com/v1/forecast?latitude={LAT}&longitude={LON}&current=temperature_2m,relative_humidity_2m,wind_speed_10m"

RABBIT_HOST = os.getenv('RABBIT_HOST', 'rabbitmq')
RABBIT_USER = os.getenv('RABBITMQ_DEFAULT_USER', 'user')
RABBIT_PASS = os.getenv('RABBITMQ_DEFAULT_PASS', 'password123')
QUEUE_NAME = 'weather_data'
INTERVAL = int(os.getenv('COLLECT_INTERVAL_SECONDS', 600))

def get_weather():
    try:
        response = requests.get(URL)
        response.raise_for_status()
        data = response.json()
        current = data.get('current', {})

        payload = {
            "latitude": data.get('latitude'),
            "longitude": data.get('longitude'),
            "temperature": current.get('temperature_2m'),
            "humidity": current.get('relative_humidity_2m'),
            "wind_speed": current.get('wind_speed_10m'),
            "timestamp": current.get('time')
        }
        return payload
    except Exception as e:
        print(f"Erro ao buscar clima: {e}")
        return None

def get_rabbitmq_connection():
    credentials = pika.PlainCredentials(RABBIT_USER, RABBIT_PASS)
    parameters = pika.ConnectionParameters(host=RABBIT_HOST, credentials=credentials)

    while True:
        try:
            connection = pika.BlockingConnection(parameters)
            return connection
        except pika.exceptions.AMQPConnectionError:
            print("RabbitMQ ainda não está pronto. Tentando novamente em 5 segundos...")
            time.sleep(5)

def send_to_queue(payload):
    try:
        connection = get_rabbitmq_connection()
        channel = connection.channel()
        channel.queue_declare(queue=QUEUE_NAME, durable=True)

        message = json.dumps(payload)
        channel.basic_publish(
            exchange='',
            routing_key=QUEUE_NAME,
            body=message,
            properties=pika.BasicProperties(delivery_mode=2)
        )
        print(f"Enviado: {message}")
        connection.close()
    except Exception as e:
        print(f"Erro ao publicar: {e}")

if __name__ == "__main__":
    print(f"Iniciando Coletor... Conectando em {RABBIT_HOST} como {RABBIT_USER}")

    while True:
        weather_data = get_weather()
        if weather_data:
            send_to_queue(weather_data)

        time.sleep(INTERVAL)