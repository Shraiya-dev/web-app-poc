import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useSnackbar } from '../../../sdk'
import { getProjectDetails } from '../../createBooking/apis'

export const useProjectDetails = () => {
	const router = useRouter()

	const [selectedTab, setSelectedTab] = useState('bookings')
	const [projectDetails, setProjectDetails] = useState<any>()
	const { showSnackbar } = useSnackbar()

	const projectId = router.query.projectId
	const handleTabSelection = (e: any, value: any) => {
		setSelectedTab(value)
	}

	const getProjectInfo = useCallback(async () => {
		if (!projectId) return
		try {
			const { data } = await getProjectDetails(projectId)
			setProjectDetails(data?.payload?.project)
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [router.query])

	useEffect(() => {
		getProjectInfo()
	}, [getProjectInfo])

	return {
		selectedTab: selectedTab,
		setSelectedTab: setSelectedTab,
		handleTabSelection: handleTabSelection,
		projectDetails: projectDetails,
		setProjectDetails: setProjectDetails,
	}
}
