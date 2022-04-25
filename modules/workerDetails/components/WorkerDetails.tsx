import { Stack, Box, Paper, Typography, Chip, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { BasicDetails } from './BasicDetails'
import { theme } from '../../../sdk'
import { useRouter } from 'next/router'
import { ArrowBack } from '@mui/icons-material'
import { Button } from '@mui/material'

import { getWorkerInfo } from '../../../sdk/apis'


export const WorkerProfileInfo = () => {
	const [workerData, setWorkerData] = useState()
	const router = useRouter()

	useEffect(() => {
		let id = router.query.workerId

		getWorkerInfo(id)
			.then((data:any) => {
				setWorkerData(data)
				console.log(data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<Box>
			<Grid item xs={12}>
				<Button startIcon={<ArrowBack />} onClick={() => router.back()} variant='text' color='primary'>
					Go Back
				</Button>
			</Grid>
			<Grid container spacing={1}>
				<Grid item xs={12} md={4}>
					<Paper elevation={4} style={{ width: '100%', margin: 20, height: '100%' }}>
						<Box style={{ backgroundColor: 'rgba(36, 76, 179, 0.15)' }}>
							<Stack direction={'row'} justifyContent='center'>
								<img
									style={{
										borderRadius: '50%',
										display: 'block',
										width: 150,
										top: 70,
										//height: 50,
										textAlign: 'center',
										position: 'relative',
									}}
									src='http://bluegalaxy.info/images/sea_captain.jpg'
								/>
							</Stack>
						</Box>
						<Box style={{ paddingTop: 90, paddingLeft: 20, paddingRight: 20 }}>
							<Typography style={{ textAlign: 'center', overflow: 'hidden', fontSize: 24, margin: 8 }}>
								Deepak Kushwaha
							</Typography>

							<Typography style={{ textAlign: 'center', overflow: 'hidden', fontSize: 12, margin: 8 }}>
								<LocationOnIcon style={{ fontSize: 14, color: '#CC2C49', verticalAlign: 'middle' }} />{' '}
								Nagpur, Maharashtra
							</Typography>

							<Stack
								direction='row'
								spacing={1}
								style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
								//style={{ textAlign: 'center', overflow: 'hidden', fontSize: 24, margin: 8 }}
							>
								<Chip label='Technitian' />
							</Stack>

							<Stack style={{ padding: 10, marginTop: 30 }}>
								<Typography style={{ fontSize: 18 }}>Contact</Typography>
								<Typography style={{ fontSize: 12, opacity: 0.5, paddingTop: 8 }}>
									<LocationOnIcon
										style={{ fontSize: 14, color: '#CC2C49', verticalAlign: 'middle' }}
									/>{' '}
									+91 12345678
								</Typography>
								<Typography style={{ fontSize: 12, opacity: 0.5, paddingTop: 8 }}>
									<LocationOnIcon
										style={{ fontSize: 14, color: '#CC2C49', verticalAlign: 'middle' }}
									/>{' '}
									RamBabuKewati@gmail.com
								</Typography>
							</Stack>
						</Box>
					</Paper>
				</Grid>

				<Grid item xs={12} md={8}>
					<Paper elevation={4} style={{ width: '100%', margin: 20, height: '100%', padding: 20 }}>
						<Stack>
							<Typography variant='h5' style={{ color: theme.palette.primary.main }}>
								Basic Details
							</Typography>
							<BasicDetails />
						</Stack>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	)
}
