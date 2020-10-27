FROM node:8
COPY . /code-challenge
WORKDIR /code-challenge
RUN npm install
EXPOSE 8080
CMD ["npm", "start"]