## Running the dev contaners for the API

You need to first start the containers and then run the API.

### Starting the PostgreSQL database and PGAdmin

Run the following command:

```shell
docker compose up -d
```

To stop the containers, run the following command:

```shell
docker compose down
```

### Running the API

To run the API, run the following command:

```shell
./mvnw spring-boot:run
```