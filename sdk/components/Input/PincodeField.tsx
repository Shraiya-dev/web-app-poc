import { TextField, TextFieldProps } from '@mui/material'

export const PinCodeField = ({ onChange, ...rest }: TextFieldProps) => {
	// While error check use isPincodeValid
	return (
		<TextField
			type={'number'}
			{...rest}
			onChange={(e) => {
				if (!isNaN(Number(e.target.value)) && e.target.value.length <= 6 && onChange) {
					onChange(e)
				}
			}}
		/>
	)
}
