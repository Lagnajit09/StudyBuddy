export const saveNote = async (title, content, contentText, userId) => {
  const response = await fetch("http://localhost:3000/note/makenote", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, contentText, userId }),
  });
  if (!response.ok) {
    console.error("Network error!");
  }
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
  }
};
