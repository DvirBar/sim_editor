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
var SimContext_1 = require("../../../../../../context/SimContext");
var ChosenChapterItem_1 = __importDefault(require("../ChosenChapterItem/ChosenChapterItem"));
require("./ChosenChapters.css");
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var ChosenChaptersList = /** @class */ (function (_super) {
    __extends(ChosenChaptersList, _super);
    function ChosenChaptersList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChosenChaptersList.prototype.render = function () {
        var _this = this;
        var changeSimIndex = this.context.changeSimIndex;
        return (<react_beautiful_dnd_1.DragDropContext onDragEnd={function (result) {
                var _a;
                return changeSimIndex(result.draggableId, result.source.index, (_a = result.destination) === null || _a === void 0 ? void 0 : _a.index);
            }}>
                <react_beautiful_dnd_1.Droppable droppableId="chosen-chapters">
                    {function (provided) { return (<div className="chosen-chapters__list" {...provided.droppableProps} ref={provided.innerRef}>
                            {_this.props.simsArray.map(function (simItem) {
                    return <ChosenChapterItem_1.default id={simItem.id} sim={simItem}/>;
                })}
                            {provided.placeholder}
                        </div>); }}
                </react_beautiful_dnd_1.Droppable>
            </react_beautiful_dnd_1.DragDropContext>);
    };
    ChosenChaptersList.contextType = SimContext_1.SimContext;
    return ChosenChaptersList;
}(react_1.Component));
exports.default = ChosenChaptersList;
