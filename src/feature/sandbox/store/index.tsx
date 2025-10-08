import { atom } from "jotai";
import { ItemList } from "../data/ItemList";

// Only for testing purpose
// reset value to 0 if you want to deploy
const multiply = 0;

export const selectedBlock = atom(ItemList[1]);
export const activeToolbarIndex = atom(0);
export const listToolbarItems = atom(ItemList.slice(0 + 9 * multiply, 9 + 9 * multiply));
