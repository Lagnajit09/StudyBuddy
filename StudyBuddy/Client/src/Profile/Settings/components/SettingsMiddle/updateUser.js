import { BASE_URL } from "../../../../config";

export const updateUser = async (
  setAuthUser,
  updatedInfo,
  setUpdatePop,
  setEnteredCurrentPassword,
  setEnteredNewPassword,
  setEnteredConfirmPassword
) => {
  const token = localStorage.getItem("token");

  console.log(updatedInfo);

  try {
    const response = await fetch(`${BASE_URL}/user/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include JWT token in the Authorization header
      },
      body: JSON.stringify(updatedInfo), // Convert the updated details object to JSON
    });

    if (!response.ok) {
      // If server returns an error status, throw an error
      console.log("Error");
    }

    if (response.status === 410) {
      document.getElementsByClassName("c-pass-invalid")[0].style.visibility =
        "visible";
      document
        .getElementsByClassName("cpass-input")[0]
        .classList.add("input-error");
      return;
    } else if (response.status === 408) {
      const element = document.getElementsByClassName("settings-email-invalid");
      element[0].style.visibility = "visible";
      element[0].innerHTML = "Email already exists!";
      const pass_ele = document.getElementsByClassName("email-input");
      pass_ele[0].classList.add("input-error");
      return;
    }

    // If request is successful, parse the response JSON
    const data = await response.json();
    console.log(data); // Return the updated user details and token

    setAuthUser(data);
    localStorage.setItem("token", data.token);
    setUpdatePop(true);
    setTimeout(() => {
      setUpdatePop(false);
    }, 5000);
    setEnteredCurrentPassword("");
    setEnteredNewPassword("");
    setEnteredConfirmPassword("");
  } catch (error) {
    console.error("Error updating user details:", error.message);
    // You can handle the error here (e.g., show a notification to the user)
    return null; // Return null or some indication of failure
  }
};
