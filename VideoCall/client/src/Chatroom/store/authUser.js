import { atom } from "recoil";

export const authUserAtom = atom({
  key: "authUserAtom",
  default: {
    id: "660128e020c0f0ac18fda708",
    firstName: "NightEye",
    profile_pic: "",
  },
});
