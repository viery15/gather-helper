import { Player } from "@gathertown/gather-game-client";
import { ActionType, MessageSource } from "../popup/enums";

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

const fnc = (event: MessageEvent) => {
  if (event.source != window) {
    return;
  }
  if (event.data.type && event.data.type == MessageSource.GATHER) {
    switch (event.data.action) {
      case ActionType.GET_PLAYERS:
        chrome.runtime.sendMessage({
          action: event.data.action,
          data: event.data.players,
        });
        break;
    }
  }
};

window.addEventListener("message", fnc, false);

chrome.runtime.onMessage.addListener(
  (
    request: {
      action: keyof typeof ActionType;
      data: any;
    },
    sender,
    sendResponse
  ) => {
    window.postMessage(
      { type: MessageSource.EXTENSION, action: request.action, data: request.data },
      "*"
    );
    sendResponse(request);
  }
);

export {};
