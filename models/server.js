const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath= '/api/users';
      
        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    };

    middlewares() {
        // For using cors to protect our routes
        this.app.use(cors());

        // Exposing the public directory
        this.app.use(express.static('public'));
    }

    routes() {

      // The routes can be defined here, but it's more clear to extract them to routes folder
      /* this.app.get('/api', (req, res) => { 
        res.status(200).json({
          msg: 'get API'
        })
      }); */

      // Instead of define here the routes, we import them from routes folder as if it was a middleware
      this.app.use(this.usersPath, require('../routes/user'))
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Running server on port ${this.port}`)
        })
    }



}

module.exports = Server;