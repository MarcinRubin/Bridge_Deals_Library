FROM node:18-slim

# set working directory
WORKDIR /frontend

# add `/usr/src/frontend/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH
ENV NODE_ENV development

# install and cache app dependencies
COPY . .
RUN npm ci


EXPOSE 3000

# start app
CMD ["npm", "run", "dev"]
