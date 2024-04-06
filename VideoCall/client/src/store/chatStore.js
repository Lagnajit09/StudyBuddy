import { atom } from "recoil";
import io from "socket.io-client";
export const socket = io("http://localhost:3000", {
  withCredentials: true,
});

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

export const newMessageAtom = atom({
  key: "newMessageAtom",
  default: [],
});
