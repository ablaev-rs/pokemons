const express = require("express");
const Users = require("./Pokemon");
const router = express.Router();

router.get("/users", (req, res) => {
    Users.find({})
        .then(user => {
            res.send(user)
        })
});

router.post("/users", (req, res) => {
    Users.create(req.body)
        .then(user => {
            res.send(user)
        })
});

router.put("/users/:id", (req, res) => {
    res.send({method: "PUT"})
});

router.delete("/users/:id", (req, res) => {
    res.send({method: "DELETE"})
});

module.exports = router;

