/*
 * Steps to make an express server:
 * 1) install express package with npm.
 * 2) import express.
 * 3) instantiate express app(s) to be used to listen on port(s).
 * 4) declare a middleware to do the work: taking HTTP response and response object
 *    plus the next middleware in the chain.
 * 5) mount the middleware on the application.
 * 6) start the server and let it serve HTTP requests
 */
const express = require('express');

//----------------------------------------------------------------------------------------//
/*
 * Multiple express applications can be made to listen on different ports.
 * Such application can be instantiated with the 'express()' method.
 * However, for this project, we merely need one, which we call 'app'
 */
const app = express();
//----------------------------------------------------------------------------------------//


/* 
 * Argument for static is the directory where the middleware should look for the files,
 * relative to where the app is being run.
 * For the application being built here, the static files are being stored in the
 * 'public' folder, where 'index.html' will be located.
 */
const fileServerMiddleWare = express.static('public');  
//----------------------------------------------------------------------------------------//

/*
 * Mount the middleware using the 'use()' method.
 * First argument is the base URL of any HTTP request match. This is optional
 * and defaults to '/' if not specified.
 * Second argument is the middleware itself.
 */
app.use('/', fileServerMiddleWare);
//----------------------------------------------------------------------------------------//

/*
 * Use the 'listen()' method to make the app take in HTTP requests.
 * The 'listen()' method starts the server and awaits requests eternally.
 * First argument takes in a port number. Here, the port number is arbitrary. 
 * Second argument takes in an optional callback that runs when the server has
 * been successfully started.
 * Port 80, the usual HTTP port, shall not be used here.
 * Listening to port 80 will require administrative (superuser) privileges.
 */
app.listen( 3000, () => console.log('App started on port 3000.') );