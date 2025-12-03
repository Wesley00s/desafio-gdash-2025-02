FROM golang:1.20-alpine

WORKDIR /app

COPY go.mod ./

COPY *.go ./

RUN go mod tidy

RUN go build -o gdash-worker

CMD [ "./gdash-worker" ]