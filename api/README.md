## Running the API

To run the API, you need to first start the PostgreSQL database and then run the API.

### Starting the PostgreSQL database

To start the PostgreSQL database, run the following command:

```shell
docker-compose up -d
```

To stop the containers, run the following command:

```shell
docker-compose down
```

### Running the API

To run the API, run the following command:

```shell
./mvnw spring-boot:run
```