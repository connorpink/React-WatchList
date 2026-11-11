FROM node:22-alpine

WORKDIR /src
COPY package.json package-lock.json /src/
RUN npm ci --omit=dev

COPY . /src

EXPOSE 4000

CMD ["npm", "start"]