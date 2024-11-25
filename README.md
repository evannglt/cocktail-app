# Csu33012 2425 Project27

## Team Members

- **Junpeng Cui**
- **Evann Guillot:** Tech Lead
- **Lisa Hoang**
- **Ana Lannelongue Garcia**
- **Marie Roulier:** Software Developer
- **Óscar Sabán Moreno**

## Organization

- Link to our [Jira](https://tcd-team-cocktail27.atlassian.net/jira/software/projects/COC/boards/1)
- Link to our [Diary](diary.md)

Working in Scrum, we divided the project into sprints of two weeks.
We also kept track of our issues and development decisions in our diary. We tried to discussions about the design and on-going issues every couple of days.

We used Jira to manage the project, with a board containing the tasks to be done, the tasks in progress, the tasks being reviewed and the tasks that are done.

We also used the backlog to keep track of the tasks that need to be done in the future, some of them could not be done in the time frame of the project.

## Project Description

This project is a mobile application that allows users to search and create cocktail recipes.
The app has a minimalistic design and is easy to use.
Users can:

- Search for cocktails by name (with calls to [TheCocktailDB API](https://www.thecocktaildb.com/api.php))
- Save their favorite cocktails
- Create and share their own recipes
- Generate a recipe using generative AI (Ollama with the model llama3.2:1b running locally)
- Rate other users' recipes
- Check another user's profile and see their recipes
- Update and delete their account

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
docker compose up backend -d
```

Running this command will automatically start the backend container in detached mode, as well as its dependencies (PostgreSQL DB and Ollama API).
Keep in mind that because the backend depends on a Ollama API, it may pull the model the first time you run it.
Once it is fully running (see the logs **Model pulled successfully**), you can start the frontend container:

```shell
docker compose up frontend
```

Because the frontend depends on the backend, and the backend depends on the database, the containers will be started in the correct order.

This command should display the logs of the frontend container, that contain a **QR code** that can be scanned to run the app on a mobile device using the **Expo Go** app.

To stop the containers, run the following command:

```shell
docker compose down
```

## Tests

We decided on not doing any Front-End tests because of the short time constraints.

However, we did Back-End tests using the Mockito framework.
The only thing needed to run them is to click "Run all tests" when clicking on the 'tests' folder.

## Video

Link to our uploaded video
