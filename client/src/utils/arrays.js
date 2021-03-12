"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayNumList = void 0;
var arrayNumList = function (min, max) {
    if (max > min) {
        var arr = [];
        for (var num = min; num <= max; num++) {
            arr.push(num);
        }
        return arr;
    }
    return [];
};
exports.arrayNumList = arrayNumList;
