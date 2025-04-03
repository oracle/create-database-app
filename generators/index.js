"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
**
** Copyright (c) 2024, Oracle and/or its affiliates.
** All rights reserved
** Licensed under the Universal Permissive License v 1.0 as shown at https://oss.oracle.com/licenses/upl/
*/
var extract_zip_1 = require("extract-zip");
var node_fs_1 = require("node:fs");
var node_path_1 = require("node:path");
var node_url_1 = require("node:url");
var yeoman_generator_1 = require("yeoman-generator");
var __filename = (0, node_url_1.fileURLToPath)(import.meta.url);
var __dirname = node_path_1.default.dirname(__filename);
var retrieveConnectionStringDetailsFromORAFile = function (oraFilePath) {
    var data = node_fs_1.default.readFileSync(oraFilePath, 'utf8');
    var protocol = data.slice((data.indexOf('protocol=') + 9), (data.indexOf(')(port')));
    var hostname = data.slice((data.indexOf('host=') + 5), (data.indexOf('))(')));
    var port = data.slice((data.indexOf('port=') + 5), (data.indexOf(')(host')));
    var serviceName = data.slice((data.indexOf('service_name=') + 13), (data.indexOf('))(security')));
    return { protocol: protocol, hostname: hostname, port: port, serviceName: serviceName };
};
var generateConnectionString = function (protocol, hostname, port, serviceName) { return "".concat(protocol, "://").concat(hostname, ":").concat(port, "/").concat(serviceName); };
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1(args, opts) {
        var _this = _super.call(this, args, opts, {
            customInstallTask: true
        }) || this;
        _this.sourceRoot(node_path_1.default.join(__dirname, '../templates'));
        _this.options = __assign(__assign({}, opts), { apiConfiguration: opts.templateChoice.includes('todo') ? 'tasks' : 'connection' });
        return _this;
        // this.env.options.nodePackageManager = 'npm';
        // this.env.options.cwd = path.join( process.cwd(), this.options.appName );
    }
    default_1.prototype.install = function () {
        this.spawnCommandSync('npm', ['install'], {
            cwd: node_path_1.default.join(process.cwd(), this.options.appName)
        });
        var lRevParseResult;
        try {
            lRevParseResult = this.spawnCommandSync('git', ['rev-parse', '--git-dir'], {
                cwd: node_path_1.default.join(process.cwd(), this.options.appName),
                stdio: 'pipe',
            });
        }
        catch (pError) {
            lRevParseResult = pError;
        }
        if (lRevParseResult.failed) {
            this.spawnCommandSync('git', ['init'], {
                cwd: node_path_1.default.join(process.cwd(), this.options.appName)
            });
        }
        else {
            this.log("Directory is already inside of the git repository \"".concat(lRevParseResult.stdout, "\". Skipping \"git init\""));
        }
    };
    default_1.prototype.path = function () {
        this.destinationRoot(node_path_1.default.join(process.cwd(), this.options.appName));
    };
    default_1.prototype.welcome = function () {
        this.log('Generating database app...');
    };
    // copy the files in the templates/app folder to the root of appname
    default_1.prototype.writing = function () {
        return __awaiter(this, void 0, void 0, function () {
            var walletPath, _a, protocol, hostname, port, serviceName, readme_data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(!('connectionString' in this.options) && ('walletPath' in this.options))) return [3 /*break*/, 4];
                        walletPath = node_path_1.default.join(process.cwd(), this.options.appName, 'server', 'utils', 'db', 'wallet');
                        if (!this.options.walletPath.endsWith('.zip')) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, extract_zip_1.default)(this.options.walletPath, {
                                dir: walletPath
                            })];
                    case 1:
                        _b.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        node_fs_1.default.cpSync(this.options.walletPath, walletPath, { recursive: true });
                        _b.label = 3;
                    case 3:
                        _a = retrieveConnectionStringDetailsFromORAFile(node_path_1.default.join(walletPath, 'tnsnames.ora')), protocol = _a.protocol, hostname = _a.hostname, port = _a.port, serviceName = _a.serviceName;
                        this.options.connectionString = generateConnectionString(protocol, hostname, port, serviceName);
                        _b.label = 4;
                    case 4:
                        // Copy files that are common to all of the templates.
                        this.fs.copyTpl(this.templatePath(this.options.templateChoice), this.destinationPath(), {
                            appName: this.options.appName
                        });
                        this.fs.copy(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/.github")), this.destinationPath('.github'));
                        // This copy of `eslintrc.cjs` should be removed once all templates support eslint v9
                        this.fs.copy(this.templatePath("".concat(this.options.templateChoice, "/.eslintrc.cjs")), this.destinationPath('.eslintrc.cjs'), {
                            ignoreNoMatch: true
                        });
                        this.fs.copy(this.templatePath("".concat(this.options.templateChoice, "/eslint.config.mjs")), this.destinationPath('eslint.config.mjs'), {
                            ignoreNoMatch: true
                        });
                        this.fs.copy(this.templatePath("".concat(this.options.templateChoice, "/.gitignore.template")), this.destinationPath('.gitignore'));
                        /**
                         * The ORDS Concert App template provides:
                         * A markdown lint configuration file (.markdownlint.json)
                         * A .env.example file
                         * Additionally, the sample app expects that the user configures their development
                         * environment on their own to provide a better understanding of ords and how the
                         * app is structured.
                         * The rest of the files, like utils/* and db/* are also not needed since the sample
                         * app contains their own mechanisms to talk with the db.
                         */
                        if (this.options.templateChoice.includes('ords-remix-jwt-sample')) {
                            this.fs.copy(this.templatePath("".concat(this.options.templateChoice, "/.markdownlint.jsonc")), this.destinationPath('.markdownlint.jsonc'));
                            this.fs.copy(this.templatePath("".concat(this.options.templateChoice, "/.env.example")), this.destinationPath('.env.example'));
                        }
                        else {
                            this.fs.copyTpl(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/").concat(node_path_1.default.basename(this.options.templateChoice) == 'node-jet' ? 'index-proxied' : 'index', ".cjs")), this.destinationPath('server/index.cjs'), this.options);
                            this.fs.copy(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/routes/").concat(this.options.apiConfiguration, ".cjs")), this.destinationPath("server/routes/".concat(this.options.apiConfiguration, ".cjs")));
                            this.fs.copy(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/utils/db/**/*")), this.destinationPath('server/utils/db/'));
                            this.fs.copy(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/utils/rest-services/").concat(this.options.apiConfiguration, ".cjs")), this.destinationPath("server/utils/rest-services/".concat(this.options.apiConfiguration, ".cjs")));
                            this.fs.copyTpl(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/.env.example")), this.destinationPath('.env.example'), {
                                appName: '',
                                connectionPassword: '',
                                connectionString: '',
                                connectionUsername: '',
                                walletPassword: '',
                                walletPath: '',
                            });
                            this.fs.copyTpl(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/.env.example.").concat(('walletPath' in this.options) ? 'cloud-wallet' : 'basic')), this.destinationPath('.env'), this.options);
                            this.fs.copy(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/CONTRIBUTING.md")), this.destinationPath('CONTRIBUTING.md'));
                            readme_data = this.fs.read(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/README.md")));
                            if (this.fs.exists((this.destinationPath('README.md')))) {
                                this.fs.append(this.destinationPath('README.md'), readme_data);
                            }
                            else {
                                this.fs.copy(this.templatePath("".concat(node_path_1.default.dirname(this.options.templateChoice), "/app/README.md")), this.destinationPath('README.md'));
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    default_1.prototype.end = function () {
        this.log('Application generated successfully. Run the following command: \n\ncd ' + node_path_1.default.join(process.cwd(), this.options.appName) + '\n');
        if (!this.options.templateChoice.includes('ords-remix-jwt-sample')) { }
        this.log('Please check out the README file to learn how to configurate the ORDS Concert App');
    };
    return default_1;
}(yeoman_generator_1.default));
exports.default = default_1;
