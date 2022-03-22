# build environment
FROM node:16-alpine as build

USER node
WORKDIR /app
COPY package.json .
RUN npm install --production
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine as prod
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]