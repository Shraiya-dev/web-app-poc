import { TextField, TextFieldProps } from '@mui/material'

export const CompanyNameField = ({ onChange, ...rest }: TextFieldProps) => {
	const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9.&\s]+$/i
	return (
		<TextField
			{...rest}
			onChange={(e) => {
				const value = e.target.value
				if (value !== '' && !ALPHA_NUMERIC_REGEX.test(value)) {
					return
				}
				if (onChange) {
					onChange(e)
				}
			}}
		/>
	)
}
