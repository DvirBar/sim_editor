"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function useOnClickOutside(ref, display, callback) {
    react_1.useEffect(function () {
        var listener = function (event) {
            // Do nothing if clicking ref element or descendent elements
            if (!ref.current ||
                ref.current.contains(event.target) ||
                !display)
                return;
            callback(event);
        };
        // For mice
        document.addEventListener('mousedown', listener);
        // For touch screens
        document.addEventListener('touchstart', listener);
        return function () {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, callback, display]);
}
exports.default = useOnClickOutside;
