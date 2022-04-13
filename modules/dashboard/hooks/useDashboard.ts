import { useFormik } from 'formik'
import { useState } from 'react'

export const useDashboard = () => {
	//todo define interface for proper usage
	const [bookings, setBookings] = useState<Array<any>>([])
	const from = useFormik({
		initialValues: {},
		validate: () => {},
		onSubmit: () => {},
	})

	return {
		bookings: bookings,
		from: from,
	}
}
