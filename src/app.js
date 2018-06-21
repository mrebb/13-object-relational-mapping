'use strict';

// Third Party Modules
import express from 'express';
import morgan from 'morgan';
//import cors from 'cors';

// Our modules
import router from '../src/api/api';
import errorHandler from './middleware/error';
import notFound from './middleware/404';
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan());
//app.use(cors);
// Our API
app.use(router);

// Our 404 Handling Middleware
app.use(notFound);

// Our Error Handling Middleware
app.use(errorHandler);
// Flag to know if we are up and going
let isRunning = false;


const server = {
  start: (port) => {
    if(! isRunning) {
      return app.listen(port, function () {
        console.log('app is listening at port %s', port);
      });
    }
    else {
      console.log('Server is already running');
    }
    
  },
  // stop: () => { 
  //   isRunning = false;
  //   console.log(server.connection);
  //   server.connection.close();
  // },
};

export default server;