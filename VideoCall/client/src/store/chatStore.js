import { atom } from "recoil";

export const chatUsersAtom = atom({
  key: "chatUsersAtom",
  default: [],
});

export const chatMessageAtom = atom({
  key: "chatMessageAtom",
  default: [],
});

export const currentChatAtom = atom({
  key: "currentChatAtom",
  default: {},
});

export const sendMessageAtom = atom({
  key: "sendMessageAtom",
  default: false,
});
