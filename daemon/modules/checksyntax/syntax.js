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
 * syntax.js in foras
 * Created by Damian Perera on 2/26/2018
 *
 */

const jsChecker = require('syntax-error');
const jsLinter = require('standard');

let check = function (code, fileName, callback) {
    let result = jsChecker(code, fileName);
    if (result)
        callback({
            'checkedBy': 'foras/modules/checksyntax',
            'checkedOn': new Date().toJSON(),
            'result': result,
            'checkedCode': code
        });
    else
        callback({
            'checkedBy': 'foras/modules/checksyntax',
            'checkedOn': new Date().toJSON(),
            'result': 'correct',
            'checkedCode': code
        });
}

let lint = function (code, filename, fix, callback) {
    let result = jsLinter.lintTextSync(code, [{
        filename: filename,
        fix: fix
    }]);
    let lintedResult = {
        'lintedBy': 'foras/modules/lintsyntax',
        'lintedOn': new Date().toJSON()
    };
    for (let key in result)
        lintedResult[key] = result[key];
    callback(lintedResult);
}

module.exports = {
    check: check,
    lint: lint
};