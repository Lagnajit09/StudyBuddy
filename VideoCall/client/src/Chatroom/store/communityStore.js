import { atom } from "recoil";
import io from "socket.io-client";
export const socket = io("http://localhost:3000", {
  withCredentials: true,
});

export const joinedCommunitiesAtom = atom({
  key: "joinedCommunitiesAtom",
  default: [],
});

export const currentCommunityAtom = atom({
  key: "currentCommunityAtom",
  default: {},
});

export const communityMessagesAtom = atom({
  key: "communityMessagesAtom",
  default: [],
});

export const newCommunityMsgAtom = atom({
  key: "newCommunityMsgAtom",
  default: [],
});
