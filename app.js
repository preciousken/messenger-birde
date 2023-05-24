// requiring the needed modules
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session')
const passport = require('passport');
// app.use(session({
//   secret: process.env.SESSION_KEY,
//   resave: false,
//   saveUninitialized: false
// }));


// requiring the needed modules end

// getting the express routers
const { mainRouter } = require('./route/mainRoutes');
const { userRouter } = require('./route/user');
const { getIPAddress } = require('./middleware/ipAddress');
// getting the express routers end

// getting the config variables
PORT = process.env.PORT;
// getting the config variables end

// initializing the application
// initializing the application end

// setting up middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());
app.use(express.static('./public'));
app.use(require('cors')());

// Social login middlewares
app.use(passport.initialize());
// setting up middlewares end

// connecting to the database
dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log('App is listening on port ' + PORT + '...');
    });
  })
  .catch((error) => console.log(error));
// connecting to the database end

// Everything relating to the main page components
app.use(mainRouter);


// Everything relating to the user components
app.use('/auth', getIPAddress,userRouter)

// Everything relating to the admin components
// app.use('/admin', adminRouter)


// 404 Error Handler
app.all('*', (req, res) => {
  res.status(404).json({
    status: false,
    error: 'And Just Like That, You Completely Lost Your Way 😥',
  });
});
