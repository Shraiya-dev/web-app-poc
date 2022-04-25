import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { JobCard, JOB_TYPES } from '../../../sdk'

export const useBookingId = () => {
	const router = useRouter()
	const [jobCards, setJobCards] = useState<Array<JobCard>>(
		Array(10).fill({
			workerName: 'Lalit Tyagi',
			jobType: JOB_TYPES.BAR_BENDER,
			dob: new Date(),
			projectCount: 15,
			city: 'Noida',
			state: 'Uttar Pradesh',
			experience: '2-5',
			workerId: 'lhbnklhgvbnmkgvb',
		})
	)
	useEffect(() => {
		const sp = new URLSearchParams(router.query as any)
		console.log('fetching booking for ?', sp.toString())
	}, [router.query])

	return {
		jobCards: jobCards,
	}
}
