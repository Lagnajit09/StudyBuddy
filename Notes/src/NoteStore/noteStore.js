import { atom } from "recoil";
export const noteUserAtom = atom({
  key: "noteUserAtom ",
  default: [],
});
export const deletedNotesAtom = atom({
  key: "deletedNotesAtom",
  default: [],
});
export const archivedNotesAtom = atom({
  key: "archivedNotesAtom",
  default: [],
});
