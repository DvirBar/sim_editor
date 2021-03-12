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
var icons_1 = require("@material-ui/icons");
var react_1 = __importStar(require("react"));
var InfoContext_1 = require("../../../../context/InfoContext");
require("./ModifyEditor.css");
var ModifyEditor = /** @class */ (function (_super) {
    __extends(ModifyEditor, _super);
    function ModifyEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.changeName = function (name) {
            if (name.length <= 30) {
                _this.setState({
                    name: name
                });
            }
        };
        _this.changeDocName = function () {
            var _a = _this.props, context = _a.context, selectedDoc = _a.selectedDoc;
            if (_this.state.name) {
                var isUnique = context.testUniqueName(_this.state.name, selectedDoc);
                if (isUnique) {
                    context.changeDocName(selectedDoc, _this.state.name);
                }
            }
        };
        _this.state = {
            name: _this.props.context.documents[_this.props.selectedDoc] || ''
        };
        return _this;
    }
    ModifyEditor.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.selectedDoc !== this.props.selectedDoc) {
            this.setState({
                name: this.props.context.documents[this.props.selectedDoc]
            });
        }
    };
    ModifyEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, context = _a.context, selectedDoc = _a.selectedDoc;
        return (<InfoContext_1.InfoContext.Consumer>
                {function (infoContext) {
                var _a, _b;
                return <div className="modify-editor">
                        <div className="field-container">
                            <core_1.TextField id="outlined-basic" value={_this.state.name} onChange={function (e) { return _this.changeName(e.target.value); }} onBlur={function () { return _this.changeDocName(); }} error={((_a = infoContext.errors.docErrors[selectedDoc]) === null || _a === void 0 ? void 0 : _a.NameError)
                        ? true : false} helperText={(_b = infoContext.errors.docErrors[selectedDoc]) === null || _b === void 0 ? void 0 : _b.NameError} label="שם הסימולציה" fullWidth={true}/>
                        </div>
                        <icons_1.Delete onClick={function () { return context.removeDoc(selectedDoc); }} className="remove-doc"/>
                    </div>;
            }}
            </InfoContext_1.InfoContext.Consumer>);
    };
    return ModifyEditor;
}(react_1.Component));
exports.default = ModifyEditor;
