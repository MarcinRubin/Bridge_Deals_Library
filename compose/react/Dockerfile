FROM node:18-slim

# set working directory

# copy and set privileges for start script
COPY ./compose/react/start /start-react
RUN sed -i -e 's/\r$//g' /start-react
RUN chmod +x /start-react

WORKDIR /frontend

# add `/usr/src/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH
ENV NODE_ENV development

# install and cache app dependencies
COPY frontend/ .
RUN npm ci
