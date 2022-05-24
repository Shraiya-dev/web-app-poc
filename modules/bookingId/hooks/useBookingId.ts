import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { BookingPreview, BookingDetailsPreview, JobCard, useSnackbar } from '../../../sdk'
import { getBookingDetails, getWorkerDetails } from '../apis'

interface FilterForm {
	tags: Array<string>
	skillType: Array<string>
	jobCardState: Array<string>
}

export const useBookingId = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(false)

	const { showSnackbar } = useSnackbar()
	const [bookingSummary, setBookingSummary] = useState<BookingPreview>()
	const [jobCards, setJobCards] = useState<Array<JobCard>>([])

	const [selectedTab, setSelectedTab] = useState('track-workers')

	const handleTabSelection = (e: any, value: any) => {
		setSelectedTab(value)
	}

	const getBookingInfo = useCallback(async () => {
		const { bookingId, projectId, ...rest } = router.query

		if (!bookingId || !projectId) return

		try {
			setIsLoading(true)
			const { data } = await getBookingDetails(bookingId, projectId)

			setBookingSummary(data.payload)
			setIsLoading(false)
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [router.query.bookingId])

	const getJobCards = useCallback(async () => {
		const { bookingId, projectId, ...rest } = router.query

		if (!bookingId || !projectId) return
		try {
			const queryParams = new URLSearchParams(rest as any)

			const { data } = await getWorkerDetails(bookingId, projectId, queryParams.toString())

			const jobCards = data.payload.workers ?? []

			setJobCards(
				jobCards.map((item: any) => {
					const jobCard: JobCard = {
						workerId: item?.jobCard?.workerId,
						WorkerName: item?.worker?.name ?? 'No Name',
						jobType: item?.jobCard?.jobType,
						experience: item?.worker?.workDetails?.experience || 0,
						city: item?.worker?.city,
						state: item?.worker?.state,
						dob: item?.worker?.dob || 'NA',
						skillType: item?.jobCard?.skillType,
						jobCardState: item?.jobCard?.jobCardState,
					}
					return jobCard
				})
			)
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
		//setIsLoading(false)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query])

	const form = useFormik<FilterForm>({
		initialValues: {
			tags: [],
			skillType: [],
			jobCardState: [],
		},
		onSubmit: (values) => {
			router.push(router, undefined, {
				shallow: true,
				scroll: true,
			})
		},
	})

	useEffect(() => {
		getJobCards()
	}, [getJobCards, router.query])

	useEffect(() => {
		getBookingInfo()
	}, [getBookingInfo])

	// useEffect(() => {
	// 	if (form.values.skillType.length > 0) {
	// 		if (form.values.skillType.length === 1) {
	// 			router.query.skillType = form.values.skillType[0]
	// 		} else {
	// 			router.query.skillType = form.values.skillType.join(',')
	// 		}
	// 	} else {
	// 		delete router.query.skillType
	// 	}

	// 	if (form.values.jobCardState.length > 0) {
	// 		if (form.values.jobCardState.length === 1) {
	// 			router.query.jobCardState = form.values.jobCardState[0]
	// 		} else {
	// 			router.query.jobCardState = form.values.jobCardState.join(',')
	// 		}
	// 	} else {
	// 		delete router.query.jobCardState
	// 	}

	// 	router.query = { projectId: router.query.projectId }
	// 	router.push(router, undefined, {
	// 		shallow: true,
	// 		scroll: true,
	// 	})
	// 	getJobCards()
	// 	console.log('hey')
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [router.query])

	return {
		jobCards: jobCards,
		bookingSummary: bookingSummary,
		getJobCards: getJobCards,
		isLoading: isLoading,
		selectedTab: selectedTab,
		handleTabSelection: handleTabSelection,
		form: form,
	}
}
