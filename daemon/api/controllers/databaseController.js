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
  collectionCodeSearch = config.modules.codeSearch.dbCollection,
  collectionCheckSyntax = config.modules.checkSyntax.dbCollection,
  collectionLintSyntax = config.modules.lintSyntax.dbCollection;
let connectedDatabase;

let createRecord = function (res, collection, callback) {
  switch (collection)  {
    case collectionCodeSearch:
      createCodeSearchRecord(res, callback)
      break;
    case collectionCheckSyntax:
      createCheckSyntaxRecord(res, callback)
      break;
    case collectionLintSyntax:
      createLintSyntaxRecord(res, callback)
      break;
    default:
      break;
  }
}

let createCodeSearchRecord = function (res, callback) {
  connectedDatabase.collection(collectionCodeSearch).updateOne({"searchTerm": res.searchterm}, {$set: res}, {upsert : true}, function(err) {
    if (!err)
      callback();
    else {
      console.log(err);
      callback();
    }
  })
}

let createCheckSyntaxRecord = function (res, callback) {
  connectedDatabase.collection(collectionCheckSyntax).updateOne({"checkedCode": res.checkedcode}, {$set: res}, {upsert : true}, function(err) {
    if (!err)
      callback();
    else {
      console.log(err);
      callback();
    }
  })
}

let createLintSyntaxRecord = function (res, callback) {
  connectedDatabase.collection(collectionLintSyntax).updateOne({"results.source": res.results[0].source}, {$set: res}, {upsert : true}, function(err) {
    if (!err)
      callback();
    else {
      console.log(err);
      callback();
    }
  })
}

let setDatabase = function (database) {
  console.log("                      Connected to \x1b[31m" + database.s.options.servers[0].host + "\x1b[0m")
  connectedDatabase = database.db(config.mongodb.database)
}

module.exports = {
  setDatabase: setDatabase,
  createRecord: createRecord
}