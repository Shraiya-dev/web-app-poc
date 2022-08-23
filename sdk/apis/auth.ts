import axios from 'axios'
import { clearCookie, createCookieInHour, getCookie } from '../analytics/helper'
import { USER_LOGIN_TYPE, USER_TYPE } from '../types/auth'

export const sendOtpService = async (phoneNumber: string, ut: USER_TYPE) => {
	const payload = { phoneNumber: phoneNumber, ut: ut }
	return axios.post('/send-otp', payload)
}
export const loginService = async (
	phoneNumber: string,
	ut: USER_TYPE,
	ult: USER_LOGIN_TYPE,
	otp?: string,
	accessToken?: string
) => {
	const payload = {
		userData: {
			ult: ult,
			ut: ut,
			phoneNumberRaw: phoneNumber,
			otp: otp,
			accessToken: accessToken,
		},
	}
	return axios.post('/login', payload)
}

export const refreshTokenService = async (refreshToken: string, accessToken: string, ut: USER_TYPE) => {
	const payload = {
		ult: USER_LOGIN_TYPE.OTP,
		dt: 'web',
		ut: ut,
		refreshToken: refreshToken,
		accessToken: accessToken,
	}
	return axios.post('/refresh-token', payload)
}

export const getCustomerDetails = async () => {
	return axios.get(`/gateway/customer-api/customers/profile`)
}

export const updateProfile = async (payload: any) => {
	return axios.put('/gateway/customer-api/customers/profile', payload)
}

export const logOutService = () => {
	localStorage.clear()

	if (window.location.pathname !== `/`) {
		window.location.href = `/`
	}
}

export const sendEmailOtpService = async () => {
	return axios.post('/gateway/customer-api/email-otp/initiate')
}

export const emailVerification = async (payload: any) => {
	return axios.post('/gateway/customer-api/email-otp/verify', payload)
}
export const reSendEmailOtpService = async (payload: any) => {
	return axios.post('/gateway/customer-api/email-otp/resend', payload)
}
