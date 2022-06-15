import { Stack, styled, Typography } from '@mui/material'

interface Props {
	date?: string
}

export const DateStack = ({ date }: Props) => {
	return (
		<StyledDateStack>
			<Typography lineHeight={1.4} variant='caption' fontWeight={600} color='primary.main'>
				{date?.split(' ')[1] ?? 'NA'}
			</Typography>

			<Typography lineHeight={1.4} variant='caption' fontWeight={600} color='primary.main'>
				{date?.split(' ')[0] ?? 'NA'}
			</Typography>
		</StyledDateStack>
	)
}

export const StyledDateStack = styled(Stack)(({ theme }) => ({
	padding: theme.spacing(1),
	alignItems: 'center',
	justifyItems: 'center',
	borderRadius: '50%',
	width: 48,
	height: 48,
	border: `1px solid ${theme.palette.primary.main}`,
	background: theme.palette.common.white,
}))
