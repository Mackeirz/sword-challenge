<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Sword-Challenge</h3>

  <p align="center">
    Account Maintainance Challenge for Sword
    <br />
    <br />
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

You are developing a software to account for maintenance tasks performed during a working day.

This application has two types of users (Manager, Technician).

The technician performs tasks and is only able to see, create or update his own performed tasks. 

The manager can see tasks from all the technicians, delete them, and should be notified when some tech performs a task. A task has a summary (max: 2500 characters) and a date when it was performed, the summary from the task can contain personal information.

```
|-api
|---controllers
|---entities
|---helpers
|---middlewares
|---repositories
|---routes
|---services
|---validators

|-bin
|---www

|-config
|---broker.js
|---database.js
|---env.js

|-database
|---migrations
|---seeders

|-lib
|---message.broker.js

|-.env
|-.sequelizerc
|-.amqp.js
|-.app.js
|-docker-compose.yml
|-dockerfile
|-manager-client.js
|-package.json
|-readme.md

```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* Application has NodeJS as runtime environment and framework used is:

[![Express][Express.js]][Express-url]

* ORM used is:

[![Sequelize][Sequelize]][Sequelize-url]

* and docker:

[![Docker][Docker]][Docker-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Make sure you have enabled docker and docker compose
* npm
  ```sh
  docker compose up -d
  ```
This command will start the necessary containers and all you need.
### Installation

_There is no need of installation process steps. The dockerfile from the project root already contains a script capable of making the installation and perfom migrations and seeds._

Make sure you have the .env file, in the project root, containing the following:
```
# Database environment variables
DATABASE_HOST=account_maintainance_db
DATABASE_NAME=account_maintainance
DATABASE_USER=root
DATABASE_PASSWORD=jsG2a8!9A4jC
DATABASE_DIALECT=mysql

# Salt for stored securing passwords
JWT_PRIVATE_KEY=ZUJl26m7EzU7

# RabbitMQ variables
RABBITMQ_HOST=rabbitmq
RABBITMQ_PORT=5672
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
Existent users (for authenticating in the application):
* EMAIL                    | Password
* technicianjoe@user.com   | technicianjoe2022
* techniciansusan@user.com | techniciansusan2022
* managertravolta@user.com | managertravolta2022

Resources:
* POST localhost:3000/api/auth | requestbody = { email, password } | response = { accessToken }

* GET  localhost:3000/api/tasks | bearerToken = accessToken  | response = array() of tasks

* POST localhost:3000/api/tasks | bearerToken = accessToken, requestbody = { name, summary, summaryPersonalNotes, date, status="CREATED|FINISHED" } | response = { taskResource }

* PUT localhost:3000/api/tasks/:id | bearerToken = accessToken, requestbody = { id, name, summary, summaryPersonalNotes, date, status="CREATED|FINISHED" } | response = { taskResource }

* DELETE localhost:3000/api/tasks/:id | bearerToken = accessToken | response = empty (204)


For listing messages sent to manager it was created a manager-client.js file simulating the delivery of those messages. Please execute the following instructions:
```
docker exec -it account_maintainance_api bash
node ./manager-client.js
```
After, you can try to create or update a resource with a "FINISHED" and a date. You can see the message being delivered (printed) in the client that you started.

### Running tests
```
docker exec -it account_maintainance_api bash
npm run test
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add Sequelize ORM to the application
- [x] Add migrations and seeds to the application (through sequelize-cli)
- [x] Add authentication via JWT for users (Pre-requirement)
- [x] Add task resources for management
- [x] Add unit tests (needs further searching and implementation in the future)
- [x] Add message broker for delivering messages to the manager (needs more work in the future)
- [ ] Add kubernetes object files for deploying this application
- [ ] Improve README file
- [ ] Manage users
- [ ] Improve unit tests
- [ ] Add integration tests
- [ ] Add E2E tests

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

André Queirós - queiros.and@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Express.js]: https://expressjs.com/images/express-facebook-share.png
[Express-url]: https://expressjs.com/
[Sequelize]: https://www.luiztools.com.br/wp-content/uploads/2021/01/sequelize.png
[Sequelize-url]: https://sequelize.org/
[Docker]: https://miro.medium.com/max/1400/1*JUOITpaBdlrMP9D__-K5Fw.png
[Docker-url]: https://hub.docker.com/

