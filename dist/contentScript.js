/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
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
/*!************************************!*\
  !*** ./src/contentScript/index.ts ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
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
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const message = {
        action: request.action,
        data: { emote: request.emoticon },
    };
    window.postMessage(message, "*");
    sendResponse({ success: true });
    return true;
});
window.addEventListener("message", (event) => {
    console.log("Content script received window message:", event.data);
}, false);


/******/ })()
;
//# sourceMappingURL=contentScript.js.map