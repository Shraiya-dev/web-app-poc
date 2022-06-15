import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { capitalize, useSnackbar } from '../../../sdk'
import { HorizontalTabClicked } from '../../../sdk/analytics/analyticsWrapper'
import { getProjectDetails } from '../../createBooking/apis'

export const useProjectDetails = () => {
	const router = useRouter()

	const [selectedTab, setSelectedTab] = useState('bookings')
	const [projectDetails, setProjectDetails] = useState<any>()
	const { showSnackbar } = useSnackbar()

	const projectId = router.query.projectId
	const handleTabSelection = (e: any, value: any) => {
		HorizontalTabClicked({
			name: capitalize(value),
			page: 'Project',
			projectId: projectId,
			url: router.asPath,
		})
		router.query.tab = value
		router.replace(router)
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
