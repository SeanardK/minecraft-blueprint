import { atom } from "jotai";
import { ItemList } from "../data/ItemList";

export const selectedBlock = atom(ItemList[1]);
export const activeToolbarIndex = atom(0);
export const listToolbarItems = atom(ItemList.slice(1, 10));
