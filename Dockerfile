FROM node:4

RUN mkdir -p /usr/src/myapp

WORKDIR /usr/src/myapp
ADD package.json /usr/src/myapp/
RUN npm i
ADD . /usr/src/myapp

EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "start"]

