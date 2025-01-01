import { Game, Player } from "@gathertown/gather-game-client";
import { ActionType, MessageSource } from "../popup/enums";

const fnc = (event: any) => {
  if (event.source != window) {
    return;
  }

  if (event.data.type && event.data.type === MessageSource.EXTENSION) {
    switch (event.data.action) {
      case ActionType.SINGLE_EMOTICON:
        setEmote(event.data.data);
        break;
      case ActionType.MULTI_EMOTICON:
        multiEmote(event.data.data.emote);
        break;
      case ActionType.STEAL_GOKART:
        stealGocart();
        break;
      case ActionType.GET_PLAYERS:
        const players = getAllPlayer();
        window.postMessage(
          {
            type: MessageSource.GATHER,
            action: ActionType.GET_PLAYERS,
            players,
          },
          "*"
        );
        break;
      case ActionType.TELEPORT:
        const player = event.data.data as Player;
        teleport(player.map, player.x, player.y)
        break;
    }
  }
};

window.addEventListener("message", fnc, false);

const setEmote = (emote: string) => {
  const isEmoji = (str: string) => /[\p{Emoji}]/u.test(str);

  if (emote.length > 1 && !isEmoji(emote)) {
    multiEmote(emote);
  } else {
    window.game.setEmote(emote);
  }
};

const multiEmote = async (emote: string) => {
  for (let i = 0; i < 5; i++) {
    for (let c = 0; c < emote.length; c++) {
      window.game.setEmote(emote.charAt(c));
      await new Promise((r) => setTimeout(r, 500));
    }
    window.game.setEmote("");
  }
};

const teleport = async (map: string, x: number, y: number) => {
  window.game.teleport(map, x, y);
};

const getAllPlayer = () => {
  return window.game.players;
};

const stealGocart = async () => {
  for (let mapId of Object.keys(window.game.completeMaps)) {
    const gokartObjects = window.game.filterObjectsInMap(
      mapId,
      (obj) => obj?._name === "Go-kart"
    );
    if (gokartObjects.length) {
      const gokart = gokartObjects[0];
      if (!gokart || !gokart.id) return;
      const gokartObj = window.game.getObject(gokart.id);
      if (!gokartObj) return;
      window.game.interact(mapId, gokartObj.key);
      break;
    }
  }
};
declare global {
  interface Window {
    game: Game;
  }
}

export {};
