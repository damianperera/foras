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
 * github.js in foras
 * Created by Damian Perera on 2/20/2018
 *
 */
const
    request = require('request'),
    apiUrl = config.modules.codeSearch.url,
    apiToken = config.modules.codeSearch.token;
let
    resultJSON = {};

function search(term, language, callback) {
    request({
        url: apiUrl,
        method: 'GET',
        qs: {
            q: term,
            in: 'file',
            language: language,
            fork: true
        },
        headers: {
            'Authorization': 'token ' + apiToken,
            'User-Agent': 'foras'
        }
    }, function (err, res, body) {
        if (!err)
            getRawText(JSON.parse(body).items, callback);
        else
            callback(err);
    });
}

function getRawText(items, callback) {
    callback(items);
}

function buildJSON(term, language, score, author, result) {

}

function addToNeuralNet() {

}

module.exports = {
    search: search
};