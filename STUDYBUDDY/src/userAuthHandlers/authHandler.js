const colors = [
  "#00A9FF",
  "#B3ABFC",
  "#FCBF49",
  "#79B2D9",
  "#39B8D4",
  "#E78895",
  "#63B4B8",
];

export const signupHandler = async (
  event,
  formIsValid,
  email,
  firstname,
  lastname,
  password,
  setAuthUser,
  toggleSignupModal
) => {
  event.preventDefault();
  const profile_pic = colors[Math.floor(Math.random() * 7)];

  if (formIsValid) {
    const data = { email, firstname, lastname, password, profile_pic };

    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Network error");
      }
      if (response.status === 400) {
        const inpDiv = document.getElementsByClassName("s-email-input")[0];
        inpDiv.classList.add("input-error");
        const errorDiv = document.getElementsByClassName("s-email-invalid")[0];
        errorDiv.style.visibility = "visible";
        errorDiv.innerHTML = "Email already exists!";
        return;
      }

      const json = await response.json();

      setAuthUser(json);

      localStorage.setItem("token", json.token);
      localStorage.setItem("userId", json.userId);

      toggleSignupModal();
    } catch (error) {
      alert("Failed to sign up!");
    }
  } else {
    console.log("Invalid");
  }
};

export const loginHandler = async (
  event,
  email,
  password,
  formIsValid,
  setAuthUser,
  toggleLoginModal
) => {
  event.preventDefault();

  if (formIsValid) {
    const data = { email, password };

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        console.log("Network error");
      }
      if (response.status === 404) {
        const inpDiv = document.getElementsByClassName("email-input")[0];
        inpDiv.classList.add("input-error");
        const errorDiv = document.getElementsByClassName("email-invalid")[0];
        errorDiv.style.visibility = "visible";
        errorDiv.innerHTML = "Email doesn't exist!";
        return;
      } else if (response.status === 400) {
        const inpDiv = document.getElementsByClassName("pwd-input")[0];
        inpDiv.classList.add("input-error");
        const errorDiv = document.getElementsByClassName("pass-invalid")[0];
        errorDiv.style.visibility = "visible";
        errorDiv.innerHTML = "Incorrect password!";
        return;
      }

      const json = await response.json();

      setAuthUser(json);

      localStorage.setItem("token", json.token);
      localStorage.setItem("userId", json.userId);

      toggleLoginModal();
    } catch (error) {
      alert("Failed to login!");
    }
  } else {
    console.log("Invalid");
  }
};
