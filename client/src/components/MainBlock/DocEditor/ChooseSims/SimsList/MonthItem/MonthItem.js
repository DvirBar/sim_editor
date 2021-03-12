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
var ChapterItem_1 = __importDefault(require("../ChapterItem/ChapterItem"));
var icons_1 = require("@material-ui/icons");
var MonthItem = /** @class */ (function (_super) {
    __extends(MonthItem, _super);
    function MonthItem(props) {
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
    MonthItem.prototype.render = function () {
        var _this = this;
        var _a;
        return (<react_1.Fragment>
                <core_1.ListItem onClick={this.handleClick} button>
                    <core_1.ListItemText primary={this.props.monthItem.name}/>
                    {this.state.open ? <icons_1.ExpandLess /> : <icons_1.ExpandMore />}
                </core_1.ListItem>
                <core_1.Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <core_1.List component="div" className="months-list">
                        {(_a = this.props.monthItem.chapters) === null || _a === void 0 ? void 0 : _a.map(function (chapterItem) {
                return <ChapterItem_1.default key={chapterItem.id} chapter={chapterItem} year={_this.props.year} date={_this.props.monthItem}/>;
            })}
                    </core_1.List>
                </core_1.Collapse>
            </react_1.Fragment>);
    };
    return MonthItem;
}(react_1.Component));
exports.default = MonthItem;
