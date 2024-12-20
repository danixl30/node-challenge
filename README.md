# Node.js Challenge

## Description

Monorepo with [TypeScript](https://www.typescriptlang.org/) starter with [Express](https://expressjs.com/). The package manager is [pnpm](https://pnpm.io/). You need [NodeJs](https://nodejs.org/en/) >=22.11.0. 

This project is designed to test your knowledge of back-end web technologies, specifically in Node.js, REST APIs, and decoupled services (microservices).

## Setup

Please create ```.env``` files inside ```/apps/api-service``` and ```/apps/stock-api``` folders. You can use ```.env.example``` file in each dir to guide (you can copy and rename these files to .env and would be work).

## node installation by nvm
```bash
# windows
$ nvm install $(Get-Content .nvmrc).replace( 'v', '' )

# bash
$ nvm install
```
## node installation by fnm
```bash
$ fnm use
```

## pnpm installation 
```bash
# enable corepack (if you are in Windows open a terminal in admin)
$ corepack enable

# Or install pnpm with npm
$ npm install -g pnpm
```

## Installation packages setup

```bash
$ pnpm install
```

## Build the app

```bash
$ pnpm build
```

## Running the app

```bash
# development
$ pnpm run start

# production mode
$ pnpm run start:prod
```

Note: If you don't have a MongoDB instance you can use the ```docker-compose.yml``` at root to create a MongoDB instance: Only have to run:

```bash
$ docker compose up -d
```

## Lint
```bash
# run lint with biome
$ pnpm lint
```

## Test

```bash
# unit tests
$ pnpm run test:unit

# integration tests
$ pnpm run test:integration
```

## Swagger

If the ```NODE_ENV``` variable is set to "dev", you can use the SwaggerUI. In the project is a file in JSON with the specs. To gerenate a new specs you must to run:

```bash
$ cd ./apps/api-service && pnpm generate:swagger
```

## Use docker to run entire project

If you want to run the project entire, you can use the ```docker-compose.prod.yml``` to build and run the entire project. Before do that create an ```.env``` file at root, you can use the ```.env.example``` at root (you can copy and rename to .env and would be fine). After that run:

```bash
$ docker compose -f ./docker-compose.prod.yml up -d
```

## Assignment

The goal of this exercise is to create a simple API with Node.js, using or not any framework of your choice, to allow users to query [stock quotes](https://www.investopedia.com/terms/s/stockquote.asp). It is scaffolded with two Express apps, but you can use another backend Node.js framework of your preference.

The project consists of two separate services:

* A user-facing API that will receive requests from registered users asking for quote information.
* An internal stock service that queries external APIs to retrieve the requested quote information.

## Minimum requirements
 - You will need to **record a video explaining the code** you created, the decisions you made, its functionality, and demonstrating the complete operation of the challenge. _Remember to show the execution from scratch, it should not be running beforehand._

### API service

* Endpoints in the API service should require authentication (no anonymous requests should be allowed). Each request should be authenticated via Basic Authentication.
  * To register a user the API service must receive a request with an email address, user role and return a randomized password, like this:

    Request example:

    `POST /register`

    ```json
      { "email": "johndoe@contoso.com", "role": "user" }  //role could be user/admin
    ```

    Response example:

    `POST /register`

    ```json
      { "email": "johndoe@contoso.com", "password": "bda5d07453dfde4440803cfcdec48d92" }
    ```
* When a user requests a stock quote (calls the stock endpoint in the api service), if it exists, it should be saved and related to that user in the database.
  * The response returned by the API service should be like this:

    `GET /stock?q=aapl.us`

    ```json
      {
      "name": "APPLE",
      "symbol": "AAPL.US",
      "open": 123.66,
      "high": 123.66,
      "low": 122.49,
      "close": 123
      }
    ```
  * A user can get their history of queries made to the api service by hitting the history endpoint. The endpoint should return the list of entries saved in the database, showing the latest entries first:

    `GET /history`

    ```javascript
    [
        {"date": "2021-04-01T19:20:30Z", "name": "APPLE", "symbol": "AAPL.US", "open": "123.66", "high": 123.66, "low": 122.49, "close": "123"},
        {"date": "2021-03-25T11:10:55Z", "name": "APPLE", "symbol": "AAPL.US", "open": "121.10", "high": 123.66, "low": 122, "close": "122"},
        ...
    ]
    ```
* A super user (and only super users) can hit the stats endpoint, which will return the top 5 most requested stocks:

  (This endpoint will validate the user's role)

  `GET /stats`

  ```json
  [
      {"stock": "aapl.us", "times_requested": 5},
      {"stock": "msft.us", "times_requested": 2},
      ...
  ]
  ```
* All endpoint responses should be in JSON format.

### Stock service

* Assume this is an internal service, so requests to endpoints in this service don't need to be authenticated.
* When a stock request is received, this service should query an external API to get the stock information. For this challenge, use this API: `https://stooq.com/q/l/?s={stock_code}&f=sd2t2ohlcvn&h&e=csv`.
* Note that `{stock_code}` above is a parameter that should be replaced with the requested stock code.
* You can see a list of available stock codes here: [https://stooq.com/t/?i=518](https://stooq.com/t/?i=518)

## Architecture

![Architecture Diagram](https://git.jobsity.com/jobsity/node-challenge/-/blob/master/architecture.png)

1. A user makes a request asking for Nasdaq's current Stock quote: `GET /stock?q=ndq`
2. The API service calls the stock service to retrieve the requested stock information
3. The stock service delegates the call to the external API, parses the response and returns the information back to the API service.
4. The API service saves the response from the stock service in the database.
5. The data is formatted and returned to the user.

## Bonuses

The following features are optional to implement, but if you do, you'll be ranked higher in our evaluation process.

* Add unit tests for the services.
* Add contract/integration tests for the API service.
* Use JWT instead of basic authentication for endpoints.
* Use containers to orchestrate the services.
* Use OpenAPI/Swagger to document the API.
* Add endpoint to reset user password sending an email with the new password.

**Important:** If your implementation requires different steps to start the services (like starting a rabbitMQ consumer), also different endpoints o payload data for the endpoints, document them in the Readme!
