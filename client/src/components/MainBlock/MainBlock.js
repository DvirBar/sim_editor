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
require("./MainBlock.css");
var SimContext_1 = require("../../context/SimContext");
var core_1 = require("@material-ui/core");
var DocEditor_1 = __importDefault(require("./DocEditor/DocEditor"));
var StagedDocs_1 = __importDefault(require("./StagedDocs/StagedDocs"));
var MainBlock = /** @class */ (function (_super) {
    __extends(MainBlock, _super);
    function MainBlock(props) {
        var _this = _super.call(this, props) || this;
        _this.changeDisplay = function (status) {
            _this.setState({
                display: status
            });
        };
        _this.state = {
            display: false
        };
        return _this;
    }
    MainBlock.prototype.render = function () {
        var _this = this;
        return (<SimContext_1.SimContext.Consumer>
                {function (context) {
                return <div className="main-block">
                    <div className="main-block__top-bar">
                        <core_1.Button onClick={function () { return context.createDoc(); }} className="main-block__top-bar__create-button" variant="contained" color="primary">
                            סימולציה חדשה
                        </core_1.Button>

                        {Object.keys(context.documents).length > 0 &&
                        <div className="display-staged-sims">
                            <core_1.Button color="secondary" variant="contained" className="display-staged-sims" onClick={function () { return _this.setState({ display: true }); }}>
                                הצגת סימולציות
                            </core_1.Button>
                        </div>}
                    </div>
                    
                    {Object.keys(context.documents).length > 0 &&
                        <div className="main-block__body">
                            {context.selectedDoc in context.documents
                                ? <DocEditor_1.default />
                                : <div className="main-block__body__no-doc">
                                    <span>בחרו סימולציה</span>
                                </div>}
                            <StagedDocs_1.default display={_this.state.display} changeDisplay={_this.changeDisplay} documents={context.documents}/>
                        </div>}
                </div>;
            }}
            </SimContext_1.SimContext.Consumer>);
    };
    return MainBlock;
}(react_1.Component));
exports.default = MainBlock;
