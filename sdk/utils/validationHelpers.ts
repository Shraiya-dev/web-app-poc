export const isANumber = (value:any) => {
    const re = /^[0-9\b]+$/;
    if (value === "" || re.test(value)) {
      return true;
    }
    return false;
  };
  
  export const checkError = (name, form) => {
	const touched = form.touched
	const errors = form.errors
	return touched[name] && errors[name] ? errors[name] : null
}