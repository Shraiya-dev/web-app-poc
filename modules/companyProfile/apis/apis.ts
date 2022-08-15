import axios from 'axios'

export const updateOrganisation = (payload: any) => {
	return axios.put(`/gateway/customer-api/customers/profile`, payload)
}

export const getOrganisationDetails = () => {
	return axios.get(`/gateway/customer-api/customers/profile`)
}

export const getOrganisationMembers = (orgId: any) => {
	return axios.get(`/gateway/customer-api/organisations/${orgId}/members`)
}

export const checkValidGSTIN = (payload: any) => {
	return axios.post(`/gateway/customer-api/customers/profile/validate-gstin`, payload)
}
