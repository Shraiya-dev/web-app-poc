import { FormHelperText, InputLabel, InputLabelProps } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'

interface Props extends InputLabelProps {
	label?: any
	helperText?: string
	fullWidth?: boolean
}
export const InputWrapper: FC<Props> = ({ label, helperText, fullWidth = false, children, sx }) => {
	return (
		<Box width={fullWidth ? '100%' : undefined}>
			{label && (
				<InputLabel sx={{ fontFamily: 'Saira, sans-serif', fontWeight: '700', ...sx }}>{label}</InputLabel>
			)}
			{children}
			<FormHelperText>{helperText}</FormHelperText>
		</Box>
	)
}
