import { atom } from "recoil";

export const chatUsersAtom = atom({
  key: "chatUsersAtom",
  default: [],
});

export const chatMessageAtom = atom({
  key: "chatMessageAtom",
  default: [],
});
