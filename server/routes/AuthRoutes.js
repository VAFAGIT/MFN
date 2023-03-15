const express = require("express");
const router = express();
const { CreateUser, Login , getUsers, searchUser} = require("../controllers/AuthController");

router.post("/", Login);
router.get("/users", getUsers);
router.get("/search/:name", searchUser);
router.post("/register", CreateUser);






module.exports =  router ;

