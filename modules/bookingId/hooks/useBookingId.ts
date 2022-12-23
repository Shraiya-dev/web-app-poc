import axios from 'axios'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { BookingPreview, JobCard, sendAnalytics, useSnackbar, WORKER_APPLICATION_STATUS } from '../../../sdk'
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

	const [jobCardsLength, setJobCardsLength] = useState(jobCards.length)

	const [pageNumber, SetPageNumber] = useState('')
	const [hasMore, setHasMore] = useState(false)

	const handleTabSelection = (e: any, value: any) => {
		router.query.tab = value
		router.replace(router)
	}

	useEffect(() => {
		setJobCardsLength(jobCards?.length)
	}, [jobCards, jobCardsLength])

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
	useEffect(() => {
		if (!router.isReady) return
		if (router.query.source === 'whatsapp') {
			sendAnalytics({
				name: 'viewJobDashboardClicked',
				action: 'ButtonClick',
				metaData: { ...router.query },
			})
			delete router.query.source
			delete router.query.customerId
		}
	}, [router])
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
							jobCardId: item?.jobCard?.jobCardId,
							contractorFeedbackCode: item?.jobCard?.contractorFeedback?.code,
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
							phoneNumber: item?.worker?.phoneNumber.toString().slice(3),
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
		[router.query, showSnackbar]
	)
	const updateContractorFeedback = useCallback(
		async (value: WORKER_APPLICATION_STATUS, jobCard: JobCard) => {
			const { bookingId, projectId, ...rest } = router.query

			try {
				const res = await axios.post(
					`/gateway/customer-api/projects/${projectId}/bookings/${bookingId}/job-cards/${jobCard?.jobCardId}/job-card-status`,
					{ code: value }
				)
				let pageNumber = `${Number(router.query.pageNumber) > 0 ? Number(router.query.pageNumber) - 1 : '0'}`
				await getJobCards(pageNumber)
			} catch (error: any) {
				showSnackbar(error?.response?.data?.messageToUser || 'Failed to Update Application', 'error')
			}
		},
		[getJobCards, router.query, showSnackbar]
	)
	useEffect(() => {
		getBookingInfo()
	}, [getBookingInfo])

	return {
		jobCards: jobCards,
		bookingSummary: bookingSummary,
		getJobCards: getJobCards,
		isLoading: isLoading,
		handleTabSelection: handleTabSelection,
		pageNumber: pageNumber,
		SetPageNumber: SetPageNumber,
		hasMore: hasMore,
		setJobCards: setJobCards,
		jobCardsLength: jobCardsLength,
		updateContractorFeedback: updateContractorFeedback,
	}
}
