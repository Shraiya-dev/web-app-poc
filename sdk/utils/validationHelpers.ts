import { MenuItem } from '@mui/material'

export const isANumber = (value: any) => {
	const re = /^[0-9\b]+$/
	if (value === '' || re.test(value)) {
		return true
	}
	return false
}

export const checkError = (name: any, form: any) => {
	const touched = form.touched
	const errors = form.errors
	return touched[name] && errors[name] ? errors[name] : null
}

export const validatePhoneNumber = (phoneNumber: any) => {
	if (phoneNumber.length === 0) {
		return 'Phone number is required.'
	}

	if (phoneNumber.length < 10) {
		return 'Phone number must be 10 digit long.'
	}

	if (isANumber(phoneNumber) && phoneNumber.length === 10) return 'valid'

	return 'Invalid Phone Number'
}

export const validateEmail = (email: any) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		)
}

// export const freeEmailChecker = (email: any) => {
// 	var freeRegex = /^[\w-\.]+@([hotmail+\.]|[yahoo+\.]|[gmail+\.])+[\w-]{2,4}$/

// 	return validateEmail(email) && !email.match(freeRegex)
// }

export function isPincodeValid(pincode: string): boolean {
	return /^[1-9][0-9]{5}$/.test(pincode)
}

export function isValidGSTIN(GSTIN: string): boolean {
	const checkGSTIN = GSTIN.match(/^([A-Z0-9]+)$/g)

	if (checkGSTIN === null || GSTIN.length !== 15) {
		return false
	} else {
		return true
	}
}
