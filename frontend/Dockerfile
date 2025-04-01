# Use Node.js 23.5.0 as the base image
FROM node:23.5.0-alpine

WORKDIR /app

# Install necessary build dependencies for canvas
RUN apk add --no-cache --virtual .build-deps \
  build-base \
  cairo-dev \
  pango-dev \
  giflib-dev \
  libjpeg-turbo-dev \
  libpng-dev

COPY . .

RUN npm install

RUN npm run build && apk del .build-deps

# Expose port 3000 for the app
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
