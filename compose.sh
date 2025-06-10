#!/bin/bash

cat > compose.prod.yaml <<EOF
services:
  portfolio_frontend:
    ports:
      - "${SERVER_PORT}:3000:3000"

EOF
