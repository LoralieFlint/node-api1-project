// added dependancies

// implement your API here

// import express
const express = require("express");
// import database
const db = require("./data/db.js");

const server = express();
server.use(express.json());

// API GET request to
server.get("/users", (req, res) => {
  db.find()
    // Returns an array of all the user objects contained in the database.
    .then(users => {
      res.status(200).json(users);
    })
    // If there's an error in retrieving the _users_ from the database:
    .catch(err => {
      console.log("error with GET users request");
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      });
    });
});
// API GET  users by id request to /users/:id
server.get("/users/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(users => {
      if (users) {
        res.status(200).json(users);
      } else {
        // if the user ID is not found status code (404) (NOT FOUND)
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("error on GET by ID /users/:id", err);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

const port = 8000;
const host = "127.0.0.1"; // another way to say local host

server.listen(port, host, () => {
  console.log(`server running at http://${host}/${port}`);
});
// server.use(express.json())
