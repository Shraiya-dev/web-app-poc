import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Stack } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import styled from '@emotion/styled'

export default function WorkerCard({ ...props }) {
	const { handleView } = props
	const CustomWorkerCard = styled(Box)(({ theme }) => ({
		'.card-content-info': {
			color: '#244CB3',
			fontSize: 14,
			fontWeight: 'normal',
		},
		'.worker-name': {
			float: 'left',
			paddingRight: 30,
		},
		'.view': {
			cursor: 'pointer',
			float: 'right',
		},
		'.profile': {
			display: 'flex',
			justifyContent: 'center',
			background: 'rgba(36, 76, 179, 0.05)',
			border: '1px solid rgba(36, 76, 179, 0.5)',
			boxSizing: 'border-box',
			borderRadius: 20,
			fontSize: 10,
			marginTop: 8,
			padding: '8,10,8,10',
			width: 70,
		},
		'.age': {
			color: '#9BA5B6',
			fontSize: 12,
			marginTop: 8,
		},
		'.text-info': {
			fontSize: 12,
			marginTop: 8,
		},
		'.icon': {
			color: '#CC2C49',
			fontSize: 12,
			verticalAlign: 'middle',
		},
	}))

	return (
		<CustomWorkerCard>
			<Card sx={{ display: 'flex', border: 'none', width: 345, height: 186, margin: 10 }}>
				<CardMedia
					component='img'
					sx={{ width: 151 }}
					image='https://www.jquery-az.com/html/images/banana.jpg'
					alt='Live from space album cover'
				/>

				<CardContent>
					<Box className='card-content-info'>
						<Typography className='worker-name'></Typography> Rambabu Kewat
						<Stack className='view' onClick={handleView}>
							View
						</Stack>
					</Box>
					<Typography className='profile'>Technician</Typography>
					<Typography className='age'>45 Years</Typography>
					<Typography className='text-info'>
						<LocationOnIcon className='icon' /> 10 Projects
					</Typography>
					<Typography className='text-info'>
						<LocationOnIcon className='icon' /> Patna, Bihar
					</Typography>
					<Typography className='text-info'>
						<LocationOnIcon className='icon' /> 10 Years Of Experience
					</Typography>
				</CardContent>
			</Card>
		</CustomWorkerCard>
	)
}
