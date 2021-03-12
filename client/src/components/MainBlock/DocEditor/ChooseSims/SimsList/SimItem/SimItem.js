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
var core_1 = require("@material-ui/core");
var icons_1 = require("@material-ui/icons");
var MonthItem_1 = __importDefault(require("../MonthItem/MonthItem"));
require("./SimItem.css");
var SimItem = /** @class */ (function (_super) {
    __extends(SimItem, _super);
    function SimItem(props) {
        var _this = _super.call(this, props) || this;
        _this.handleClick = function () {
            _this.setState(function (state) { return ({
                open: !state.open
            }); });
        };
        _this.state = {
            open: false
        };
        return _this;
    }
    SimItem.prototype.render = function () {
        var _this = this;
        return (<react_1.Fragment>
                <core_1.ListItem button onClick={this.handleClick}>
                    <core_1.ListItemText primary={this.props.simItem.year}/>
                    {this.state.open ? <icons_1.ExpandLess /> : <icons_1.ExpandMore />}
                </core_1.ListItem>
                <core_1.Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <core_1.List component="div" className="months-list">
                        {this.props.simItem.months.map(function (monthItem) {
                return <MonthItem_1.default key={monthItem.id} monthItem={monthItem} year={_this.props.simItem.year}/>;
            })}
                    </core_1.List>
                </core_1.Collapse>
            </react_1.Fragment>);
    };
    return SimItem;
}(react_1.Component));
exports.default = SimItem;
