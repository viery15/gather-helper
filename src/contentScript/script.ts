import { Game, MapObjectToAdd, Player } from "@gathertown/gather-game-client";
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
        teleport(player.map, player.x, player.y);
        break;
      case ActionType.MOVEMENT_SPEED:
        setMovementSpeed(event.data.data);
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

const setMovementSpeed = async (speed: number) => {
  window.game.setSpeedModifier(speed);
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

async function attack() {
  const attackRange = 5;
  const myPlayer = window.game.getMyPlayer();

  const object: MapObjectToAdd = {
    height: 2,
    width: 2,
    zIndex: 999,
    type: 0,
    x: 0,
    y: 0,
    normal:
      "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/uploads/AINCCmZXW7UUFZtu/IMwxmC96B6NXmuNjqXScPb",
    _name: "",
  };

  const coordinateToClear = [];

  for (let i = 0; i < attackRange; i++) {
    switch (myPlayer.direction) {
      case 3: // up
        object.x = myPlayer.x;
        object.y = myPlayer.y - 1 - i;

        window.game.setImpassable(myPlayer.map, object.x, object.y, true);
        coordinateToClear.push({ x: object.x, y: object.y });

        window.game.setImpassable(myPlayer.map, object.x + 1, object.y, true);
        coordinateToClear.push({ x: object.x + 1, y: object.y });

        window.game.setImpassable(myPlayer.map, object.x - 1, object.y, true);
        coordinateToClear.push({ x: object.x - 1, y: object.y });

        break;
      case 5: // left
        object.x = myPlayer.x - 1 - i;
        object.y = myPlayer.y;

        window.game.setImpassable(myPlayer.map, object.x, object.y, true);
        coordinateToClear.push({ x: object.x, y: object.y });

        window.game.setImpassable(myPlayer.map, object.x, object.y + 1, true);
        coordinateToClear.push({ x: object.x, y: object.y + 1 });

        window.game.setImpassable(myPlayer.map, object.x, object.y - 1, true);
        coordinateToClear.push({ x: object.x, y: object.y - 1 });
        break;
      case 7: // right
        object.x = myPlayer.x + i;
        object.y = myPlayer.y;

        window.game.setImpassable(myPlayer.map, object.x, object.y, true);
        coordinateToClear.push({ x: object.x, y: object.y });

        window.game.setImpassable(myPlayer.map, object.x, object.y + 1, true);
        coordinateToClear.push({ x: object.x, y: object.y + 1 });

        window.game.setImpassable(myPlayer.map, object.x, object.y - 1, true);
        coordinateToClear.push({ x: object.x, y: object.y - 1 });
        break;
      case 1: // down
        object.x = myPlayer.x;
        object.y = myPlayer.y + i;

        window.game.setImpassable(myPlayer.map, object.x, object.y, true);
        coordinateToClear.push({ x: object.x, y: object.y });

        window.game.setImpassable(myPlayer.map, object.x + 1, object.y, true);
        coordinateToClear.push({ x: object.x + 1, y: object.y });

        window.game.setImpassable(myPlayer.map, object.x - 1, object.y, true);
        coordinateToClear.push({ x: object.x - 1, y: object.y });
        break;
    }
    object._name = `${myPlayer.id}-attack-${i}`;
    object.id = `${myPlayer.id}-attack-${i}`;
    window.game.addObject(myPlayer.map, object);

    await new Promise((r) => setTimeout(r, 100));
  }
  await new Promise((r) => setTimeout(r, 3000));
  for (const coord of coordinateToClear) {
    window.game.setImpassable(myPlayer.map, coord.x, coord.y, false);
  }

  const objectToRemove = window.game.filterObjectsInMap(myPlayer.map, (o) =>
    o._name?.includes(`${myPlayer.id}-attack`)
  );

  for (let i = 0; i < objectToRemove.length; i++) {
    try {
      window.game.deleteObject(
        myPlayer.map,
        objectToRemove[i].id!,
        true
      );
    } catch (e) {}
    await new Promise((r) => setTimeout(r, 100));
  }
}

document.onkeydown = function (event) {
  if (event.keyCode === 67) { // C
    attack();
  }
};

declare global {
  interface Window {
    game: Game;
  }
}

export {};
