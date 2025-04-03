"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDatabaseApp = generateDatabaseApp;
/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
var yeoman_environment_1 = require("yeoman-environment");
// import DatabaseAppGenerator from './generators/app/index.js';
var index_js_1 = require("./index.js");
var generatorEnvironment = yeoman_environment_1.default.createEnv();
generatorEnvironment.registerStub(index_js_1.default, 'database-app');
function generateDatabaseApp(opts) {
    generatorEnvironment.run('database-app', opts);
}
