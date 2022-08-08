import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { useContractorAuth, useSnackbar } from '../../../sdk'
import { getProjectList } from '../apis/apis'

export const useProjectDashboard = () => {
	interface projectPreview {
		projectId: string
		name: string
		siteAddress: string
		employee: string
		bookingCount: number
		city: string
		state: string
		isEnterprise: boolean
	}

	const [loading, setLoading] = useState(false)
	const [projects, setProjects] = useState<{
		hasMore: boolean
		projects: projectPreview[]
	}>({ hasMore: false, projects: [] })

	const { showSnackbar } = useSnackbar()
	const { user } = useContractorAuth()
	const router = useRouter()

	const getProjects = useCallback(async () => {
		const queryParams = new URLSearchParams(router.query as any)
		setLoading(true)
		try {
			//const queryParams = new URLSearchParams(router.query as any)
			const { data } = await getProjectList()

			const projects = data?.payload?.projects?.map((item: any) => {
				const project: projectPreview = {
					projectId: item?.project?.id,
					name: item?.project?.name,
					siteAddress: item?.project?.siteAddress,
					city: item?.project?.city,
					state: item?.project?.state,
					employee: item?.stats?.activeEmployees,
					bookingCount: item?.stats?.bookingCount,
					isEnterprise: item?.customer?.isEnterprise,
				}

				return project
			})
			setProjects({ hasMore: data.payload.hasMore, projects: projects })
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
		setLoading(false)
	}, [showSnackbar])

	useEffect(() => {
		getProjects()
	}, [getProjects])

	return {
		projects: projects,
		loading: loading,
		user: user,
	}
}
