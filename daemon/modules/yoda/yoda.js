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
    intializeResult(text, () =>
      doLanguageClassification(() =>
        doCodeSearch(() =>
          doSyntaxCheck(() =>
            doSyntaxLint(() =>
              sendResult(callback))))));
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
  };

let
  addSuccession = function (language, code, callback) {
    return this.db.find({language, code}, (err, res) => {
          if (res.length > 0) {
            return done();
          }
          return this.db.insert({language, code}, err => {
            return async.series([
              callback => {
                return this.engine.similars.update(language, done);
              },
              callback => {
                return this.engine.suggestions.update(language, done);
              }
            ], callback);
          });

      });
  },
  removeSuccession = function (language, code, callback) {
      return this.db.delete({language, code}, err => {
        return async.series([
          callback => {
            return this.engine.similars.update(language, done);
          },
          callback => {
            return this.engine.suggestions.update(language, done);
          }
        ], callback);
      });
  };

let
  predictScore = function (language, callback) {
    async.auto({
        isInLanguage: callback => {
          return this.engine.successions.codeByLanguage(language, callback);
        },
        notInLanguage: callback => {
          return this.engine.nonSuccessions.codeByLanguage(language, callback);
        }
      },
      (err, {isInLanguage, notInLanguage}) => {
        let items;
        return items = _.flatten([isInLanguage, notInLanguage]);
      });
  },
  computeSimilarityIndex = function (callback) {
    async.map(others, (other, done) => {
        return async.auto({
            otherSuccessions: done => {
              return this.engine.successions.codeByLanguage(other, done);
            },
            otherNonSuccessions: done => {
              return this.engine.nonSuccessions.codeByLanguage(other, done);
            }
          },
          (err, {otherSuccessions, otherNonSuccessions}) => {
            return done(null, {
                user: other,
                similarity: ((_.intersection(languageSuccession, otherSuccession).length
                  + _.intersection(languageNonSuccession, otherNonSuccession).length)
                  - _.intersection(otherSuccession, otherNonSuccession).length
                  - _.intersection(languageNonSuccession, otherSuccession).length)
                  / _.union(languageSuccession, otherSuccession, languageNonSuccession, otherNonSuccession).length
              }
            );
          });
      },
      (err, others) => {
        return this.db.insert({
            user,
            others
          }
          , done);
      });
  }

module.exports = {
  guideYouMayTheLight: checkAllText
};