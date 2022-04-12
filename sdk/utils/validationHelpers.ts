export const isANumber = (value:any) => {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      return true;
    }
    return false;
  };
  
  export const checkError = (name:any, form:any) => {
	const touched = form.touched
	const errors = form.errors
	return touched[name] && errors[name] ? errors[name] : null
}


export const validatePhoneNumber = (phoneNumber:any) => {
  if (phoneNumber.length === 0) {
    return "Phone number is required.";
  }

  if (phoneNumber.length < 10) {
    return "Phone number must be 10 digit long.";
  }

  if(isANumber(phoneNumber) && phoneNumber.length === 10)
    return "valid";

  return "Invalid Phone Number"
};