import { ActionType } from "../popup/enums";

const fnc = (event: any) => {
  if (event.source != window) {
    return;
  }
  let { emote } = event.data.data;

  switch (event.data.action) {
    case ActionType.SINGLE_EMOTICON:
      singleEmote(emote);
      break;
    case ActionType.MULTI_EMOTICON:
      console.log(event.data)
      multiEmote(event.data.data.emote);
      break;
  }
};

window.addEventListener("message", fnc, false);

const singleEmote = (emote: string) => {
  window.game.setEmote(emote);
};

const multiEmote = async (emote: string) => {
  console.log(emote)
  for (let i = 0; i < 5; i++) {
    for (let c = 0; c < emote.length; c++) {
      window.game.setEmote(emote.charAt(c));
      await new Promise((r) => setTimeout(r, 500));
    }
    window.game.setEmote("");
  }
};

declare global {
  interface Window {
    game: {
      setEmote: (emote: string) => void;
    };
  }
}

export {};
