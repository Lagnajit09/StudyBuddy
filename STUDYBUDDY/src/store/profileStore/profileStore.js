import { atom } from "recoil";
export const openCalendarAtom = atom({
  key: "openCalendarAtom",
  default: false,
});

// export const PrStyle = atom({
//   key: "PrStyle",
//   default: false,
// });

// export const SetStyle = atom({
//   key: "SetStyle",
//   default: false,
// });

// export const HeStyle = atom({
//   key: "HeStyle",
//   default: false,
// });

export const openAddEvent = atom({
  key: "openAddEvent",
  default: false,
});

export const openCalendarEvent = atom({
  key: "openCalendarEvent",
  default: false,
});

export const defDate = atom({
  key: "defDate",
  default: false,
});

export const defSTime = atom({
  key: "defSTime",
  default:
    (new Date(Date.now()).getHours() == "0"
      ? "00"
      : new Date(Date.now()).getHours() &&
        new Date(Date.now()).getHours() < 10 &&
        new Date(Date.now()).getHours() != "0"
      ? "0" + new Date(Date.now()).getHours()
      : new Date(Date.now()).getHours()) +
    ":" +
    (new Date(Date.now()).getMinutes() == "0"
      ? "00"
      : new Date(Date.now()).getMinutes() &&
        (new Date(Date.now()).getMinutes() < 10 &&
        new Date(Date.now()).getMinutes() != "0"
          ? "0" + new Date(Date.now()).getMinutes()
          : new Date(Date.now()).getMinutes())),
});

export const defETime = atom({
  key: "defETime",
  default:
    (new Date(Date.now()).getHours() == "0"
      ? "00"
      : new Date(Date.now()).getHours() &&
        new Date(Date.now()).getHours() < 10 &&
        new Date(Date.now()).getHours() != "0"
      ? "0" + new Date(Date.now()).getHours()
      : new Date(Date.now()).getHours()) +
    ":" +
    (new Date(Date.now()).getMinutes() == "0"
      ? "00"
      : new Date(Date.now()).getMinutes() &&
        (new Date(Date.now()).getMinutes() < 10 &&
        new Date(Date.now()).getMinutes() != "0"
          ? "0" + new Date(Date.now()).getMinutes()
          : new Date(Date.now()).getMinutes())),
});

export const userCoursesAtom = atom({
  key: "userCoursesAtom",
  default: [],
});

export const recommendedCoursesAtom = atom({
  key: "recommendedCoursesAtom",
  default: [],
});
