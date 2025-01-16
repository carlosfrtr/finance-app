#!/bin/bash

# Define the custom domain and local IP
CUSTOM_DOMAIN="finance.torres.fortal.br"
LOCAL_IP="127.0.0.1"
CUSTOM_PORT="443"  # Change this to your desired port
LOCAL_PORT="3000"  # The port your Next.js app will run on


# Check if the custom domain is already in the hosts file
if ! grep -q "$CUSTOM_DOMAIN" /etc/hosts; then
    echo "Adding $CUSTOM_DOMAIN to /etc/hosts"
    echo "$LOCAL_IP   $CUSTOM_DOMAIN" | sudo tee -a /etc/hosts
else
    echo "$CUSTOM_DOMAIN is already in /etc/hosts"
fi

# Start the Next.js development server
echo "Starting Next.js development server on port $CUSTOM_PORT"
sudo npm run dev -- --experimental-https -H $CUSTOM_DOMAIN -p $CUSTOM_PORT