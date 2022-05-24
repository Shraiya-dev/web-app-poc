import { InputLabel, InputLabelProps, Stack, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { theme } from '../../constants'

interface InputWrapperProps extends InputLabelProps {
	label?: string
	toolTip?: string
}
export const InputWrapper = ({ label, toolTip, children, ...props }: InputWrapperProps) => {
	return (
		<Stack>
			{label && (
				<InputLabel
					sx={{
						mb: 1.5,
						color: '#061F48',
					}}
					{...props}>
					<Typography fontSize={13} fontWeight={700} display='inline'>
						{label}
					</Typography>

					{toolTip && (
						<Tooltip title={toolTip} placement='top-start' sx={{ verticalAlign: 'middle' }}>
							<HelpOutlineIcon
								style={{
									fontSize: '18',
									verticalAlign: 'middle',
									marginLeft: 4,
									color: theme.palette.secondary.light,
								}}
							/>
						</Tooltip>
					)}
				</InputLabel>
			)}
			{children}
		</Stack>
	)
}
