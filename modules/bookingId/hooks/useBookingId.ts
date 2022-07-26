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

	const [pageNumber, SetPageNumber] = useState('')
	const [hasMore, setHasMore] = useState(false)

	const handleTabSelection = (e: any, value: any) => {
		router.query.tab = value
		router.replace(router)
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

	const getJobCards = useCallback(
		async (pageNumber) => {
			const { bookingId, projectId, ...rest } = router.query

			if (!bookingId || !projectId) return
			try {
				setIsLoading(true)

				const queryParams = new URLSearchParams(rest as any)
				queryParams.set('pageNumber', `${pageNumber ? pageNumber : '0'}`)

				const { data } = await getWorkerDetails(bookingId, projectId, queryParams.toString())
				setHasMore(data?.payload?.hasMore)

				let jobCardData = data.payload.workers ?? []

				setJobCards(
					jobCardData.map((item: any, index: any) => {
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
							workerImage: item?.worker?.profilePicture,
						}
						return jobCard
					})
				)
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setIsLoading(false)
			// eslint-disable-next-line react-hooks/exhaustive-deps
		},
		[router.query.skillType, router.query.jobCardState, router.query.projectId]
	)

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
		getBookingInfo()
	}, [getBookingInfo])

	return {
		jobCards: jobCards,
		bookingSummary: bookingSummary,
		getJobCards: getJobCards,
		isLoading: isLoading,
		handleTabSelection: handleTabSelection,
		form: form,
		pageNumber: pageNumber,
		SetPageNumber: SetPageNumber,
		hasMore: hasMore,
		setJobCards: setJobCards,
	}
}
