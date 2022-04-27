import axios from 'axios'
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

export const logoutService = async (ut: USER_TYPE) => {}

export const refreshTokenService = async (refreshToken: string, accessToken: StringConstructor, ut: USER_TYPE) => {
	const payload = {
		ult: 'otp',
		ut: ut,
		refreshToken: refreshToken,
		accessToken: accessToken,
	}
	return axios.post('/refresh-token', payload)
}

export const getCustomerDetails = async()=>{

	return axios.get(`/gateway/customer-api/`);
}

export const updateProfile = async(payload:any)=>{
	return axios.post('/gateway/customer-api/profile', payload)
}
