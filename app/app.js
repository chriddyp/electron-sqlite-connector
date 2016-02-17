// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import os from 'os'; // native node.js module
import { remote } from 'electron'; // native electron module
import jetpack from 'fs-jetpack'; // module loaded from npm
import env from './env';
import React from 'react';
import { render } from 'react-dom';
import restify from 'restify';

import HelloWorld from './hello_world/hello_world';

const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('311.db');

console.log('Loaded environment variables:', env);

var app = remote.app;
var appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)

console.log('The author of this app is:', appDir.read('package.json', 'json').author);
document.addEventListener('DOMContentLoaded', function () {
    render(
        <HelloWorld/>,
        document.getElementById("main")
    );
});

const server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.CORS({
    origins: ['*'],   // defaults to ['*']
    credentials: false,                 // defaults to false
    headers: ['Access-Control-Allow-Origin']  // sets expose-headers
}));

server.get('/query', function(req, res, next) {
    const statement = req.query.statement;

    db.serialize(function() {
      const response = {
          rows: []
      };
      db.each(req.query.statement, function(err, row) {

          if(!response.columnnames) {
              response.columnnames = Object.keys(row);
          }
          const rowValues = [];
          for (var colname in row) {
              rowValues.push(row[colname]);
          }
          response.rows.push(rowValues);

      }, function(err, nRows) {
          response.nrows = response.rows.length;
          response.ncols = response.columnnames.length;

          // res.send(response);
          res.send(response);
          next();
      });
    });
});

server.listen(5000, function(){
    console.log('%s listening at %s', server.name, server.url);
})
