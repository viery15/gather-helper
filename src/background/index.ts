import { ActionType } from "../popup/enums";

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});
