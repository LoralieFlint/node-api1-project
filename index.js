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
        .json({ error: "The user information could not be found." });
    });
});

// Creates a user using POST
server.post("/users", (req, res) => {
  const data = req.body;

  if (!data.name || !data.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.insert(data)
      .then(users => {
        res.status(201).json(users);
      })
      .catch(err => {
        console.log("error on POST to /users", err);
        res
          .status(500)
          .json({ error: "The user information could not be retrieved." });
      });
  }
});

// delete a user
server.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(users => {
      if (users) {
        res.status(200).json({ message: "The user was removed." });
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      console.log("error on DELETE /users/:id", err);
      res.status(500).json({ error: "The user could not be removed." });
    });
});

// updating user data with PUT
server.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  db.findById(id).then(users => {
    if (!users) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  });
  if (!userData.name || !userData.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    db.update(id, userData)
      .then(user => {
        res.status(200).json({ user: `user ${id} was updated ` });
      })
      .catch(err => {
        console.log("error on PUT /users/:id", err);
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

const port = 8000;
// const host = "127.0.0.1"; // another way to say local host

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});