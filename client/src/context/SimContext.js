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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimContext = void 0;
var react_1 = __importStar(require("react"));
var axios_1 = __importDefault(require("axios"));
var uuid_1 = require("uuid");
var objects_1 = require("../utils/objects");
var utils_1 = require("./utils");
var InfoContext_1 = require("./InfoContext");
var info_1 = require("../interfaces/info");
var defaultContext = {
    simData: [],
    selectedSims: {},
    documents: {},
    selectedDoc: '',
    options: {
        shuffleData: true
    },
    addSim: function () { },
    removeSim: function () { },
    createDoc: function () { },
    selectDoc: function () { },
    changeDocName: function () { },
    removeDoc: function () { },
    changeSimIndex: function () { },
    toggleShuffle: function () { },
    testUniqueName: function () { return true; },
    composeDocs: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); }); }
};
exports.SimContext = react_1.default.createContext(defaultContext);
var SimProvider = /** @class */ (function (_super) {
    __extends(SimProvider, _super);
    function SimProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.addSim = function (year, date, chapter) {
            _this.setState(function (state) {
                var _a;
                var newIndex = utils_1.addChapterIndex(state.selectedSims, state.selectedDoc);
                if (newIndex < 9) {
                    return __assign(__assign({}, state), { selectedSims: __assign(__assign({}, state.selectedSims), (_a = {}, _a[utils_1.composeId(year, date, chapter)] = {
                            year: year,
                            date: date,
                            chapter: chapter,
                            doc: state.selectedDoc,
                            index: newIndex
                        }, _a)) });
                }
                _this.context.changeGenError('ניתן להוסיף עד 9 סימולציות');
                return state;
            }, function () { return _this.context.resetDocErrors(_this.state.selectedDoc, info_1.DocErrorType.ChaptersError); });
        };
        _this.removeSim = function (year, date, chapter, index) {
            _this.setState(function (state) {
                var selectedSims = objects_1.removeFromObj(state.selectedSims, utils_1.composeId(year, date, chapter));
                return __assign(__assign({}, state), { selectedSims: utils_1.changeIndex(selectedSims, state.selectedDoc, '', index, Infinity) });
            });
        };
        _this.selectDoc = function (id) {
            _this.setState({
                selectedDoc: id
            });
        };
        _this.createDoc = function () {
            if (Object.keys(_this.state.documents).length < 10) {
                var id_1 = uuid_1.v4();
                _this.setState(function (state) {
                    var _a;
                    return ({
                        documents: __assign(__assign({}, state.documents), (_a = {}, _a[id_1] = '', _a))
                    });
                }, function () { return _this.selectDoc(id_1); });
            }
            else {
                _this.context.changeGenError('ניתן ליצור עד 10 סימולציות');
            }
        };
        _this.changeDocName = function (id, name) {
            _this.setState(function (state) {
                var _a;
                return ({
                    documents: __assign(__assign({}, state.documents), (_a = {}, _a[id] = name, _a))
                });
            }, function () { return _this.context.resetDocErrors(id, info_1.DocErrorType.NameError); });
        };
        _this.removeDoc = function (id) {
            _this.setState(function (state) { return ({
                documents: objects_1.removeFromObj(state.documents, id),
                selectedSims: utils_1.removeChaptersByDoc(state.selectedDoc, state.selectedSims)
            }); });
        };
        _this.changeSimIndex = function (simId, sourceIndex, destinationIndex) {
            if (destinationIndex === sourceIndex ||
                typeof destinationIndex === "undefined") {
                return;
            }
            _this.setState(function (state) { return ({
                selectedSims: utils_1.changeIndex(state.selectedSims, state.selectedDoc, simId, sourceIndex, destinationIndex)
            }); }, function () { return _this.setState(function (state) { return ({
                options: __assign(__assign({}, state.options), { shuffleData: false })
            }); }); });
        };
        _this.toggleShuffle = function (value) {
            _this.setState({
                options: {
                    shuffleData: value
                }
            });
        };
        _this.testUniqueName = function (name, doc) {
            var documents = _this.state.documents;
            console.log(name);
            for (var docKey in documents) {
                console.log(documents[docKey]);
                if (documents[docKey] === name && docKey !== doc) {
                    _this.context.changeDocError(info_1.DocErrorType.NameError, 'כבר קיימת סימולציה עם שם זה', doc);
                    return false;
                }
            }
            return true;
        };
        _this.composeDocs = function () { return __awaiter(_this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, utils_1.composeDocsUtil(this.state.documents, this.state.selectedSims, this.context, this.state.options)];
                    case 1:
                        url = _a.sent();
                        this.context.setLoading(false);
                        return [2 /*return*/, url];
                }
            });
        }); };
        _this.state = __assign(__assign({}, defaultContext), { addSim: _this.addSim, removeSim: _this.removeSim, createDoc: _this.createDoc, selectDoc: _this.selectDoc, changeDocName: _this.changeDocName, removeDoc: _this.removeDoc, changeSimIndex: _this.changeSimIndex, toggleShuffle: _this.toggleShuffle, testUniqueName: _this.testUniqueName, composeDocs: _this.composeDocs });
        return _this;
    }
    SimProvider.prototype.componentDidMount = function () {
        var _this = this;
        // Set loading
        axios_1.default.get('/api/simList')
            .then(function (res) {
            _this.setState({ simData: res.data });
        })
            .catch(function (err) {
            return _this.context.changeGenError('התרחשה תקלה, נסו לרענן את הדף');
        });
    };
    SimProvider.prototype.render = function () {
        return (<exports.SimContext.Provider value={__assign({}, this.state)}>
                {this.props.children}
            </exports.SimContext.Provider>);
    };
    SimProvider.contextType = InfoContext_1.InfoContext;
    return SimProvider;
}(react_1.Component));
exports.default = SimProvider;
