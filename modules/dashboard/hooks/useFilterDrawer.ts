import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
interface FilterForm {
	status: string
	jobType: string
	sortBy: string
}
export const useFilterDrawer = () => {
	const router = useRouter()
	const form = useFormik<FilterForm>({
		initialValues: {
			status: 'none',
			jobType: 'none',
			sortBy: 'none',
		},
		onSubmit: (values) => {
			if (values.status !== 'none') {
				router.query.status = values.status
			} else {
				delete router.query.status
			}

			if (values.jobType !== 'none') {
				router.query.jobType = values.jobType
			} else {
				delete router.query.jobType
			}
			if (values.sortBy !== 'none') {
				router.query.sortBy = values.sortBy
			} else {
				delete router.query.sortBy
			}
			delete router.query.pageNumber

			//setting up the params
			router.push(router, undefined, {
				shallow: true,
				scroll: true,
			})
		},
		onReset: () => {
			router.query = { projectId: router.query.projectId, tab: router.query.tab }
			router.push(router, undefined, {
				shallow: true,
				scroll: true,
			})
		},
	})
	useEffect(() => {
		const { status, jobType, sortBy } = router.query
		form.setFieldValue('status', status ?? 'none')
		form.setFieldValue('jobType', jobType ?? 'none')
		form.setFieldValue('sortBy', sortBy ?? 'none')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query])

	return {
		form,
	}
}
