import { atom } from "recoil";
export const openCalendarAtom = atom({
  key: "openCalendarAtom",
  default: false,
});

function getCurrentDate() {
  const now = new Date(); // Get the current date and time
  // Extract day, month, and year from the current date
  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are zero-based, so add 1
  const year = now.getFullYear();
  // Format the day and month as 2-digit strings (e.g., '02' instead of '2')
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  // Combine the formatted day, month, and year into a date string
  const currentDate = `${year}-${formattedMonth}-${formattedDay}`;
  // Return the current date
  return currentDate;
}

var d = getCurrentDate();

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
  default: d,
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

export const userEventsAtom = atom({
  key: "userEventsAtom",
  default: [],
});
