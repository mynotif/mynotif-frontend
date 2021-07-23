# Build with:
# docker build --tag issa-diallo/mynotif-frontend .
# Run with:
# docker run --rm -it --publish 3000:80 issa-diallo/mynotif-frontend
# Or interactive shell:
# docker run -it --rm issa-diallo/mynotif-frontend sh
FROM node:16-alpine as build

# Specify where our app will live in the container
WORKDIR /app

# Build the dependencies
COPY package.json tsconfig.json yarn.lock ./
RUN yarn install
RUN yarn global add react-scripts
# Build for production
COPY src src
COPY public public
RUN yarn build

# Prepare nginx
FROM nginx:1.20-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

# Fire up nginx
CMD ["nginx", "-g", "daemon off;"]
