const path = require('path')
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT || 3000; // Useful if you deploy to Heroku!

const app = express();

// Logging middleware
app.use(morgan('dev'));

// Static file serving middleware
app.use(express.static(path.join(__dirname, './path/to/static/assets')));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Appends auth and api to the appropriate routes
// app.use('/auth', require('./auth'))
// app.use('/api', require('./api'))

// Any remaining requests with an extension (.js, .css, etc.) send 404 to client
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error('Not found')
    err.status = 404
    next(err)
  } else {
    next()
  }
});

// If api route is not found sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
});

// start listening (and create a 'server' object representing our server)
const startListening = () => {
  const server = app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )
}

startListening();

module.exports = app;