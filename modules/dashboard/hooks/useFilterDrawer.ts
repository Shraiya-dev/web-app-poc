import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
interface FilterForm {
	status: string
}
export const useFilterDrawer = () => {
	const router = useRouter()
	const form = useFormik<FilterForm>({
		initialValues: {
			status: 'none',
		},
		onSubmit: (values) => {
			if (values.status !== 'none') {
				router.query.status = values.status
			} else {
				delete router.query.status
			}

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
		const { status } = router.query
		form.setFieldValue('status', status ?? 'none')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router.query])

	return {
		form,
	}
}
