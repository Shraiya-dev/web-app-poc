import axios from 'axios'
import { URLSearchParams } from 'url'

export const getBookingsSummaryService = () => {
	return axios.get('/gateway/customer-api/bookings/summary')
}

export const getBookingsService = async (queryParams: URLSearchParams, projectId: any) => {
	return axios.get(`/gateway/customer-api/projects/${projectId}/bookings/?` + queryParams.toString())
}
