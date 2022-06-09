import axios from 'axios'

export const getCustomerRoles = async () => {
	return axios.get(`/gateway/metadata/customers/designations`)
}
