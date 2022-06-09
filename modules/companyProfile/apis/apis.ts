import axios from 'axios'

export const updateOrganisation = (payload: any, orgId: any) => {
	return axios.put(`/gateway/customer-api/organisations/${orgId}`, payload)
}

export const getOrganisationDetails = (orgId: any) => {
	return axios.get(`/gateway/customer-api/organisations/${orgId}`)
}

export const getOrganisationMembers = (orgId: any) => {
	return axios.get(`/gateway/customer-api/organisations/${orgId}/members`)
}
