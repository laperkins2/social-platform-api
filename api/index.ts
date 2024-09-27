//import Dotenv
require('dotenv').config();

// import Express
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

//import cors
const cors = require('cors');

//import Axios
const axios = require('axios');

//create an express application
const app = express();

//define a port
const PORT = process.env.PORT;

// define Middleware functions defined before routes
//use cors middleware
const corsOptions = {
  origin: process.env.SNACKS_CLIENT,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

//use JSON middleware to parse request bodies
app.use(express.json());

//define our routes
//Home Route
app.get('/', (request: Request, response: Response, next: NextFunction) => {
  response.json({ message: 'Welcome to the social platform API' });
});

//error handling
//generic error handling middleware
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    console.error(error.stack);
    response.status(500).json({
      error: 'Something is not right!',
      errorStack: error.stack,
      errorMessage: error.message,
    });
  }
);

//404 Resource not found Error Handling
app.use((request: Request, response: Response, next: NextFunction) => {
  response.status(404).json({
    error: 'Resource not found.',
  });
});

//make the server listen on our port
const server = app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});

//export the server for testing
module.exports = app;
