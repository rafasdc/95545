FROM node:lts-alpine as build-stage
ENV NODE_ENV=production
WORKDIR /app
COPY . /app
RUN rm -rf /app/src/tests
RUN npm i --production
RUN npm run build
RUN chmod -R 775 /app
EXPOSE 8000
CMD ["npm", "run", "start"]