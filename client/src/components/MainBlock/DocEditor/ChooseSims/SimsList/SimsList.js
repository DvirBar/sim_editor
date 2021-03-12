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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var SimContext_1 = require("../../../../../context/SimContext");
var core_1 = require("@material-ui/core");
require("./SimsList.css");
var SimItem_1 = __importDefault(require("./SimItem/SimItem"));
var SimsList = /** @class */ (function (_super) {
    __extends(SimsList, _super);
    function SimsList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SimsList.prototype.render = function () {
        return (<core_1.List component="nav" aria-labelledby="nested-list-subheader" className="sims-list">
                <div className="sims-list__body">
                    <SimContext_1.SimContext.Consumer>
                        {function (context) { return context.simData.map(function (simItem) {
                return simItem.months.length > 0 &&
                    <SimItem_1.default key={simItem.year} simItem={simItem}/>;
            }); }}
                    </SimContext_1.SimContext.Consumer>
                </div>
            </core_1.List>);
    };
    return SimsList;
}(react_1.Component));
exports.default = SimsList;
