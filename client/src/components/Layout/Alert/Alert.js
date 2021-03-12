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
var icons_1 = require("@material-ui/icons");
var react_1 = __importStar(require("react"));
require("./Alert.css");
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert(props) {
        var _this = _super.call(this, props) || this;
        _this.setCloseTimeOut = function () {
            _this.timerID =
                window.setTimeout(function () {
                    return _this.closeAlert();
                }, 5000);
        };
        _this.closeAlert = function () {
            _this.setState({
                open: false
            }, function () { return _this.timerID = window.setTimeout(function () {
                return _this.props.changeGenError('');
            }, 300); });
        };
        _this.state = {
            open: false,
            shake: false,
            called: false
        };
        _this.timerID = 0;
        return _this;
    }
    Alert.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        if (prevProps.error !== this.props.error && this.props.error !== '') {
            this.setState({
                open: true
            }, function () { return _this.setCloseTimeOut(); });
        }
    };
    Alert.prototype.componentWillUnmount = function () {
        window.clearInterval(this.timerID);
    };
    Alert.prototype.render = function () {
        var _this = this;
        return (<div className={"wrapper \n            " + (this.state.open ? 'open' : '')}>
                <div className={"alert\n                " + (this.state.shake ? 'shake' : '')}>
                    <icons_1.Close onClick={function () { return _this.closeAlert(); }} className="alert--close"/>
                    <div className="alert__text">
                        <span>
                            {this.props.error}
                        </span>
                    </div>
                </div>
            </div>);
    };
    return Alert;
}(react_1.Component));
exports.default = Alert;
