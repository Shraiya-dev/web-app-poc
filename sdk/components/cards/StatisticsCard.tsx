import { Box, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import Image from 'next/image'

interface StatisticsCardProps {
	label: string
	count: number
	color: string
	icon: string
}
const CustomPaper = styled(Paper)(({ theme }) => ({
	flex: 1,
	display: 'flex',
	padding: theme.spacing(2),
	borderRadius: 8,

	'.statText': {
		fontSize: '24px',
	},

	[theme.breakpoints.down('md')]: {
		'.statText': {
			fontSize: '14px',
		},
	},
}))

export const StatisticsCard = ({ label, icon, count, color }: StatisticsCardProps) => {
	return (
		<CustomPaper elevation={1}>
			<Box className='imageContainer'>
				<Image src={icon} alt='stat.text' width={66} height={66} />
			</Box>

			<Stack pl={2} direction='column' justifyContent='flex-end'>
				<Typography variant='h4' fontWeight={900} color={color}>
					{count}
				</Typography>
				<Typography className='statText'>{label}</Typography>
			</Stack>
		</CustomPaper>
	)
}
