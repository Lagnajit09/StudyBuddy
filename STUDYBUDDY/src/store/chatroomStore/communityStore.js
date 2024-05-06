import { atom } from "recoil";

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

export const communityMemberDetailsAtom = atom({
  key: "communityMemberDetailsAtom",
  default: {},
});
