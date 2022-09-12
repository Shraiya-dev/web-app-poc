import axios from 'axios'

export const getBillForProject = (projectId: string, queryParameters: URLSearchParams) => {
	return axios.get(`/gateway/customer-api/projects/${projectId}/bills/aggregated?${queryParameters.toString()}`)
}
export const getAggregatedBillForProject = (projectId: string, billId: string, queryParameters: URLSearchParams) => {
	queryParameters.set('aggregationDate', billId)
	queryParameters.set('pageSize', String(10))

	return axios.get(`/gateway/customer-api/projects/${projectId}/bills?${queryParameters.toString()}`)
}
export const getSummaryForBill = (projectId: string, billId: string, queryParameters: URLSearchParams) => {
	queryParameters.set('aggregationDate', billId)
	return axios.get(`/gateway/customer-api/projects/${projectId}/bills/summary?${queryParameters.toString()}`)
}
export const postApproveWorkReport = (projectId: string, dwrId: string) => {
	return axios.post(`/gateway/customer-api/projects/${projectId}/daily-work-report/${dwrId}/approve`)
}

export const postDisputeWorkReport = (projectId: string, dwrId: string, payload: any) => {
	return axios.post(`/gateway/customer-api/projects/${projectId}/daily-work-report/${dwrId}/dispute`, payload)
}

export const getDownloadWorkReport = (projectId: string, dwrId: string) => {
	return axios.get(`/gateway/customer-api/projects/${projectId}/daily-work-report/${dwrId}/download`, {
		responseType: 'blob',
	})
}
