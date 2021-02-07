FROM node

RUN apt-get update && \
    apt-get install --no-install-recommends -y sudo && \
    apt-get clean && rm -rf /var/lib/apt/lists/* 

COPY . /usr/src/app
WORKDIR /usr/src/app

ENTRYPOINT node exp_server