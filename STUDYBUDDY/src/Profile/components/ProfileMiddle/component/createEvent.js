import { BASE_URL } from "../../../../config";

export const createEvent = async (data) => {
  const apiUrl = `${BASE_URL}/user/new-event`;
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  console.log(result);
};
