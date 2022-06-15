import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useSnackbar } from '../../../sdk'
import { ButtonClicked } from '../../../sdk/analytics/analyticsWrapper'
import {
	postApproveWorkReport,
	postDisputeWorkReport,
	getDownloadWorkReport,
	getWorkReport,
	getWorkReportDetails,
} from '../apis'
import { WorkReportDetailsResponse, WorkReportResponse, WorkReportStatus } from '../types'

export const useWorkReport = () => {
	const [workReportResponse, setWorkReportResponse] = useState<WorkReportResponse>()
	const [workReportByIDResponse, setWorkReportByIDResponse] = useState<WorkReportDetailsResponse>()
	const [refresh, setRefresh] = useState(false)
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const [isLoading, setIsLoading] = useReducer((p: any, n: any) => ({ ...p, ...n }), {
		fetching: false,
		approving: false,
		disputing: false,
		downloading: {},
	})
	const fetchWorkReport = useCallback(
		async (queryParameters) => {
			setRefresh(false)
			setIsLoading({ fetching: true })
			try {
				const { data } = await getWorkReport(router.query.projectId as string, queryParameters)
				setWorkReportResponse(data.payload)
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setIsLoading({ fetching: false })
		},
		[router.query.projectId, showSnackbar]
	)
	const fetchWorkReportById = useCallback(
		async (queryParameters) => {
			setRefresh(false)

			setIsLoading({ fetching: true })
			try {
				const { data } = await getWorkReportDetails(
					router.query.projectId as string,
					router.query.workReportId as string,
					queryParameters
				)
				setWorkReportByIDResponse(data.payload)
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setIsLoading({ fetching: false })
		},
		[router.query.projectId, router.query.workReportId, showSnackbar]
	)
	const approveWorkReport = useCallback(
		async (dwrId: string) => {
			setIsLoading({ approving: true })
			try {
				await postApproveWorkReport(router.query.projectId as any, dwrId)
				showSnackbar('Work Report Approved.', 'success')
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setRefresh(true)
			setIsLoading({ approving: false })
		},
		[router.query.projectId, showSnackbar]
	)

	const disputeWorkReport = useCallback(
		async (dwrId: string, payload: any) => {
			setIsLoading({ disputing: true })
			try {
				await postDisputeWorkReport(router.query.projectId as any, dwrId, payload)
				showSnackbar('Work Report dispute raised.', 'info')
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setRefresh(true)
			setIsLoading({ disputing: false })
		},
		[router.query.projectId, showSnackbar]
	)

	const downloadWorkReport = useCallback(
		async (dwrId: string, date: string) => {
			setIsLoading({ downloading: { [dwrId]: true } })
			try {
				const res = await getDownloadWorkReport(router.query.projectId as any, dwrId)
				const url = URL.createObjectURL(res.data)
				var downloadHyperlink = document.createElement('a')
				downloadHyperlink.href = url
				downloadHyperlink.download = date + '.xlsx'
				document.body.appendChild(downloadHyperlink)
				downloadHyperlink.click()
				downloadHyperlink.remove()

				showSnackbar('Work report Downloaded Successfully.', 'success')
			} catch (error: any) {
				console.log(error)

				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setRefresh(true)
			setIsLoading({ downloading: { ...isLoading.downloading, [dwrId]: undefined } })
		},
		[router.query.projectId, showSnackbar, isLoading]
	)

	useEffect(() => {
		if (!refresh) return
		const { projectId, tab, workReportId, pageNumber, ...rest } = router.query
		const searchParams = new URLSearchParams(rest as any)

		if (workReportId) {
			fetchWorkReportById(searchParams)
		} else {
			fetchWorkReport(searchParams)
		}
	}, [refresh])

	useEffect(() => {
		if (!router.isReady) return
		const { projectId, tab, workReportId, ...rest } = router.query
		const searchParams = new URLSearchParams(rest as any)
		if (workReportId) {
			fetchWorkReportById(searchParams)
		} else {
			if (searchParams.toString().length === 0) return
			fetchWorkReport(searchParams)
		}
	}, [router])

	return {
		workReportResponse,
		workReportByIDResponse,
		isLoading,
		approveWorkReport,
		disputeWorkReport,
		downloadWorkReport,
	}
}
