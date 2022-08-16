import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { capitalize, useSnackbar } from '../../../sdk'
import { HorizontalTabClicked } from '../../../sdk/analytics/analyticsWrapper'
import { getProjectDetails } from '../../createBooking/apis'

export const useProjectDetails = () => {
	const router = useRouter()

	const [selectedTab, setSelectedTab] = useState('bookings')
	const [projectDetails, setProjectDetails] = useState<any>()
	const [enterpriseStatus, setEnterpriseStatus] = useState<any>()
	const [isLoading, setIsLoading] = useState(false)
	const { showSnackbar } = useSnackbar()
	const [projectName, setProjectName] = useState({
		name: '',
		state: '',
		city: '',
	})

	const projectId = router.query.projectId
	const handleTabSelection = (e: any, value: any) => {
		HorizontalTabClicked({
			name: capitalize(value),
			page: 'Project',
			projectId: projectId,
			url: router.asPath,
		})
		router.query.tab = value
		delete router.query.toDate
		delete router.query.fromDate
		delete router.query.startDate
		delete router.query.endDate

		router.replace(router)
	}

	const getProjectInfo = useCallback(async () => {
		if (!projectId) return
		setIsLoading(true)
		try {
			const { data } = await getProjectDetails(projectId)
			setProjectDetails(data?.payload?.project)
			setEnterpriseStatus(data?.payload?.organisation?.organisation?.isEnterprise ?? false)
			setProjectName({
				name: data?.payload?.project?.name,
				state: data?.payload?.project?.state,
				city: data?.payload?.project?.city,
			})
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
		setIsLoading(false)
	}, [projectId, showSnackbar])
	useEffect(() => {
		getProjectInfo()
	}, [router.query])

	return {
		isLoading: isLoading,
		selectedTab: selectedTab,
		setSelectedTab: setSelectedTab,
		handleTabSelection: handleTabSelection,
		projectDetails: projectDetails,
		setProjectDetails: setProjectDetails,
		enterpriseStatus: enterpriseStatus,
		projectName,
		setProjectName,
	}
}
