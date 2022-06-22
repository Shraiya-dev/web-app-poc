import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer, useState } from 'react'
import { useSnackbar } from '../../../sdk'
import {
	getAggregatedBillForProject,
	getBillForProject,
	getDownloadWorkReport,
	getSummaryForBill,
	postApproveWorkReport,
	postDisputeWorkReport,
} from '../apis'
import { BillDetailResponse, BillResponse, BillSummaryResponse } from '../types'

export const useBill = () => {
	const [billResponse, setBillResponse] = useState<BillResponse>()
	const [billDetailsResponse, setBillDetailResponse] = useState<BillDetailResponse>()
	const [billSummaryResponse, setBillSummaryResponse] = useState<BillSummaryResponse>()

	const [refresh, setRefresh] = useState(false)
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const [isLoading, setIsLoading] = useReducer((p: any, n: any) => ({ ...p, ...n }), {
		fetching: false,
		approving: false,
		disputing: false,
		downloading: {},
	})
	const fetchBillForProject = useCallback(
		async (queryParameters) => {
			setRefresh(false)
			setIsLoading({ fetching: true })
			try {
				const { data } = await getBillForProject(router.query.projectId as string, queryParameters)
				setBillResponse(data.payload)
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setIsLoading({ fetching: false })
		},
		[router.query.projectId, showSnackbar]
	)
	const fetchBillForDate = useCallback(
		async (queryParameters) => {
			setRefresh(false)

			setIsLoading({ fetching: true })
			try {
				const { data } = await getAggregatedBillForProject(
					router.query.projectId as string,
					router.query.billId as string,
					queryParameters
				)
				setBillDetailResponse(data.payload)
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setIsLoading({ fetching: false })
		},
		[router.query.projectId, router.query.billId, showSnackbar]
	)
	const fetchBillSummaryForDate = useCallback(
		async (queryParameters) => {
			setRefresh(false)

			setIsLoading({ fetching: true })
			try {
				const { data } = await getSummaryForBill(
					router.query.projectId as string,
					router.query.billId as string,
					queryParameters
				)
				setBillSummaryResponse(data.payload)
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
			}
			setIsLoading({ fetching: false })
		},
		[router.query.projectId, router.query.billId, showSnackbar]
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
		const { projectId, tab, billId, pageNumber, ...rest } = router.query
		const searchParams = new URLSearchParams(rest as any)

		if (billId) {
			fetchBillForDate(searchParams)
			fetchBillSummaryForDate(searchParams)
		} else {
			fetchBillForProject(searchParams)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh])

	useEffect(() => {
		if (!router.isReady) return
		const { projectId, tab, billId, ...rest } = router.query
		const searchParams = new URLSearchParams(rest as any)
		if (billId) {
			fetchBillForDate(searchParams)
			fetchBillSummaryForDate(searchParams)
		} else {
			if (searchParams.toString().length === 0) return
			fetchBillForProject(searchParams)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router])

	return {
		billResponse,
		billDetailsResponse,
		billSummaryResponse,
		isLoading,
		approveWorkReport,
		disputeWorkReport,
		downloadWorkReport,
	}
}
