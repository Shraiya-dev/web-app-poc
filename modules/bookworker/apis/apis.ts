import axios from 'axios'

export const createBooking = async(payload:any)=>{
	return axios.post('/gateway/bookings-api/createBooking', payload)
}