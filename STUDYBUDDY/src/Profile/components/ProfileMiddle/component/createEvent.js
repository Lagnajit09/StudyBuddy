import { BASE_URL } from "../../../../config";
const userId = localStorage.getItem("userId");

const formatTime = (timeString) => {
  // Split the time into hours and minutes
  const [hours, minutes] = timeString.split(":");

  // Convert hours to 12-hour format
  let formattedHours = hours % 12;
  formattedHours = formattedHours ? formattedHours : 12; // '0' should be displayed as '12'

  // Determine whether it's AM or PM
  const meridiem = hours >= 12 ? "PM" : "AM";

  // Construct the formatted time string
  const formattedTime = `${formattedHours}:${minutes} ${meridiem}`;

  console.log(formattedTime); // Output: "9:40 PM"

  return formattedTime;
};

const formatDate = (dateString) => {
  const dateParts = dateString.split("-");
  const year = dateParts[0];
  const month = parseInt(dateParts[1], 10); // Parsing month as an integer
  const day = parseInt(dateParts[2], 10); // Parsing day as an integer

  // Create an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month name
  const monthName = monthNames[month - 1]; // Subtract 1 because months are zero-based

  // Construct the formatted date
  const date = `${monthName} ${day}, ${year}`;

  console.log(date); // Output: "May 13, 2024"

  return date;
};

export const createEvent = async (
  title,
  dateString,
  startString,
  endString,
  notif,
  userEvents,
  setUserEvents
) => {
  const date = formatDate(dateString);
  const start = formatTime(startString);
  const end = formatTime(endString);

  const apiUrl = `${BASE_URL}/user/new-event`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, date, start, end, notif, userId }),
  });

  if (!response.ok) {
    console.log("Network error");
    return;
  }

  const result = await response.json();
  console.log(result);

  setUserEvents([...userEvents, { title, start, end, date, userId }]);
};
