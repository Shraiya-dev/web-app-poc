import axios from 'axios'
import { URLSearchParams } from 'url'

export const getBookingsSummaryService = () => {
	return axios.get('/gateway/customer-api/bookings/summary')
}

export const getBookingsService = (queryParams: URLSearchParams) => {
	return axios.get('/gateway/customer-api/bookings?' + queryParams.toString())
}
