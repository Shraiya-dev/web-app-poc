import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
interface FilterForm {
	status: string
	jobType: string
}
export const useFilterDrawer = () => {
	const router = useRouter()
	const form = useFormik<FilterForm>({
		initialValues: {
			status: 'none',
			jobType: 'none',
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
			delete router.query.pageNumber

			//setting up the params
			router.push(router, undefined, {
				shallow: true,
				scroll: true,
			})
		},
		onReset: () => {
			router.push(router.pathname, undefined, {
				shallow: true,
				scroll: true,
			})
		},
	})
	useEffect(() => {
		const { status, jobType } = router.query
		form.setFieldValue('status', status ?? 'none')
		form.setFieldValue('jobType', jobType ?? 'none')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query])

	return {
		form,
	}
}
