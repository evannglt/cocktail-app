# Csu33012 2425 Project27

## Team Members

## Project Description

## Requirements to run the project

- Docker [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Ngrok [https://ngrok.com/download](https://ngrok.com/download)

## Tools

- Expo [https://docs.expo.dev/](https://docs.expo.dev/)
- React Native [https://reactnative.dev/](https://reactnative.dev/)
- Node.js [https://nodejs.org/en/](https://nodejs.org/en/)
- Spring Boot [https://spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
- PostgreSQL [https://www.postgresql.org/](https://www.postgresql.org/)

## Running the project

To run the project, you need to build the frontend and backend images, and then start the containers.

### Building the frontend and backend images

Run the following command:

```shell
docker compose build
```

### Exposing the backend to the frontend

Use ngrok to expose the backend to the frontend.
Note that this would not be relevant in a production environment, as the backend 
would be hosted on a dedicated server.

```shell
ngrok http 8080
```

**The ngrok process needs to be running when starting the containers.**

Copy the forwarding URL and replace the **\<your-ngrok-url\>** for the `EXPO_PUBLIC_API_URL` env variable in the `docker-compose.yml` file with it.

```yaml
frontend:
    build: ./cocktail-app
    container_name: frontend
    depends_on:
      - backend
    ports:
      - "19000:19000"
      - "19001:19001"
      - "19002:19002"
      - "8081:8081"
    environment:
      EXPO_PUBLIC_API_URL: "<your-ngrok-url>/api"
    tty: true
    restart: unless-stopped
```

### Starting the containers

To start the containers, run the following command:

```shell
docker compose up frontend
```

Because the frontend depends on the backend, and the backend depends on the database, the containers will be started in the correct order. 

This command should display the logs of the frontend container, that contain a **QR code** that can be scanned to run the app on a mobile device using the **Expo Go** app.

To stop the containers, run the following command:

```shell
docker compose down
```