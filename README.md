# FullStack project
Simple web app that look basically like a CRM. We implemented account creation, authentication. We realised a simple table view, using HTML and CSS, where an authenticate user can see all the clients that are assigned to his account. The authenticate user can change the status of clients. Finally the user can log out and terminate his/her session.
This project is simple and basic and was realized for an internship. We created seeders that will populate the database with records. Please take into account that this project was realised using: HTML, CSS, JS for the frontend. For the backend we used Node.js + express + sequelize ORM(Object-Relational Mapping), MYSQL.

## Getting Started

Clone the project on your local machine:

```bash
$ git clone <url of this repo>
```

change the database parameters to match your own database credentials:  
To do that you just need to find the file located at:  
> ```
>   <project root>/src/config/database.json
> ```
Make sure that your database configuration is alright (username, password, database, host, port).  

Make sure you have node js and npm installed on your machine.
To start runnig the project:  
  
1 - Install all dependencies

```bash
$ npm install
```

2 - Run migrations and seeders

```bash
$ npm run bootdb
```

3 - Lauch the application

```bash
$ npm start
```
Now the app should be up and running at port 3000 on your localhost.

## Interact with frontend
Frontend is served on:  
> ```
>   http://localhost:port/frontend/
> ```

The frontend or our application graphic interface will be served at: `http://localhost:3000/frontend/`

## Default user accounts for testing
1 - User #1  
> ```
>   login: dev
>   password: aton@intership2024A
> ```

2 - User #2  
> ```
>   login: internship
>   password: aton@intership2024A
> ```

## REST API endpoints

The API should be served on your localhost:3000/
The frontend should be served on your localhost:3000/frontend/

> ```
>   Endpoints
>   POST /api/auth/register [Create a new user account]
>   POST /api/auth/login [Authentificate yourself and get access token]
>   GET /api/clients [Get clients assigned to the authenticated user]
>   POST /api/status/client [Change clients statuses]
> ```

## Tools used in development
> ```
>   Node.js, npm, express, sequelize
>   HTML, CSS, Javascript(JQuery)
>   MYSQL
>   Postman
>   Chrome, Yandex browser
>   Visual studio code, git
>   Windows 10, Ubuntu on WSL2
> ```

## Other useful commands

1 - Run migration only  

```bash
$ npm run migrate
```

2 - Run seeders only  

```bash
$ npm run seeds
```
3 - Undo all migrations  

```bash
$ npm run undomigrate
```
4 - Undo all seeders  

```bash
$ npm run undoseeds
```
5 - Running all migrations then seeders for the first time  

```bash
$ npm run bootdb
```
6 - Reset database to intial state. This command is a combination of all previous commands  

```bash
$ npm run rebootdb
```
All those commands can be seen and edited in the package.json file.