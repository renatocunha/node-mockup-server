"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
exports.__esModule = true;
var express = require("express");
var fs = require("fs");
var path = require("path");
var asyncHandler = require("express-async-handler");
var bodyParser = require("body-parser");
var rootFolder = path.join(__dirname, 'artifacts');
var encode = 'utf8';
var statusOk = 200;
var statusCreated = 201;
var statusError = 500;
var statusNotFound = 404;
var errBody = { status: "error", errCode: statusError };
var scsBody = { status: "success" };
var App = /** @class */ (function () {
    function App() {
        this.express = express();
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(bodyParser.json());
        this.routes();
        this.console_start_up(9000);
    }
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get('/v1/artifact/:uuid', function (req, res) {
            console.log('Geting: ', req.params.uuid);
            var file = rootFolder + "/" + req.params.uuid + ".json";
            var json = fs.readFileSync(file, encode);
            if (json === '') {
                res.status(statusNotFound).json(statusError);
            }
            else {
                res.status(statusOk).json(JSON.parse(json));
            }
        });
        router.get('/v1/artifacts/', asyncHandler(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var artifacts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('getting all files');
                        return [4 /*yield*/, this.get_all_files()];
                    case 1:
                        artifacts = _a.sent();
                        res.status(statusOk).json(artifacts);
                        return [2 /*return*/];
                }
            });
        }); }));
        router.post('/v1/artifact/', function (req, res) {
            console.log('posting file');
            try {
                if (req.body.uuid === '') {
                    res.status(statusError).json(errBody);
                }
                else {
                    var jsonBody = JSON.stringify(req.body);
                    var jsonPath = rootFolder + "/" + req.body.uuid + ".json";
                    fs.writeFileSync(jsonPath, jsonBody);
                    res.status(statusCreated).send(scsBody);
                }
            }
            catch (err) {
                res.status(statusError).json(errBody);
            }
        });
        this.express.use('/', router);
    };
    App.prototype.get_all_files = function () {
        return __awaiter(this, void 0, void 0, function () {
            var artifacts, files, index, obj;
            return __generator(this, function (_a) {
                artifacts = [];
                files = fs.readdirSync(rootFolder);
                for (index = 0; index < files.length; index++) {
                    obj = fs.readFileSync(rootFolder + '/' + files[index], encode);
                    artifacts.push(JSON.parse(obj));
                }
                return [2 /*return*/, artifacts];
            });
        });
    };
    App.prototype.console_start_up = function (port) {
        console.log('// Starting Node Mockup Restful Server // ');
        console.log('// App version 0.0.01                 //  ');
    };
    return App;
}());
exports["default"] = new App().express;
