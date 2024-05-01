export const defDateHandler = (event) => {
  setSelectedDate(!selectedDate);
  if (selectedDate) {
    document.getElementById("def-date").style.display = "none";
  } else {
    document.getElementById("def-date").style.display = "flex";
  }
  document.getElementById("eventdate").value = event.target.value;
};

export function getCurrentDate() {
  const now = new Date(); // Get the current date and time
  // Extract day, month, and year from the current date
  const day = now.getDate();
  const month = now.getMonth() + 1; // Months are zero-based, so add 1
  const year = now.getFullYear();
  // Format the day and month as 2-digit strings (e.g., '02' instead of '2')
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  // Combine the formatted day, month, and year into a date string
  const currentDate = `${formattedDay}-${formattedMonth}-${year}`;
  // Return the current date
  return currentDate;
}

export const emailHandler = (
  enteredEmail,
  inputDivName,
  errorDivName,
  errorDesignClass
) => {
  if (enteredEmail.includes("@") && enteredEmail.includes(".")) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const pass_ele = document.getElementsByClassName(inputDivName);
    pass_ele[0].classList.add(errorDesignClass);
  }
};

export const passwordHandler = (
  enteredPassword,
  inputDivName,
  errorDivName,
  errorDesignClass
) => {
  if (enteredPassword.length > 6) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const pass_ele = document.getElementsByClassName(inputDivName);
    pass_ele[0].classList.add(errorDesignClass);
  }
};

export const newPasswordHandler = (
  enteredNPassword,
  enteredCPassword,
  inputDivName,
  errorDivName,
  errorDesignClass
) => {
  if (enteredNPassword != enteredCPassword) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  } else if (enteredNPassword.length !== 0) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const cpass_ele = document.getElementsByClassName(inputDivName);
    cpass_ele[0].classList.add(errorDesignClass);
  }
};

export const confirmPasswordHandler = (
  enteredNPassword,
  enteredConfirmPassword,
  inputDivName,
  errorDivName,
  errorDesignClass
) => {
  if (enteredNPassword === enteredConfirmPassword) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const cpass_ele = document.getElementsByClassName(inputDivName);
    cpass_ele[0].classList.add(errorDesignClass);
  }
};

export const nameHandler = (
  enteredName,
  inputDivName,
  errorDivName,
  errorDesignClass
) => {
  if (enteredName.length == 0) {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const name_ele = document.getElementsByClassName(inputDivName);
    name_ele[0].classList.add(errorDesignClass);
  } else if (enteredName.length < 3 || enteredName.length > 20) {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    element[0].innerHTML = "Username must be 3-20 characters.";
    const name_ele = document.getElementsByClassName(inputDivName);
    name_ele[0].classList.add(errorDesignClass);
  } else {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  }
};

export const phNoHandler = (
  enteredPhoneN,
  inputDivName,
  errorDivName,
  errorDesignClass
) => {
  console.log(typeof enteredPhoneN);
  enteredPhoneN = Number(enteredPhoneN);
  console.log(typeof enteredPhoneN);
  let len = enteredPhoneN.toString().length;
  console.log(len);

  if (isNaN(enteredPhoneN) || enteredPhoneN == 0 || len < 10) {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const name_ele = document.getElementsByClassName(inputDivName);
    name_ele[0].classList.add(errorDesignClass);
  } else {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  }
};

export const bioHandler = (
  enteredBio,
  inputDivName,
  errorDivName,
  errorDesignClass
) => {
  if (enteredBio.length == 0) {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const name_ele = document.getElementsByClassName(inputDivName);
    name_ele[0].classList.add(errorDesignClass);
  } else {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  }
};
