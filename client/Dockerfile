# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies in the container
RUN npm install

# Copy the rest of the application files to the container
COPY public ./public
COPY src ./src
COPY tailwind.config.js ./

# Build the production version of the application
RUN npm run build

# Set the command to start the application
CMD ["npm", "start"]