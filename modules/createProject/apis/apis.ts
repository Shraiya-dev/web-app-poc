import axios from 'axios'

export const uploadImage = async (payload: any) => {
	return axios.post('/gateway/customer-api/images', payload)
}

export const createProject = async (payload: any) => {
	return axios.post('/gateway/customer-api/projects/', payload)
}
