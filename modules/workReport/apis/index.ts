import axios from 'axios'
export const getWorkReport = (projectId: string, queryParameters: URLSearchParams) => {
	return axios.get(`/gateway/customer-api/projects/${projectId}/daily-work-report?${queryParameters.toString()}`)
}
export const getWorkReportDetails = (projectId: string, dwrId: string, queryParameters: URLSearchParams) => {
	return axios.get(
		`/gateway/customer-api/projects/${projectId}/daily-work-report/${dwrId}?${queryParameters.toString()}`
	)
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
