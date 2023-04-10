# Dockerfile - gpt_service

# Base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN npm install

# Expose the port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
