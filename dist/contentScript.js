/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup/enums.ts":
/*!****************************!*\
  !*** ./src/popup/enums.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ActionType: () => (/* binding */ ActionType),
/* harmony export */   MessageSource: () => (/* binding */ MessageSource)
/* harmony export */ });
var ActionType;
(function (ActionType) {
    ActionType["SINGLE_EMOTICON"] = "SINGLE_EMOTICON";
    ActionType["MULTI_EMOTICON"] = "MULTI_EMOTICON";
    ActionType["STEAL_GOKART"] = "STEAL_GOKART";
    ActionType["GET_PLAYERS"] = "GET_PLAYERS";
    ActionType["TELEPORT"] = "TELEPORT";
    ActionType["MOVEMENT_SPEED"] = "MOVEMENT_SPEED";
})(ActionType || (ActionType = {}));
var MessageSource;
(function (MessageSource) {
    MessageSource["GATHER"] = "GATHER";
    MessageSource["EXTENSION"] = "EXTENSION";
})(MessageSource || (MessageSource = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************************!*\
  !*** ./src/contentScript/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popup_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../popup/enums */ "./src/popup/enums.ts");

const head = document.head;
const script = document.createElement("script");
script.src = chrome.runtime.getURL("script.js");
script.onload = () => {
    console.log("Injected script loaded successfully");
};
script.onerror = (error) => {
    console.error("Error loading injected script:", error);
};
head.appendChild(script);
const fnc = (event) => {
    if (event.source != window) {
        return;
    }
    if (event.data.type && event.data.type == _popup_enums__WEBPACK_IMPORTED_MODULE_0__.MessageSource.GATHER) {
        switch (event.data.action) {
            case _popup_enums__WEBPACK_IMPORTED_MODULE_0__.ActionType.GET_PLAYERS:
                chrome.runtime.sendMessage({
                    action: event.data.action,
                    data: event.data.players,
                });
                break;
        }
    }
};
window.addEventListener("message", fnc, false);
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    window.postMessage({ type: _popup_enums__WEBPACK_IMPORTED_MODULE_0__.MessageSource.EXTENSION, action: request.action, data: request.data }, "*");
    sendResponse(request);
});

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map