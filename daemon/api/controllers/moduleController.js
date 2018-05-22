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
 * moduleController.js in foras
 * Created by Damian Perera on 2/20/2018
 *
 */

const
  moduleCodeSearch = require('../../modules/codesearch/exports'),
  moduleSyntax = require('../../modules/checksyntax/exports'),
  moduleYoda = require('../../modules/yoda/exports'),
  databaseController = require('./databaseController');

let
  getSearchCode = function (req, res) {
    moduleCodeSearch.search(req.params.term, req.params.language, function (result) {
      console.log(result);
        databaseController.createRecord(result, config.modules.codeSearch.dbCollection, function () {
          res.send(result);
        })
    });
  },
  postSearchCode = function (req, res) {
   console.log("processing...");
    moduleCodeSearch.search(req.body.term, req.body.language, function (result) {
      databaseController.createRecord(result, config.modules.codeSearch.dbCollection, function () {
        res.send(result);
      })
    });
  },
  postCheckSyntax = function (req, res) {
    moduleSyntax.check(req.body.code, req.body.filename, function (result) {
      databaseController.createRecord(result, config.modules.checkSyntax.dbCollection, function () {
        res.send(result);
      })
    })
  },
  postLintSyntax = function (req, res) {
    moduleSyntax.lint(req.body.code, req.body.filename, req.body.fix, function (result) {
      databaseController.createRecord(result, config.modules.lintSyntax.dbCollection,function () {
        res.send(result);
      })
    })
  },
  postYodaCheck = function (req, res) {
    moduleYoda.withYouMayTheForceBe(req.body.sourceCode, function (result) {
      res.send(result);
    })
  }

module.exports = {
    getSearchCode: getSearchCode,
    postSearchCode: postSearchCode,
    postCheckSyntax: postCheckSyntax,
    postLintSyntax: postLintSyntax,
    postYodaCheck: postYodaCheck
};