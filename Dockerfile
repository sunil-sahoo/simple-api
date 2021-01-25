FROM node:12-alpine3.11

# Bundle app source
COPY . /simple-api

# Create app directory
WORKDIR /simple-api

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 3000
CMD [ "node", "index.js" ]
