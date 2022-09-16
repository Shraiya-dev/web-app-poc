import { Avatar, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import { useMobile } from 'sdk/hooks'

interface Props {
	active?: boolean
	src?: string
	label?: string
}
export const JobCategoryCard: FC<Props> = ({ src, active, label }) => {
	const isMobile = useMobile()
	return (
		<Stack alignItems='center' spacing={isMobile ? 2 : 1}>
			<Avatar sx={{ width: isMobile ? 60 : 80, height: isMobile ? 60 : 80 }} src={src} />
			<Typography fontSize={isMobile ? '12px' : '14px'}>{label}</Typography>
		</Stack>
	)
}
