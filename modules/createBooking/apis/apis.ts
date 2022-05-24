import axios from 'axios'

export const createBooking = async (payload: any, projectTd: any) => {
	return axios.post(`/gateway/customer-api/projects/${projectTd}/bookings/`, payload)
}

export const getProjectDetails = async (projectId: any) => {
	return axios.get(`/gateway/customer-api/projects/${projectId}`)
}
