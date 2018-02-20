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
 * modules.js in foras
 * Created by Damian Perera on 2/20/2018
 *
 */

let a, b;

function checkSearchParams(req, res, next) {
    a = 0;
    b = 0;

    a += (req.params.language && req.params.language != null) ? 1 : 0;
    b += 1;
    a += (req.params.term && req.params.term != null) ? 1 : 0;
    b += 1;

    if (a === b) {
        next()
    } else {
        console.log("\x1b[31mFIREWALL:\x1b[0m request from " + getIPAddress(req) + " was rejected because proper parameters could not be found");
        res.status(400).send(JSON.parse('{"code": 401, "reason":"Invalid search parameters"}'));
    }
}

module.exports = {
    checkSearchParams: checkSearchParams
};