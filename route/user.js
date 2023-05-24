// importing the required modules
const express = require('express');
// const auth = require('../middlewares/auth');

// creating the router object
const userRouter = express.Router();

// requiring the user controllers
const userController = require('../controller/userController');


// everything related to the user signup
userRouter.post(
    '/signup/',
    userController.registerUser
);


// exporting the userRouter
module.exports = { userRouter };