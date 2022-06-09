import { TextField, TextFieldProps } from '@mui/material'

export const NameField = ({ onChange, ...rest }: TextFieldProps) => {
	const ALPHA_REGEX = /^[a-zA-Z\s]+$/i

	return (
		<TextField
			{...rest}
			onChange={(e) => {
				const value = e.target.value
				if (value !== '' && !ALPHA_REGEX.test(value)) {
					return
				}
				if (onChange) {
					onChange(e)
				}
			}}
		/>
	)
}
