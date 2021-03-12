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
exports.createSortedArray = void 0;
var createSortedArray = function (selectedSims, docId) {
    var sortedSims = [];
    for (var sim in selectedSims) {
        if (selectedSims[sim].doc === docId) {
            sortedSims.push(__assign({ id: sim }, selectedSims[sim]));
        }
    }
    return sortedSims.sort(function (a, b) { return a.index - b.index; });
};
exports.createSortedArray = createSortedArray;
