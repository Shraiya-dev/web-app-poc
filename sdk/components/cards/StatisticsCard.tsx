import { Paper, Stack, Box, Typography } from '@mui/material'
import { fontSize, styled } from '@mui/system';
import Image from 'next/image'

interface StatisticsCardProps {
	stat: { src: string; value: number; bgColor: string; color: string; text: string }
}
const CustomPaper = styled(Paper)(({ theme }) => ({
	flex: 1,
	display: 'flex',
	padding: theme.spacing(2),
	borderRadius:8,

	'.statText': {
		fontSize: "24px",
	},

	[theme.breakpoints.down('md')]: {


		'.statText': {
			fontSize: "14px"
		},
	},
}))
export const StatisticsCard = ({ stat }: StatisticsCardProps) => {
	return (
		<CustomPaper elevation={4}>
			<Box className='imageContainer'>
				<Image src={stat.src} alt='stat.text' width={66} height={66} />
			</Box>

			<Stack pl={2} direction='column' justifyContent='flex-end'>
				<Typography variant='h4' fontWeight={900} color={stat.color}>
					{stat.value}
				</Typography>
				<Typography className="statText">
					{stat.text}
				</Typography>
			</Stack>
		</CustomPaper>
	)
}
