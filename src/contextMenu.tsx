import OBR from '@owlbear-rodeo/sdk';
import { v4 } from 'uuid';

const ID = "com.mytracker.initiative";

export function setupContextMenu() {
  OBR.contextMenu.create({
    id: `${ID}/context-menu`,
    icons: [
      {
        icon: "/icons/add.svg",
        label: "Ajouter au traqueur",
        filter: {
          every: [
            { key: "layer", value: "CHARACTER" },
            { key: ["metadata", `${ID}/metadata`], value: undefined },
          ],
        },
      },
      {
        icon: "/icons/remove.svg",
        label: "Retirer du traqueur",
        filter: {
          every: [{ key: "layer", value: "CHARACTER" }],
        },
      },
    ],
    onClick(context) {
      const addToInitiative = context.items.every(
        (item) => item.metadata[`${ID}/metadata`] === undefined
      );
      if (addToInitiative) {
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            item.metadata[`${ID}/metadata`] = {
              id: v4(),
              initiative: 0,
              initBonus: 0,
              ac: 0,
              hpMax: 0, 
              hp: 0,
              hpTemp: 0,
              spellDD: 0,
              melee: 0,
              range: 0,
              cast: 0
            };
          }
        });
      } else {
        OBR.scene.items.updateItems(context.items, (items) => {
          for (let item of items) {
            delete item.metadata[`${ID}/metadata`];
          }
        });
      }
    },
  });
}