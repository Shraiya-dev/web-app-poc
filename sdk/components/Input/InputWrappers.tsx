import { InputLabel, InputLabelProps, Stack } from '@mui/material'

interface InputWrapperProps extends InputLabelProps {
	label?: string
}
export const InputWrapper = ({ label, children, ...props }: InputWrapperProps) => {
	return (
		<Stack>
			{label && (
				<InputLabel
					sx={{
						mb: 1,
					}}
					{...props}>
					{label}
				</InputLabel>
			)}
			{children}
		</Stack>
	)
}
