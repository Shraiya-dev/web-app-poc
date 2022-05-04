import { Search } from '@mui/icons-material'
import { IconButton, InputAdornment, OutlinedTextFieldProps, TextField, TextFieldProps } from '@mui/material'
import { styled } from '@mui/system'
import { useFormik } from 'formik'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const StyledForm = styled('form')(({ theme }) => ({
	flex: 1,
}))
export const SearchField = ({ name = 'name', ...rest }: TextFieldProps) => {
	const router = useRouter()
	useEffect(() => {
		form.setFieldValue('fieldName', router.query[name] ?? '')
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [router])

	const form = useFormik<{
		fieldName: string
	}>({
		initialValues: {
			fieldName: '',
		},
		onSubmit: (values) => {
			if (values.fieldName) {
				router.query = { [name]: values.fieldName }
			} else {
				delete router.query[name]
			}

			router.push(router)
		},
	})
	return (
		<StyledForm onSubmit={form.handleSubmit}>
			<TextField
				name='fieldName'
				value={form.values.fieldName}
				onChange={form.handleChange}
				{...rest}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton type='submit'>
								<Search color='inherit' />
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</StyledForm>
	)
}
