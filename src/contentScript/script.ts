import { ActionType } from "../popup/enums";

const fnc = (event: any) => {
  if (event.source != window) {
    return;
  }

  switch (event.data.action) {
    case ActionType.SINGLE_EMOTICON:
      const { emote } = event.data.data;
      singleEmote(emote);
      break;
  }
};

window.addEventListener("message", fnc, false);

const singleEmote = (emote: string) => {
  window.game.setEmote(emote);
};

declare global {
  interface Window {
    game: {
      setEmote: (emote: string) => void;
    };
  }
}

export {};
