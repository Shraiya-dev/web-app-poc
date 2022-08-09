import { Avatar, Divider, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
interface Props {
	active?: boolean
	src?: string
	label?: string
}
export const JobCategoryCard: FC<Props> = ({ src, active, label }) => {
	return (
		<Stack alignItems='center' spacing={2}>
			<Avatar sx={{ width: 60, height: 60 }} src={src} />
			<Typography fontSize={'12px'}>{label}</Typography>
		</Stack>
	)
}
