import { MenuItem } from '@mui/material'

import { emailProviders } from '../constants/emailValidationHelper'

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

// export const validateCompanyEmail = (email: any) => {
// 	//var freeRegex = /^[\w-\.]+@([hotmail+\.]|[yahoo+\.]|[gmail+\.])+[\w-]{2,4}$/

// 	var isInvalidEmail = emailProviders.includes(email.split('@')[1])

// 	return validateEmail(email) && !isInvalidEmail //!email.match(freeRegex)
// }

export function isPincodeValid(pincode: string): boolean {
	return /^[1-9][0-9]{5}$/.test(pincode)
}

export function isValidGSTIN(GSTIN: string): boolean {
	const checkGSTIN = GSTIN.match(/\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}/)

	if (checkGSTIN === null || GSTIN.length !== 15) {
		return false
	} else {
		return true
	}
}
export const isEmptyObject = (obj = {}): boolean => Object.keys(obj).length === 0
export const indianCurrencyFormat = (value: string) => {
	let valueStr = value.toString()
	let afterPoint = ''
	if (valueStr.indexOf('.') > 0) afterPoint = valueStr.substring(valueStr.indexOf('.'), valueStr.length)
	valueStr = Math.floor(parseInt(valueStr)).toString()
	let lastThree = valueStr.substring(valueStr.length - 3)
	let otherNumbers = valueStr.substring(0, valueStr.length - 3)
	if (otherNumbers != '') lastThree = ',' + lastThree
	let res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree + afterPoint

	return res
}
