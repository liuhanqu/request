var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(name, msg, response) {
        var _this = _super.call(this, msg) || this;
        _this.response = response;
        _this.name = name;
        return _this;
    }
    return CustomError;
}(Error));
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms, 'timeout');
    });
}
function race(p1, p2) {
    return Promise.race([p1, p2]).then(function (res) {
        if (res === 'timeout') {
            throw new CustomError('TimeoutError', 'request timeout');
        }
        return res;
    });
}
var Ajax = /** @class */ (function () {
    function Ajax(url, option) {
        if (option === void 0) { option = {}; }
        var _this = this;
        this.response = Promise.resolve().then(function () { return _this.request(url, option); });
    }
    Ajax.prototype.request = function (url, option) {
        return __awaiter(this, void 0, void 0, function () {
            var json, params, _a, timeout, opt, headers, querystring, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        json = option.json, params = option.params, _a = option.timeout, timeout = _a === void 0 ? 10 * 1000 : _a, opt = __rest(option, ["json", "params", "timeout"]);
                        headers = new Headers(opt.headers);
                        if (params) {
                            querystring = new URLSearchParams(params).toString();
                            url = url + '?' + querystring;
                        }
                        if (json) {
                            opt.body = JSON.stringify(json);
                            headers.set('Content-Type', 'application/json');
                        }
                        opt.headers = headers;
                        return [4 /*yield*/, race(fetch(url, opt), sleep(timeout))];
                    case 1:
                        res = _b.sent();
                        if (!res.ok) {
                            throw new CustomError('HTTPError', res.statusText, res);
                        }
                        return [2 /*return*/, res.clone()];
                }
            });
        });
    };
    Ajax.prototype.json = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.response];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.json()];
                }
            });
        });
    };
    Ajax.prototype.text = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.response];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.text()];
                }
            });
        });
    };
    Ajax.prototype.blob = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.response];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.blob()];
                }
            });
        });
    };
    Ajax.prototype.formData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.response];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.formData()];
                }
            });
        });
    };
    Ajax.prototype.arrayBuffer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.response];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.arrayBuffer()];
                }
            });
        });
    };
    return Ajax;
}());
var rf = function (url, option) {
    return new Ajax(url, option);
};
['get', 'post', 'put', 'delete', 'patch'].forEach(function (verb) {
    rf[verb] = function (url, option) {
        option.method = verb.toUpperCase();
        return new Ajax(url, option);
    };
});
export default rf;
//# sourceMappingURL=index.js.map