import axios from 'axios'

export const getProjectList = async () => {
	return axios.get('/gateway/customer-api/projects/?pageNumber=0&pageSize=500')
}
