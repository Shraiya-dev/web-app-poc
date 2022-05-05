import { FormikProps } from 'formik'
import { useCallback } from 'react'

//hook to group repetitive props of forms
export function useFormikProps<T>(form: FormikProps<T>) {
	const formikProps = useCallback(
		(name: keyof T) => {
			const touched = form.touched
			const errors = form.errors
			return {
				name: name,
				value: form.values[name],
				error: Boolean(touched[name] && errors[name] ? errors[name] : null),
				onChange: form.handleChange,
				onBlur: form.handleBlur,
				helperText: touched[name] && errors[name] ? errors[name] : null,
			}
		},
		[form]
	)

	return formikProps
}
