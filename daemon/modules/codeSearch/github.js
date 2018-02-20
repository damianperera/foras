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

let resultJSON = {};

function search(term, language, callback) {
    let token = config.tokens.github;
    console.log(term, language);
    callback('done');
}

function getText(gitURL) {

}

function addToJSON(term, language, result) {

}

function addToNeuralNet() {

}

module.exports = {
    search: search
};