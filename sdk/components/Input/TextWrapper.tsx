import { InputLabel, InputLabelProps, Stack, Tooltip, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { theme } from '../../constants'

export const TextWrapper = ({ label, toolTip, children, ...props }: any) => {
	return (
		<Stack>
			{label && (
				<Typography
					sx={{
						mb: 1.5,

						fontSize: 13,
						fontWeight: 900,
						color: '#061F48',
					}}
					{...props}>
					<Typography fontSize={13} fontWeight={700}>
						{label}
					</Typography>
					{toolTip && (
						<Tooltip title={toolTip} placement='top-start' sx={{ verticalAlign: 'middle', padding: 1 }}>
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
				</Typography>
			)}
			{children}
		</Stack>
	)
}
