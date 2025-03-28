# Use Node.js 23.5.0 as the base image
FROM node:23.5.0-alpine

# Install necessary build dependencies for canvas
RUN apk update && apk add --no-cache --virtual .build-deps \
  build-base \
  cairo-dev \
  pango-dev \
  giflib-dev \
  libjpeg-turbo-dev \
  libpng-dev

COPY . .

RUN npm install

# Expose port 3000 for the app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "dev"]
