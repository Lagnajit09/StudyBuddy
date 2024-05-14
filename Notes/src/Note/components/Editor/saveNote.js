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
    alert("Note saved.");
  } else if (response.status === 410) {
    alert("Note with same name already exist, check trash or archives!");
  } else if (response.status === 408) {
    alert("Note already exists!");
  } else if (response.status === 450) {
    alert("Provide either folderId or topicId, not both!");
  } else if (response.status === 430) {
    alert(
      "Note with same name from this folder already exist, check trash or archives!"
    );
  } else if (response.status === 428) {
    alert("Note already exists in the folder!");
  } else if (response.status === 420) {
    alert(
      "Note with same name from this topic already exist, check trash or archives!"
    );
  } else if (response.status === 418) {
    alert("Note already exists in the topic!");
  }
};
