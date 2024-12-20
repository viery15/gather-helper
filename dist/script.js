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
/* harmony export */   ActionType: () => (/* binding */ ActionType)
/* harmony export */ });
var ActionType;
(function (ActionType) {
    ActionType["SINGLE_EMOTICON"] = "SINGLE_EMOTICON";
    ActionType["MULTI_EMOTICON"] = "MULTI_EMOTICON";
    ActionType["STEAL_GOKART"] = "STEAL_GOKART";
})(ActionType || (ActionType = {}));


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
/*!*************************************!*\
  !*** ./src/contentScript/script.ts ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popup_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../popup/enums */ "./src/popup/enums.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const fnc = (event) => {
    if (event.source != window) {
        return;
    }
    let { emote } = event.data.data;
    switch (event.data.action) {
        case _popup_enums__WEBPACK_IMPORTED_MODULE_0__.ActionType.SINGLE_EMOTICON:
            singleEmote(emote);
            break;
        case _popup_enums__WEBPACK_IMPORTED_MODULE_0__.ActionType.MULTI_EMOTICON:
            multiEmote(event.data.data.emote);
            break;
        case _popup_enums__WEBPACK_IMPORTED_MODULE_0__.ActionType.STEAL_GOKART:
            stealGocart();
            break;
    }
};
window.addEventListener("message", fnc, false);
const singleEmote = (emote) => {
    window.game.setEmote(emote);
};
const multiEmote = (emote) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 5; i++) {
        for (let c = 0; c < emote.length; c++) {
            window.game.setEmote(emote.charAt(c));
            yield new Promise((r) => setTimeout(r, 500));
        }
        window.game.setEmote("");
    }
});
const stealGocart = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let mapId of Object.keys(window.game.completeMaps)) {
        const gokartObjects = window.game.filterObjectsInMap(mapId, (obj) => (obj === null || obj === void 0 ? void 0 : obj._name) === "Go-kart");
        if (gokartObjects.length) {
            const gokart = gokartObjects[0];
            if (!gokart || !gokart.id)
                return;
            const gokartObj = window.game.getObject(gokart.id);
            if (!gokartObj)
                return;
            window.game.interact(mapId, gokartObj.key);
            break;
        }
    }
});

})();

/******/ })()
;
//# sourceMappingURL=script.js.map