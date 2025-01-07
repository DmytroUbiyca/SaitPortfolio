FROM --platform=linux/amd64 node:20

RUN uname -a

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:dev"]