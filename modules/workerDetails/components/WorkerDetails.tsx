import { Stack, Box, Paper, Typography, Chip, Grid, getSkeletonUtilityClass } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { BasicDetails } from './BasicDetails'
import { theme } from '../../../sdk'
import { useRouter } from 'next/router'
import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'

import { getWorkerInfo } from '../apis/apis'

import { useSnackbar } from '../../../sdk'

interface WorkerData {
	name: string
	city: string
	state: string
	phoneNumber: string
	jobType: string
	gender: string
	maritalStatus: string
	experience: string
	projectCompleted: string
}

const WorkerProfileStyle = styled(Box)(({ theme }) => ({
	'.paper': {
		width: '100%',
		margin: 20,
		height: '100%',
	},
	'.image': {
		borderRadius: '50%',
		display: 'block',
		width: 150,
		top: 70,

		textAlign: 'center',
		position: 'relative',
	},
	'.secondaryBox': {
		paddingTop: 90,
		paddingLeft: 20,
		paddingRight: 20,
	},
	'.workerText': {
		textAlign: 'center',
		overflow: 'hidden',
		fontSize: 24,
		margin: 8,
	},
	'.locationText': {
		textAlign: 'center',
		overflow: 'hidden',
		fontSize: 12,
		margin: 8,
	},
	'.locationIcon': {
		// Move color to Pallete
		fontSize: 14,
		color: '#CC2C49',
		verticalAlign: 'middle',
		textAlign: 'right',
		marginRight: 4,
	},
	'.contactInfo': {
		padding: 10,
		marginTop: 30,
	},
	'.contactText': {
		fontSize: 18,
	},
	'.locationInfo': {
		fontSize: 12,
		opacity: 0.5,
		paddingTop: 8,
	},
}))

export const WorkerProfileInfo = () => {
	const [workerData, setWorkerData] = useState<WorkerData>()
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const data = {
		workerName: 'Smith',
		address: 'Nagpur, Maharashtra',
		phone: ' +919912345678',
		skills: ['Technician'],
		email: 'RamBabuKewati@gmail.com',
		gender: 'Male',
		maritalStatus: 'Unmarried',
		experience: '4 years 8 months',
		projectCompleted: 5,
	}

	useEffect(() => {
		let id = router.query.workerId

		getWorkerInfo(id)
			.then((data: any) => {
				setWorkerData(data?.data?.payload)
			})
			.catch((error: any) => {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
				console.log(error)
			})
	}, [])

	return (
		<WorkerProfileStyle>
			<Box>
				<Grid item xs={12}>
					<Button startIcon={<ArrowBack />} onClick={() => router.back()} variant='text' color='primary'>
						Go Back
					</Button>
				</Grid>
				<Grid container spacing={1}>
					<Grid item xs={12} md={4}>
						<Paper elevation={4} className='paper'>
							<Box style={{ backgroundColor: 'rgba(36, 76, 179, 0.15)' }}>
								<Stack direction={'row'} justifyContent='center'>
									<img className='image' src='http://bluegalaxy.info/images/sea_captain.jpg' />
								</Stack>
							</Box>
							<Box className='secondaryBox'>
								<Typography className='workerText'>{workerData?.name || ''}</Typography>

								<Typography className='locationText'>
									<LocationOnIcon className='locationIcon' />
									{`${workerData?.city || ''}, ${workerData?.state || ''}`}
								</Typography>

								<Stack direction='row' spacing={1} justifyContent='center'>
									<Chip label={workerData?.jobType} />
								</Stack>

								<Stack className='contactInfo'>
									<Typography className='contactText'>Contact</Typography>
									<Typography className='locationInfo'>
										<LocationOnIcon className='locationIcon' /> {workerData?.phoneNumber || ''}
									</Typography>
								</Stack>
							</Box>
						</Paper>
					</Grid>

					<Grid item xs={12} md={8}>
						<Paper elevation={4} className='paper' style={{ padding: 20 }}>
							<Stack>
								<Typography variant='h5' style={{ color: theme.palette.primary.main }}>
									Basic Details
								</Typography>
								<BasicDetails workerData={workerData} />
							</Stack>
						</Paper>
					</Grid>
				</Grid>
			</Box>
		</WorkerProfileStyle>
	)
}
