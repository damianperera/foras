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
  collectionLintSyntax = config.modules.lintSyntax.dbCollection,
  keywordCodeSearch = config.modules.codeSearch.keyword,
  keywordCheckSyntax = config.modules.checkSyntax.keyword,
  keywordLintSyntax = config.modules.lintSyntax.keyword;

let
  connectedDatabase,
  query = {},
  searchRecord = function (searchKey, term, collection, callback) {
    query = {};
    query[searchKey] = term
    connectedDatabase.collection(collection).find(query, {limit: 1}).toArray(function (err, result) {
      if (!err && result.length !== 0)
        callback(result);
      else {
        callback(false);
      }
    })
  },
  createRecord = function (res, collection, callback) {
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
  },
  createCodeSearchRecord = function (res, callback) {
    query = {};
    query[keywordCodeSearch] = res.searchTerm;
    connectedDatabase.collection(collectionCodeSearch).updateOne(query, {$set: res}, {upsert : true}, function(err) {
      if (!err)
        callback();
      else {
        console.log(err);
        callback();
      }
    })
  },
  createCheckSyntaxRecord = function (res, callback) {
    query = {};
    query[keywordCheckSyntax] = res.checkedCode;
    connectedDatabase.collection(collectionCheckSyntax).updateOne(query, {$set: res}, {upsert : true}, function(err) {
      if (!err)
        callback();
      else {
        console.log(err);
        callback();
      }
    })
  },
  createLintSyntaxRecord = function (res, callback) {
    query = {};
    query[keywordLintSyntax] = res.results[0].source;
    connectedDatabase.collection(collectionLintSyntax).updateOne(query, {$set: res}, {upsert : true}, function(err) {
      if (!err)
        callback();
      else {
        console.log(err);
        callback();
      }
    })
  },
  setDatabase = function (database) {
    console.log("                      Connected to \x1b[31m" + database.s.options.servers[0].host + "\x1b[0m")
    connectedDatabase = database.db(config.mongodb.database)
  }

module.exports = {
  setDatabase: setDatabase,
  createRecord: createRecord,
  searchRecord: searchRecord
}