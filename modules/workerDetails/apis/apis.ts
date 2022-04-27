import axios from 'axios'

export const getWorkerInfo = async (workerId: any) => {
	return axios.get(`/gateway/customer-api/worker/${workerId}`)
}
