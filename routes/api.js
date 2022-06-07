require('dotenv').config();
var express = require('express');
var router = express.Router();
const db = require("../model/helper");
const cors = require ("cors");
const mysql = require("mysql");

const bcrypt = require ('bcrypt')
const saltRounds = 10

const app = express();

app.use(express.json());
app.use(cors());


const jwt = require('jsonwebtoken')

const DB_PASS = process.env.DB_PASS;

const dbConn = mysql.createConnection({
  user: "root",
  host:"localhost",
  password: DB_PASS,
  database:"oilaw",
});


router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

const sendAllUsers = (req, res) => {
  db(`SELECT
  users.first_name,
  users.last_name,
  users.email,
  users.tel_number,
  users.contact_preference,
  users.id,
  requests.request,
  requests.complete
  FROM users 
  INNER JOIN requests
  ON users.id = requests.user_id
  ORDER BY first_name ASC;` )
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
};


router.get("/users", (req, res) => {
  // Send back the full list of items
  sendAllUsers(req, res);
});

router.post("/users", (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  // Add your code here
  db(
    `INSERT INTO users (first_name, last_name, email, tel_number, contact_preference) VALUES ("${req.body.first_name}", "${req.body.last_name}", "${req.body.email}", ${req.body.tel_number}, "${req.body.contact_preference}" );
    SELECT LAST_INSERT_ID();`
  )
    .then((results) => {
      let newUserId = results.data[0].insertId;
      db(
        `INSERT INTO requests (request, user_id, complete) VALUES ("${req.body.request}", "${newUserId}", 0 );`
      )
      .then(() => {
        sendAllUsers(req, res);
      })
      .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));

});

  const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"]

  if (!token) {
    res.send("Token missing")
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({auth: false, message: "Authentification failed."});
      } else {
        req.userId = decoded.id;
        next();
      }
    } )
  }
}

router.get("/isUserLoggedIn", verifyJWT, (req, res) => {
  res.send("User authenticated")
})

router.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password,saltRounds, (err, hash) => {

    if (err) {
      console.log(err)
    }

    dbConn.query("INSERT INTO login (username, password) VALUES (?,?)",
    [username,hash],
    (err,result) => {
      if (err) {
      console.log(err);
    }
    res.send(result);
    }
    );
  })
  });

router.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    
    dbConn.query("SELECT * FROM login WHERE username = ?;",
    username,
    (err,result) => {
        if (err) {
        res.send({err:err});
        }
          
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (error, response) => {
            if(response) {
              const id = result[0].id
              const token = jwt.sign({id}, "jwtSecret", {
                expiresIn: 300,
              })

            res.json({auth: true, token: token, result: result});
            } else {
              res.json({auth: false, message: "Wrong password/user combination."});
            }
          })
          } else {
            res.json({auth: false, message: "No user found."});
          }
        }
      );
    });

router.put("/users/:user_id/complete", (req, res) => {
  // The request's body is available in req.body
  // If the query is successfull you should send back the full list of items
  // Add your code here
  
      db(
        `UPDATE requests SET
        complete = 1 
        WHERE id = ${req.params.user_id};`
      )
      .then(() => {
        sendAllUsers(req, res);
      })
      .catch(err => res.status(500).send(err));
    })



router.put("/users/:user_id", (req, res) => {
  // The request's body is available in req.body
  // URL params are available in req.params
  // If the query is successfull you should send back the full list of items
  // Add your code here
  db(
    `UPDATE users SET 
    first_name = "${req.body.first_name}", 
    last_name = "${req.body.last_name}", 
    email = "${req.body.email}", 
    tel_number = ${req.body.tel_number}, 
    contact_preference = "${req.body.contact_preference}"
    WHERE id = ${req.params.user_id};`
  )
    .then(() => {
      sendAllUsers(req, res);
    })
    .catch(err => res.status(500).send(err));
});

router.delete("/users/:user_id", (req, res) => {
  // URL params are available in req.params
  // Add your code here
  db(`DELETE FROM users WHERE id=${req.params.user_id};`)
    .then(() => {
      sendAllUsers(req, res);
    })
    .catch(err => res.status(500).send(err));
});


module.exports = router;
