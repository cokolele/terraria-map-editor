FROM node:16-alpine as builder

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .
RUN npm run build

FROM caddy:alpine as server
WORKDIR /usr/share/caddy
EXPOSE 8080
EXPOSE 8443

COPY --from=builder /usr/src/app/dist ./
COPY ./docker/Caddyfile /etc/caddy/Caddyfile