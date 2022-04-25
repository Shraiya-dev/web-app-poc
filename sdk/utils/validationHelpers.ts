import { MenuItem } from '@mui/material'

export const isANumber = (value:any) => {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      return true;
    }
    return false;
  };
  
  export const checkError = (name:any, form:any) => {

    console.log(name,form)
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

export const validateEmail = (email:any) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


// export const getSelectOptions = (opt:any, index:any) => {
//   return opt.map((item:any) => (
//       <MenuItem key={item.label + '-' + index} value={item.value}>
//           {item.label}
//       </MenuItem>
//   ))
// }