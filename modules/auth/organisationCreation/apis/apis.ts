import axios from 'axios'

export const createOrganisation = (payload: any) => {
	return axios.post('/gateway/customer-api/organisations/', payload)
}
export const postValidateGSTIN = (payload: { GSTIN: string }) => {
	return axios.post('/gateway/customer-api/customers/onboarding/validate-gstin', payload)
}
