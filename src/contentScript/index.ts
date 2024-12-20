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

window.addEventListener(
  "message",
  (event) => {
    console.log("Content script received window message:", event.data);
  },
  false
);

export {};
