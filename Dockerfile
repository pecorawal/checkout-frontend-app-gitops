FROM registry.access.redhat.com/ubi8/nodejs-16-minimal:latest
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
