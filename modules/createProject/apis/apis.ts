import axios from 'axios'

export const uploadImage = async (payload: any) => {
	return axios.post('/gateway/customer-api/images', payload)
}

export const createProject = async (payload: any) => {
	return axios.post('/gateway/customer-api/projects/', payload)
}

export const updateProject = async (payload: any, projectId: any) => {
	return axios.put(`gateway/customer-api/projects/${projectId}`, payload)
}
