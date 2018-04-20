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
 * yoda.js in foras
 * Created by Damian Perera on 4/15/2018
 *
 */

const
  languageClassifier = require('./languageClassifier'),
  userAgent = 'foras/modules/yoda',
  databaseController = require('../../api/controllers/databaseController'),
  collectionCodeSearch = config.modules.codeSearch.dbCollection,
  collectionCheckSyntax = config.modules.checkSyntax.dbCollection,
  collectionLintSyntax = config.modules.lintSyntax.dbCollection;

let
  resultJSON,
  result = {},
  checkAllText = function (text, callback) {
    intializeResult(text, () => doLanguageClassification(() => doCodeSearch(() => doSyntaxCheck(() => sendResult(callback)))));
  },
  intializeResult = function (source, callback) {
    resultJSON = {
      sourceCode: source,
      detectedLanguage: 'n/a',
      generatedBy: userAgent,
      generatedOn: new Date().toJSON(),
      suggestions: []
    };
    callback();
  },
  doLanguageClassification = function (callback) {
    resultJSON.detectedLanguage = languageClassifier.getLanguage(resultJSON.sourceCode);
    callback();
  },
  doCodeSearch = function (callback) {
    databaseController.searchRecord(config.modules.codeSearch.keyword, resultJSON.sourceCode, collectionCodeSearch, function (result) {
      if (result) {
        resultJSON.autoComplete = result[0].searchResults[0];
        callback();
      } else {
        resultJSON.autoComplete = "not found"
        callback();
      }

    })
  },
  doSyntaxCheck = function (callback) {
    callback();
  },
  sendResult = function (callback) {
    callback(resultJSON);
  }

module.exports = {
  guideYouMayTheLight: checkAllText
};