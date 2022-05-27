# Oilaw
This is a student project for Full Stack Developer program at CodeOp. The goal of the project is to create a platform for lawyers and people in need of legal advices. The people should be able to submit their requests/questions so that lawyers can see and reply back. For now the communication itself happens outside (e.g. email chain, phone chain). The main goal for layers to see in the web app is whether the request was assigned/adddressed/completed.

## Database and Setup

In this repository, you use a full stack app built using React, Node/Express, and MySQL.
There are three windows you will be working with:

### 1. Database Prep: 

Create `.env` file in project directory and add

```
DB_NAME=oilaw
DB_PASS=YOUR_PASSWORD
```
(replace `YOUR_PASSWORD` with your actual password)

Type `mysql -u root -p` to access the MySQL CLI using your password.

In the MySQL CLI, type `create database oilaw;` to create a database in MySQL.

Run `node model/database.js` in your **TERMINAL**, in the **project** folder (not your MySQL CLI! Open a new terminal window for this). This will create a table called 'users' and 'requests' in your database.

### 2. Backend: 

- Run `npm install` in the project folder to install dependencies related to Express (the server). Right after run `npm start` which will run Express server on port 5000.
- You can test your API in `http://localhost:5000/api`

### 3. Client:

- `cd client` to navigate to the client folder, then run `npm install` to install React dependencies. `npm start` starts the client server on port 3000.
- Client is configured so all API calls will be proxied to port 5000 for a smoother development experience. Yay!
- You can test your client app in `http://localhost:3000`

## Features

Please note that the project is still on development phase. Therefore, for now it has only two views: Attorney and Client.

### Client's page
There is a form that receives information from a person/client that has requests. That requests show up in the attorney's page.

### Attorney's page
This page allows the attorneys/lawyers to see all requests coming from clients and be able to click button complete once the request will be addressed by any of the attoerneys.

## Technologies

### Frontend

- React

### Backend

- MySQL Database
- Node JS
- Express JS
- Postman

### Database schema

- There are two tables for now ('users' and 'requests'). These two tables are connected via user_id: so one user can have several requests. The idea is to add 'attorneys' table.

![Oilaw Database Schema] (https://github.com/kanyedzhus/oilaw/blob/main/Untitled-dbdesigner.pdf)

## Feature Extensions

- Creating lawyers database. 
- Pairing up lawyers and requests. 
- Automatic reply that form was submitted by client. 
- Automatic email notifying the lawyers about the question/request submitted.
- Have different views/pages for resolved and pending requests.

## Resources

- [MySQL Cheat Sheet](http://www.mysqltutorial.org/mysql-cheat-sheet.aspx)
- [MySQL](https://dev.mysql.com/doc/refman/8.0/en/database-use.html)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [React Documentation](https://reactjs.org/docs/hello-world.html)

## Notes

_This is a student project that was created at [CodeOp](http://CodeOp.tech), a full stack development bootcamp in Barcelona._
