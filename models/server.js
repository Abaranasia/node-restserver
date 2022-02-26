const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';
    this.authPath = '/api/auth';

    // Connect to database
    this.connectDB();

    //Middlewares - introduces additional functionalities between the req and the res
    this.middlewares();

    //Routes - define the way to enroute the website
    this.routes();
  };

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // For using cors to protect our routes
    this.app.use(cors());

    // Read and parse of the body to json format
    this.app.use(express.json())

    // Exposing the public directory
    this.app.use(express.static('public'));
  }

  routes() {
    /*  The routes can be defined here, but it's much more clear to
    extract them to routes folder and divede them by category */
    // this.app.get('/api', (req, res) => { res.json({msg: 'get API'})});

    // Instead of define here the routes, we import them from routes folder as if it was a middleware
    this.app.use(this.authPath, require('../routes/auth'))
    this.app.use(this.usersPath, require('../routes/user'))
  };

  listen() { // Listener function and possible feedback
    this.app.listen(this.port, () => {
      console.log(`Running server on port ${this.port}`)
    })
  };
}

module.exports = Server;