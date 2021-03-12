"use strict";
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeSimulationsArray = exports.composeDocsUtil = exports.removeChaptersByDoc = exports.changeIndex = exports.addChapterIndex = exports.composeId = void 0;
var axios_1 = __importDefault(require("axios"));
var info_1 = require("../interfaces/info");
var objects_1 = require("../utils/objects");
var composeId = function (year, date, chapter) {
    return year.toString() + date.id + chapter.id;
};
exports.composeId = composeId;
var addChapterIndex = function (selectedSims, docId) {
    var counter = 0;
    for (var sim in selectedSims) {
        if (selectedSims[sim].doc === docId) {
            counter++;
        }
    }
    return counter;
};
exports.addChapterIndex = addChapterIndex;
var changeIndex = function (selectedSims, docId, simId, sourceIndex, destinationIndex) {
    var newObj = {};
    for (var sim in selectedSims) {
        var newIndex = -1;
        var selSim = selectedSims[sim];
        if (selSim.doc === docId) {
            // If this is the dragged sim
            if (sim === simId) {
                newIndex = destinationIndex;
            }
            // If the item was dragged to a lower spot
            else if (sourceIndex < destinationIndex &&
                selSim.index > sourceIndex &&
                selSim.index <= destinationIndex) {
                newIndex = selSim.index - 1;
            }
            // If the item was dragged to a higher spot
            else if (sourceIndex > destinationIndex &&
                selSim.index < sourceIndex &&
                selSim.index >= destinationIndex) {
                newIndex = selSim.index + 1;
            }
        }
        if (newIndex === -1) {
            newIndex = selSim.index;
        }
        newObj[sim] = __assign(__assign({}, selSim), { index: newIndex });
    }
    return newObj;
};
exports.changeIndex = changeIndex;
var removeChaptersByDoc = function (docId, selectedSims) {
    var newObj = {};
    for (var sim in selectedSims) {
        if (selectedSims[sim].doc !== docId) {
            newObj[sim] = selectedSims[sim];
        }
    }
    return newObj;
};
exports.removeChaptersByDoc = removeChaptersByDoc;
var composeDocsUtil = function (documents, selectedSims, context, options) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, files, errors, body;
    return __generator(this, function (_b) {
        context.setLoading(true, 'בודק את הסימולציות');
        if (Object.keys(documents).length === 0) {
            context.changeGenError('יש ליצור סימולציות לפני השליחה');
            return [2 /*return*/];
        }
        _a = exports.composeSimulationsArray(documents, selectedSims, context), files = _a.files, errors = _a.errors;
        if (Object.keys(errors).length === 0) {
            context.setLoading(true, 'מפיק את הסימולציות, זה עשוי לקחת קצת זמן. ההורדה תחל אוטומטית.');
            body = JSON.stringify({
                files: files,
                options: options
            });
            return [2 /*return*/, axios_1.default
                    .post('/api/generateSimulations', body, {
                    responseType: 'blob'
                })
                    .then(function (res) {
                    var blob = new Blob([res.data]);
                    var url = URL.createObjectURL(blob);
                    return url;
                })
                    .catch(function (err) {
                    context.changeGenError('התרחשה תקלה בזמן הפקת הקובץ');
                })];
        }
        else {
            context.setLoading(false);
            context.pushDocErrors(errors);
            return [2 /*return*/];
        }
        return [2 /*return*/];
    });
}); };
exports.composeDocsUtil = composeDocsUtil;
var composeSimulationsArray = function (documents, selectedSims, context) {
    var errors = {};
    var files = [];
    for (var doc in documents) {
        if (documents[doc] === '') {
            errors = context.buildDocError(doc, info_1.DocErrorType.NameError, 'יש לבחור שם לסימולציה', errors);
        }
        var simulations = {};
        for (var sim in selectedSims) {
            var _a = selectedSims[sim], year = _a.year, date = _a.date, chapter = _a.chapter, index = _a.index, simDoc = _a.doc;
            var chapterObj = {
                id: chapter.id,
                index: index
            };
            if (simDoc === doc) {
                var thisSim = simulations[year.toString() + date.id];
                if (thisSim) {
                    simulations[year.toString() + date.id] = __assign(__assign({}, thisSim), { chapters: __spreadArray(__spreadArray([], thisSim.chapters), [chapterObj]) });
                }
                else {
                    simulations[year.toString() + date.id] = {
                        year: year,
                        date: date.id,
                        chapters: [chapterObj]
                    };
                }
            }
        }
        if (Object.keys(simulations).length === 0) {
            errors = context.buildDocError(doc, info_1.DocErrorType.ChaptersError, 'הסימולציה ריקה, יש לבחור פרקים', errors);
        }
        else {
            // Transform simulations object to array
            var simArr = objects_1.objectTOArray(simulations);
            files.push({
                name: documents[doc],
                simulations: simArr
            });
        }
    }
    return {
        files: files,
        errors: errors
    };
};
exports.composeSimulationsArray = composeSimulationsArray;
