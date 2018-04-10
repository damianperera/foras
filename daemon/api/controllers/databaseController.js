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
 * databaseController.js in foras
 * Created by Damian Perera on 4/9/2018
 *
 */

const
  mongoClient = require('mongodb').MongoClient,
  mongoServer = require('mongodb').Server,
  connectionString = "mongodb://" + config.mongodb.username + ":" + config.mongodb.password + "@" + config.mongodb.uri + ":" + config.mongodb.port + "/" + config.mongodb.database;

function recordResult (res, callback) {
  console.log(connectionString);
  callback();
}

module.exports = {
  recordResult: recordResult
}