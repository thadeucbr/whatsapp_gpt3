# Dockerfile - gpt_service

# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY ./src/gpt_service .
RUN npm install

# Expose the port
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
