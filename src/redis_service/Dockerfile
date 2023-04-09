# Dockerfile - redis_service

# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN npm install

# Expose the port
EXPOSE 3001

# Start the app
CMD [ "npm", "start" ]
