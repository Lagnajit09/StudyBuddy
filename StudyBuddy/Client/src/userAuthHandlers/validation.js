export const emailHandler = (
  enteredEmail,
  inputDivName,
  errorDivName,
  errorDesignClass,
  setEmailValid
) => {
  if (enteredEmail.includes("@") && enteredEmail.includes(".")) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);
    setEmailValid(true);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const pass_ele = document.getElementsByClassName(inputDivName);
    pass_ele[0].classList.add(errorDesignClass);
    setEmailValid(false);
  }
};

export const passwordHandler = (
  enteredPassword,
  inputDivName,
  errorDivName,
  errorDesignClass,
  setPasswordValid
) => {
  if (enteredPassword.length >= 6) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);

    setPasswordValid(true);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const pass_ele = document.getElementsByClassName(inputDivName);
    pass_ele[0].classList.add(errorDesignClass);
    setPasswordValid(false);
  }
};

export const confirmPasswordHandler = (
  enteredPassword,
  enteredConfirmPassword,
  inputDivName,
  errorDivName,
  errorDesignClass,
  setCpasswordValid
) => {
  if (enteredPassword === enteredConfirmPassword) {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[1]
      .classList.remove(errorDesignClass);
    setCpasswordValid(true);
  } else {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const cpass_ele = document.getElementsByClassName(inputDivName);
    cpass_ele[1].classList.add(errorDesignClass);
    setCpasswordValid(false);
  }
};

export const nameHandler = (
  enteredName,
  inputDivName,
  errorDivName,
  errorDesignClass,
  setNameValid
) => {
  if (enteredName.length == 0) {
    const element = document.getElementsByClassName(errorDivName);
    element[0].style.visibility = "visible";
    const name_ele = document.getElementsByClassName(inputDivName);
    name_ele[0].classList.add(errorDesignClass);
    setNameValid(false);
  } else {
    document.getElementsByClassName(errorDivName)[0].style.visibility =
      "hidden";
    document
      .getElementsByClassName(inputDivName)[0]
      .classList.remove(errorDesignClass);

    setNameValid(true);
  }
};
