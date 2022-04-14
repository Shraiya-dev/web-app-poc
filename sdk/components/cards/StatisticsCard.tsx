import { Paper, Stack, Box, Typography } from '@mui/material'
import Image from 'next/image'

interface StatisticsCardProps {
	stat: { src: string; value: string; bgColor: string; color: string; text: string }
}
export const StatisticsCard = ({ stat }: StatisticsCardProps) => {
	return (
		<Paper elevation={4} sx={{ flex: 1 }}>
			<Stack spacing={2} p={2} direction={'row'}>
				<Box sx={{ background: stat.bgColor, padding: '15px', borderRadius: '6px' }}>
					<Image src={stat.src} alt='' />
				</Box>
				<Stack direction='column' justifyContent='flex-end'>
					<Typography variant='h6' fontWeight={900} color={stat.color}>
						{stat.value}
					</Typography>
					<Typography variant='h6' color={stat.color}>
						{stat.text}
					</Typography>
				</Stack>
			</Stack>
		</Paper>
	)
}
