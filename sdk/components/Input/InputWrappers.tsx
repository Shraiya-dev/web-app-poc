import { InputLabel, InputLabelProps, Stack, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

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
						mb: 1, //previous value was 1.5 changed this because the design have 8px spacing between input field and label (why was it 1.5 === 12px ???deepak)
						color: '#061F48',
					}}
					{...props}>
					<Typography variant='h6' fontSize={13} fontWeight={700} display='inline'>
						{label}
					</Typography>

					{toolTip && (
						<Tooltip title={toolTip} placement='top-start' sx={{ verticalAlign: 'middle' }}>
							<HelpOutlineIcon
								style={{
									fontSize: '18',
									verticalAlign: 'middle',
									marginLeft: 4,
									color: '#16253d',
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
