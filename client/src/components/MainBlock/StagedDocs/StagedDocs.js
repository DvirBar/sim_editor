"use strict";
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
var useOnClickOutside_1 = __importDefault(require("../../Common/OnClickOutside/useOnClickOutside"));
var StagedDocItem_1 = __importDefault(require("./StagedDocItem/StagedDocItem"));
require("./StagedDocs.css");
var StagedDocs = function (_a) {
    var documents = _a.documents, display = _a.display, changeDisplay = _a.changeDisplay;
    var ref = react_1.useRef(null);
    useOnClickOutside_1.default(ref, display, function () { return changeDisplay(false); });
    return (<div className="staged-docs-wrapper">
            <div className={"staged-docs-mask\n            " + (display ? 'display' : '')}></div>
            <div ref={ref} className={"staged-docs \n            " + (display ? 'display' : '')}>
                <div className="staged-docs__container">
                    <div>
                        <p className="staged-docs__title">
                            הסימולציות שלי:
                        </p>
                        <p className="staged-docs__subtitle">
                            ניתן ליצור עד 10 סימולציות
                        </p>
                    </div>

                    <div className="staged-docs__list">
                        {Object.keys(documents).map(function (key) {
            return <StagedDocItem_1.default key={key} changeDisplay={changeDisplay} id={key}/>;
        })}
                    </div>
                </div>
            </div>
        </div>);
};
exports.default = StagedDocs;
