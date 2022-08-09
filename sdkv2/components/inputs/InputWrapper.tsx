import { FormHelperText, InputLabel, TextFieldProps } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
interface Props {
	label?: any
	helperText?: string
	fullWidth?: boolean
}
export const InputWrapper: FC<Props> = ({ label, helperText, fullWidth = false, children }) => {
	return (
		<Box width={fullWidth ? '100%' : undefined}>
			{label && <InputLabel sx={{ fontWeight: '700' }}>{label}</InputLabel>}
			{children}
			<FormHelperText>{helperText}</FormHelperText>
		</Box>
	)
}
