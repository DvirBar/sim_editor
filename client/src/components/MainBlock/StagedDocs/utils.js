"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapStagedDocs = void 0;
var mapStagedDocs = function (documents) {
    var mappedDocs = [];
    for (var doc in documents) {
        mappedDocs.push(doc);
    }
    return mappedDocs;
};
exports.mapStagedDocs = mapStagedDocs;
