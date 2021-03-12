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
require("./DocEditor.css");
var ChooseSims_1 = __importDefault(require("./ChooseSims/ChooseSims"));
var ModifyEditor_1 = __importDefault(require("./ModifyEditor/ModifyEditor"));
var SimContext_1 = require("../../../context/SimContext");
var InfoContext_1 = require("../../../context/InfoContext");
var ManageOptions_1 = __importDefault(require("./ManageOptions/ManageOptions"));
var DocEditor = /** @class */ (function (_super) {
    __extends(DocEditor, _super);
    function DocEditor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DocEditor.prototype.render = function () {
        return (<div className="doc-editor-wrapper">
                <div className="doc-editor">
                    <SimContext_1.SimContext.Consumer>
                        {function (context) {
                return <react_1.Fragment>
                                <ModifyEditor_1.default context={context} selectedDoc={context.selectedDoc}/>  

                                <InfoContext_1.InfoContext.Consumer>
                                    {function (infoContext) {
                        var _a, _b;
                        return ((_a = infoContext.errors.docErrors[context.selectedDoc]) === null || _a === void 0 ? void 0 : _a.ChaptersError) &&
                            <div className="errors">
                                            {(_b = infoContext.errors.docErrors[context.selectedDoc]) === null || _b === void 0 ? void 0 : _b.ChaptersError}
                                        </div>;
                    }}
                                </InfoContext_1.InfoContext.Consumer>

                                <ChooseSims_1.default /><br />
                                <ManageOptions_1.default options={context.options} toggleSuffle={context.toggleShuffle}/>
                            </react_1.Fragment>;
            }}
                    </SimContext_1.SimContext.Consumer> 
                </div>
            </div>);
    };
    return DocEditor;
}(react_1.Component));
exports.default = DocEditor;
