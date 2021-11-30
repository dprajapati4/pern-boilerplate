const path = require('path');
const express = require('express');
const morgan = require('morgan');
const db = require('./db/db');
const PORT = process.env.PORT || 3000; // Useful if you deploy to Heroku!
const app = express();
module.exports = app;


const createApp = () => {
  // Logging middleware
  app.use(morgan('dev'));

  // Static file serving middleware
  app.use(express.static(path.join(__dirname, '../public')));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Appends auth and api to the appropriate routes
  // app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))

  // Any remaining requests with an extension (.js, .css, etc.) send 404 to client
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  });

  // If api route is not found sends index.html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '/public/index.html'));
  });

  // Error handling endware
  app.use((err, req, res, next) => {
    console.error('Endware erroree',err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error');
  });
};

// Start listening (and create a 'server' object representing our server)
const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Listening for requests at ${PORT}`)
  );
};

// Sync the db
const syncDb = () => db.sync();
// This will drop all the tables and recreate them.
//db.sync({force:true})


// When called this will sync the database and create the app and start listening for request
async function bootApp() {
  // await syncDb()
  await createApp()
  await startListening()
}



// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec
if (require.main === module) {
  bootApp()
} else {
  createApp()
}