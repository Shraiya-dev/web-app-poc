import { Paper, Stack, Box, Typography } from '@mui/material'
import { styled } from '@mui/system';
import Image from 'next/image'

interface StatisticsCardProps {
	stat: { src: string; value: string; bgColor: string; color: string; text: string }
}
const CustomPaper = styled(Paper)(({ theme }) => ({
	flex: 1,
	'.iconImage': {

	}
}))
export const StatisticsCard = ({ stat }: StatisticsCardProps) => {
	return (
		<CustomPaper elevation={4}>
			<Stack spacing={2} p={2} direction={'row'}>
				<Image src={stat.src} className='iconImage' alt='stat.text' />
				<Stack direction='column' justifyContent='flex-end'>
					<Typography variant='h6' fontWeight={900} color={stat.color}>
						{stat.value}
					</Typography>
					<Typography variant='h6' color={stat.color}>
						{stat.text}
					</Typography>
				</Stack>
			</Stack>
		</CustomPaper>
	)
}
