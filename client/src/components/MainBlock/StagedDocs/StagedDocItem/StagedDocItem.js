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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@material-ui/core");
var react_1 = __importStar(require("react"));
var InfoContext_1 = require("../../../../context/InfoContext");
var SimContext_1 = require("../../../../context/SimContext");
require("./StagedDocItem.css");
var StagedDocItem = /** @class */ (function (_super) {
    __extends(StagedDocItem, _super);
    function StagedDocItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StagedDocItem.prototype.render = function () {
        var _this = this;
        var id = this.props.id;
        return (<SimContext_1.SimContext.Consumer>
            {function (simContext) {
                return <InfoContext_1.InfoContext.Consumer>
                    {function (infoContext) {
                        return <core_1.Button color={simContext.selectedDoc === id
                                ? 'primary' : 'secondary'} variant="contained" className={(simContext.documents[id] === ''
                                ? 'no-name' : '') + "\n                        " + (infoContext.errors.docErrors[id] ? 'error' : '')} onClick={function () {
                                _this.props.changeDisplay(false);
                                simContext.selectDoc(id);
                            }}>
                            {simContext.documents[id] === ''
                                ? '- ללא שם -' : simContext.documents[id]}
                        </core_1.Button>;
                    }}
                </InfoContext_1.InfoContext.Consumer>;
            }}
            </SimContext_1.SimContext.Consumer>);
    };
    return StagedDocItem;
}(react_1.Component));
exports.default = StagedDocItem;
