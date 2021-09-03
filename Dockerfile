FROM node

WORKDIR /usr/app

# Copiando package para o workdir path
COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3333

cmd ["npm", "run", "dev"]