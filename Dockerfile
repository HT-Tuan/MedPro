FROM node:18.18.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY startup.sh .

RUN chmod +x startup.sh

CMD ["sh", "startup.sh"]