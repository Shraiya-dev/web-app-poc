import axios from 'axios'

export const getBookingDetails = async (bookingId: any, projectId: any) => {
	return await axios.get(`/gateway/customer-api/projects/${projectId}/bookings/${bookingId}`)
}

export const getWorkerDetails = async (bookingId: any, projectId: any, query: any) => {
	return await axios.get(`/gateway/customer-api/projects/${projectId}/bookings/${bookingId}/workers?` + query)
}

export const updateWages = async (bookingId: any, projectId: any, payload: any) => {
	return await axios.post(`/gateway/customer-api/projects/${projectId}/bookings/${bookingId}`, payload)
}
export const getDiscountEligibilityService = async () => {
	return await axios.get(`/gateway/customer-api/orders/eligibility?discountCode=NEWUSER15'`)
}

export const postEasyBookingOrder = async (payload: any) => {
	return await axios.post(`gateway/customer-api/orders`, payload)
}
