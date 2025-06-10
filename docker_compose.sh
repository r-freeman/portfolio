#!/bin/bash

cat > docker-compose.prod.yaml <<EOF
networks:
  portfolio_net:
    driver: bridge
    name: portfolio_net

services:
  portfolio_frontend:
    container_name: portfolio_frontend
    image: portfolio/frontend
    build:
      context: .
      dockerfile: ./Dockerfile
    ports:
      - "${SERVER_PORT}:3000:3000"
    restart: unless-stopped
    networks:
      - portfolio_net
EOF
