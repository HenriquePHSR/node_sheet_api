FROM node

RUN apt-get update

RUN nvm install latest
RUN nvm use latest
RUN npm init
RUN npm install googleapis@39 --save
