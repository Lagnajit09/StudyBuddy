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
  ////////////////////
  if (enteredPassword.length > 6) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "hidden";
    const pass_ele = document.getElementsByClassName(inputDivName);
    pass_ele[0].classList.remove(errorDesignClass);
  }
};

export const newPasswordHandler = (
  enteredNPassword,
  enteredCPassword,
  inputDivName,
  errorDivName,
  errorDesignClass,
  setReadyToUpdate
) => {
  if (enteredCPassword.length !== 0 && enteredNPassword === enteredCPassword) {
    const element = document.getElementsByClassName(errorDivName)[0];
    element.innerHTML = "Please use a different password!";
    element.style.visibility = "visible";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.add(errorDesignClass);
    setReadyToUpdate(false);
  } else if (enteredCPassword.length !== 0 && enteredNPassword.length === 0) {
    const element = document.getElementsByClassName(errorDivName)[0];
    element.innerHTML = "New password is required!";
    element.style.visibility = "visible";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.add(errorDesignClass);
    setReadyToUpdate(false);
  } else if (enteredCPassword.length !== 0 && enteredNPassword.length < 6) {
    const element = document.getElementsByClassName(errorDivName)[0];
    element.innerHTML = "Password must be at least 6 characters long!";
    element.style.visibility = "visible";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.add(errorDesignClass);
    setReadyToUpdate(false);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "hidden";
    const cpass_ele = document.getElementsByClassName(inputDivName);
    cpass_ele[0].classList.remove(errorDesignClass);
    setReadyToUpdate(true);
  }
};

export const confirmPasswordHandler = (
  enteredNPassword,
  enteredConfirmPassword,
  inputDivName,
  errorDivName,
  errorDesignClass,
  setReadyToUpdate
) => {
  if (enteredConfirmPassword.length === 0) {
    setReadyToUpdate(false);
    return;
  }
  if (enteredNPassword === enteredConfirmPassword) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
    setReadyToUpdate(true);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const cpass_ele = document.getElementsByClassName(inputDivName);
    cpass_ele[0].classList.add(errorDesignClass);
    setReadyToUpdate(false);
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
  errorDesignClass,
  setReadyToUpdate
) => {
  if (enteredPhoneN.length === 0) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
    return;
  }

  enteredPhoneN = Number(enteredPhoneN);
  let len = enteredPhoneN.toString().length;

  if (isNaN(enteredPhoneN) || len !== 10) {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const name_ele = document.getElementsByClassName(inputDivName);
    name_ele[0].classList.add(errorDesignClass);
    setReadyToUpdate(false);
  } else {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
  }
};
