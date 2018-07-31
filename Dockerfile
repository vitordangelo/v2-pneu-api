FROM node:latest
COPY . /home/node
WORKDIR /home/node
EXPOSE 3000
RUN npm install -g pm2 && \
  npm install