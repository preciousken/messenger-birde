const express = require('express');

// creating the router object
const mainRouter = express.Router();

// requiring the user controllers
const {
  homepageController,
} = require('../controller/mainController');

mainRouter.get('/', homepageController);

// exporting the mainRouter
module.exports = { mainRouter };
