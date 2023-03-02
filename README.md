# IV1201-backend

This repository contains backend the code for the recruitment application.

## How to run

### Prerequisites

Node and npm must be installed on the local system.

### Steps

- Start by cloning this repository to the local machine.
- In the root of the repository, install the npm packages needed by running: <pre><code>npm i</code></pre>
- Create an empty database that can be reached from the local machine. PostgreSQL is the preferred database since that is what's been tested but other databases may work.
- The program uses a couple of environment variables which are described in the .env-template file. Create a file called .env in the same directory and copy the contents of the template over to this file. Then fill in the values for every variable.
- Make sure the database is up and running and then start the backend using one of the scripts defined in package.json. For example: <pre><code>npm run dev</code></pre> to run the backend in a development context.

## Testing

The code is unit tested using the Jest framework. The testing structure mirrors the applications structure in the the tests directory.

## Design

This repository implements a RESTful backend using the Express.js framework. The whole application follows a microlith architecture. The database is separate from the backend and can therefore scale horisontally independently from the backend server.

### Layers

The applications code follows a layered architecture and below are descriptions of the layers used.

#### Startup

The startup layer consists of the src/server.js and src/app/index.js files. The server.js file just functions as the entry point of the program and starts the application. The applications setup is performed in the index.js file however. This file configures the Express instance by setting up middleware and routes.

#### Routes

This layer handles the routing for the application. It contains one file for each base endpoint and that file defines which controller function should handle each variation of that endpoint. A variation of an endpoint could be a GET for the bare path, e.g. some/entity. This has the semantic of querying for all instances of that entitiy. A GET endpoint to the path with an ID appended to it i.e. some/entity/1 should respond with a specific instance of the entity.

#### Controllers

This layer is meant to serve the endpoints defined in the Routes layer. Every file in this layer should have a corresponding file in the Routes layer and every function in each file should serve the corresponding endpoint.

A controller has the task of satisfying the requests it receives with the help of the other supporting layers. In this application there's not much business logic that happens in the backend and the requests mainly result in fetching or storing something in the database and we therefore don't have a service layer. The controller layer instead communicates with the repository layer.

#### Middleware

This layer contains custom middleware used by the application. These are applied in the startup layer and are executed on every request even before the controller layer. Authorization is implemented in this layer as well as top-level data validation.

#### Repositories

This layer creates functions as an interface to the database and the models. Instead of having to communicate with the integration layer directly, the controllers can communicate with the models through this layer. The models are handled by the Sequelize ORM and have defined functions for constructing database queries without writing any SQL. This layer improves scalability a lot since each repository is can be represented by a single file which is only concerned with a specific entity.

#### Models

This layer defines the Sequelize models to be used by the application. These models defines constraints and validation on the database and these objects can be used by the repository layer to communicate with the database. The models are mapped by the ORM to database tables.

#### Integration

The integration layer contains code that sets up integration with other systems. The only external system in use by this application is a database and this layer therefore contains a file that sets that up. This file instasiates the ORM and uses the model layer to configure it. The models associations are also created in this layer and the connection to the database through Sequelize is started.

#### Validators

This layer contains functions for validating input data for the application and is split by entities. The functions in this layer are used both for validation in the top-layer and the integration layer.

#### Utils

This is a layer that contains utility/helper functions, e.g. encryption and token generation and verification.

#### Config

This layer contains application wide configuration values.
