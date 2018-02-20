/*
 *
 * Copyright 2018 Damian Perera
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * index.js in foras
 * Created by Damian Perera on 2/18/2018
 *
 */

global.config = require('./config/config');

const
    express = require('express'),
    http = require('http'),
    app = express(),
    jsonRoutes = require('json-routing'),
    bodyParser = require('body-parser'),
    intercept = require("intercept-stdout"),
    morgan = require('morgan'),
    fs = require('fs'),
    path = require('path'),
    os = require('os'),
    helmet = require('helmet'),
    cookieParser = require('cookie-parser'),
    basicAuth = require('basic-auth'),
    port = process.env.PORT || config.port;

/**
 * Securing Server
 */
app.use(helmet());

/**
 * Set Express to use body-parser for all requests
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.raw());

/**
 * Allowing Localhost Access during Development
 */
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

/**
 * Execute routing
 */
jsonRoutes(app, config.routes);

app.listen(port, function () {
    console.log('                 \x1b[31mForas Server\x1b[0m is live on \x1b[31m' + os.hostname() + ':' + port + '\x1b[0m');
    console.log("\n ********************************** LOGS ********************************\n");
});