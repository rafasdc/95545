FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
RUN npm run build

FROM nginx:stable-alpine as production-stage
EXPOSE 80
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
