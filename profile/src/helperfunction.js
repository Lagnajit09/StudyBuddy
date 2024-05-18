
export const defDateHandler = (event,labelC,targetIn,selectedDate) => {
    
    if (selectedDate) {
      document.getElementById(labelC).style.display = "none !importent";
      document.getElementById(targetIn).value = event.target.value;
    } else {
      document.getElementById(labelC).style.display = "flex";
    }
    
  };
  
export const emailHandler=(enteredEmail,inputDivName,errorDivName,errorDesignClass)=>{     

  if(enteredEmail.includes('@') && enteredEmail.includes('.')){
      document.getElementsByClassName(errorDivName)[0].style.visibility="hidden";
      document.getElementsByClassName(inputDivName)[0].classList.remove(errorDesignClass);
  }
  else{
      const element=document.getElementsByClassName(errorDivName);
      element[0].style.visibility="visible";
      const pass_ele =document.getElementsByClassName(inputDivName);
      pass_ele[0].classList.add(errorDesignClass);
  }
}

export const passwordHandler=(enteredPassword,inputDivName,errorDivName,errorDesignClass)=>{
  
  if(enteredPassword.length>6){
      document.getElementsByClassName(errorDivName)[0].style.visibility="hidden";
      document.getElementsByClassName(inputDivName)[0].classList.remove(errorDesignClass);
  }
  else{
      const element=document.getElementsByClassName(errorDivName);
      element[0].style.visibility="visible";
      const pass_ele =document.getElementsByClassName(inputDivName);
      pass_ele[0].classList.add(errorDesignClass);
  }
}

export const newPasswordHandler=(enteredNPassword,enteredCPassword,inputDivName,errorDivName,errorDesignClass)=>{
  
  if(enteredNPassword!=enteredCPassword){
      document.getElementsByClassName(errorDivName)[0].style.visibility="hidden";
      document.getElementsByClassName(inputDivName)[0].classList.remove(errorDesignClass);
  }

  else if(enteredNPassword.length==0){
    document.getElementsByClassName(errorDivName)[0].style.visibility="hidden";
      document.getElementsByClassName(inputDivName)[0].classList.remove(errorDesignClass);
  }

  else{
      const element=document.getElementsByClassName(errorDivName);
      element[0].style.visibility="visible";
      const cpass_ele =document.getElementsByClassName(inputDivName);
      cpass_ele[0].classList.add(errorDesignClass);
  }
}

export const confirmPasswordHandler=(enteredNPassword,enteredConfirmPassword,inputDivName,errorDivName,errorDesignClass)=>{
  
  if(enteredNPassword===enteredConfirmPassword){
      document.getElementsByClassName(errorDivName)[0].style.visibility="hidden";
      document.getElementsByClassName(inputDivName)[0].classList.remove(errorDesignClass);
  }
  else{
      const element=document.getElementsByClassName(errorDivName);
      element[0].style.visibility="visible";
      const cpass_ele =document.getElementsByClassName(inputDivName);
      cpass_ele[0].classList.add(errorDesignClass);
  }
}

export const nameHandler=(enteredName,inputDivName,errorDivName,errorDesignClass)=>{

  if(enteredName.length==0){
      const element=document.getElementsByClassName(errorDivName);
      element[0].style.visibility="visible";
      const name_ele =document.getElementsByClassName(inputDivName);
      name_ele[0].classList.add(errorDesignClass);
  }
  else{
      document.getElementsByClassName(errorDivName)[0].style.visibility="hidden";
      document.getElementsByClassName(inputDivName)[0].classList.remove(errorDesignClass);
  }
}

export const phNoHandler=(enteredPhoneN,inputDivName,errorDivName,errorDesignClass)=>{
  console.log(typeof(enteredPhoneN));
  enteredPhoneN=Number(enteredPhoneN);
  console.log(typeof(enteredPhoneN));
  let len=enteredPhoneN.toString().length;
  console.log(len);
  
  if(isNaN(enteredPhoneN)||enteredPhoneN==0 || len<10 ){
      const element=document.getElementsByClassName(errorDivName);
      element[0].style.visibility="visible";
      const name_ele =document.getElementsByClassName(inputDivName);
      name_ele[0].classList.add(errorDesignClass);
  }
  else{
      document.getElementsByClassName(errorDivName)[0].style.visibility="hidden";
      document.getElementsByClassName(inputDivName)[0].classList.remove(errorDesignClass);
  }
}

export const bioHandler=(enteredBio,inputDivName,errorDivName,errorDesignClass)=>{

  if(enteredBio.length==0){
      const element=document.getElementsByClassName(errorDivName);
      element[0].style.visibility="visible";
      const name_ele =document.getElementsByClassName(inputDivName);
      name_ele[0].classList.add(errorDesignClass);
  }
  else{
      document.getElementsByClassName(errorDivName)[0].style.visibility="hidden";
      document.getElementsByClassName(inputDivName)[0].classList.remove(errorDesignClass);
  }
}
  