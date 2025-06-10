#!/bin/bash

cat > compose.prod.yaml <<EOF
services:
  portfolio_frontend:
    ports:
      - "${SERVER_IP}:${SERVER_PORT}:3000"

EOF
