import { useFormik } from 'formik'
import { useState } from 'react'

export const useWorkerBookingInfo = () => {
	//todo define interface for proper usage
	const [workersData, setWorkersData] = useState<Array<any>>(Array(5).fill(null))
	const from = useFormik({
		initialValues: {},
		validate: () => {},
		onSubmit: () => {},
	})

	return {
		workersData: workersData,
		from: from,
	}
}
