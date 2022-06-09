import { InputAdornment, TextField, TextFieldProps } from '@mui/material'

export const PhoneField = ({ onChange, ...rest }: TextFieldProps) => {
	return (
		<TextField
			type={'tel'}
			InputProps={{
				startAdornment: <InputAdornment position='start'>+91</InputAdornment>,
			}}
			{...rest}
			onChange={(e) => {
				if (!isNaN(Number(e.target.value)) && e.target.value.length <= 10 && onChange) {
					onChange(e)
				}
			}}
		/>
	)
}
