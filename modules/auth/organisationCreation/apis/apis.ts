import axios from 'axios'

export const createOrganisation = (payload: any) => {
	return axios.post('/gateway/customer-api/organisations/', payload)
}
