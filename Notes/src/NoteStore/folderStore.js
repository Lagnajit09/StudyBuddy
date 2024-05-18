import { atom } from "recoil";
export const folderUserAtom = atom({
  key: "folderUserAtom",
  default: [],
});
export const deletedFoldersAtom = atom({
  key: "deletedFoldersAtom",
  default: [],
});
export const archivedFoldersAtom = atom({
  key: "archivedFoldersAtom",
  default: [],
});
