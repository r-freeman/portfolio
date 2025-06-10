#!/bin/bash

cat > docker-compose.prod.yaml <<EOF
services:
    ports:
      - "${SERVER_IP}:3000:3000"
EOF
