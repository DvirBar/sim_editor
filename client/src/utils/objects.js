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
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectTOArray = exports.removeFromObj = void 0;
var removeFromObj = function (obj, key) {
    var newObj = {};
    for (var objKey in obj) {
        if (objKey !== key) {
            newObj[objKey] = obj[objKey];
        }
    }
    return newObj;
};
exports.removeFromObj = removeFromObj;
var objectTOArray = function (obj, keyName) {
    var _a;
    var arr = [];
    for (var key in obj) {
        var objItem = void 0;
        if (keyName) {
            objItem = __assign((_a = {}, _a[keyName] = key, _a), obj[key]);
        }
        else {
            objItem = obj[key];
        }
        arr.push(objItem);
    }
    return arr;
};
exports.objectTOArray = objectTOArray;
