import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { getProjectDetails } from '../../createBooking/apis'
import { ProjectPreview, useSnackbar } from '../../../sdk'

export const useProjectInfo = () => {
	const [projectInfo, setProjectInfo] = useState<ProjectPreview>()
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const projectId = router.query.projectId
	const { showSnackbar } = useSnackbar()

	const getProjectInfo = useCallback(async () => {
		if (!projectId) return
		try {
			setLoading(true)
			const { data } = await getProjectDetails(projectId)
			setProjectInfo(data?.payload?.project)
			setLoading(false)
		} catch (error: any) {
			showSnackbar(error?.response?.data?.developerInfo, 'error')
		}
	}, [router.query])

	// const form = useFormik({
	// 	initialValues: {
	// 		siteAddress: '',
	// 		sitePhotos: [],
	// 	},
	// 	validate: (values) => {
	// 		const errors = <any>{}

	// 		return errors
	// 	},
	// 	onSubmit: (values) => {},
	// })

	useEffect(() => {
		getProjectInfo()
	}, [getProjectInfo])

	return {
		projectInfo: projectInfo,
		setProjectInfo: setProjectInfo,
		loading,
		setLoading,
		getProjectInfo,
	}
}
