import { BASE_URL } from "../../../../../config";

const bgcolor = [
  "linear-gradient(180deg, rgba(255,255,255,1) 71%, rgba(231,136,149,1) 100%)",
  "linear-gradient(180deg, rgba(255,255,255,1) 71%, rgba(99,180,184,1) 100%)",
  "linear-gradient(180deg, rgba(255,255,255,1) 71%, rgba(161,151,252,1) 100%)",
  "linear-gradient(180deg, rgba(255,255,255,1) 71%, rgba(255,210,143,1) 100%)",
  "linear-gradient(180deg, rgba(255,255,255,1) 71%, rgba(121,178,217,1) 100%)",
  "linear-gradient(180deg, rgba(255,255,255,1) 71%, rgba(57,184,212,1) 100%)",
];

export const addCourse = async (course, userId, token) => {
  let cap_bcolor;
  if (course.c_name === "Physics") {
    cap_bcolor = bgcolor[2];
  } else if (course.c_name === "chemistry") {
    cap_bcolor = bgcolor[1];
  } else if (course.c_name === "biology") {
    cap_bcolor = bgcolor[3];
  } else if (course.c_name === "Mathematics") {
    cap_bcolor = bgcolor[4];
  } else if (course.c_name === "AI and Cloud Computing") {
    cap_bcolor = bgcolor[0];
  } else if (course.c_name === "IT and Software") {
    cap_bcolor = bgcolor[5];
  }

  const data = {
    userId,
    course: {
      ...course,
      cap_bcolor,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/user-course/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Network error");
    }
    if (response.status === 410) {
      console.log("Course already exists!");
      return;
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Internal server error");
  }
};

export const removeCourse = async (course, userId, token) => {
  const data = { userId, cap: course.cap };

  try {
    const response = await fetch(`${BASE_URL}/user-course/remove`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.log("Network error");
    }
    if (response.status === 410) {
      console.log("Course doesn't exist!");
      return;
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Internal server error");
  }
};
