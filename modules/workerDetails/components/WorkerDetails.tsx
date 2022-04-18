import { Stack, Box, Paper, Typography, Chip, Grid } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'

import { Rating } from './Rating'
import { BasicDetails } from './BasicDetails'
import { BankDetails } from './BankDetails'
import { DocInfo } from './Documentation'

export const WorkerProfileInfo = () => {
	const CustomWorkerProfile = styled(Box)(({ theme }) => ({
		'.box': {
			display: 'inline-block',
			// width: 900,
			// height: 200,
			margin: 10,
			background: 'rgba(36, 76, 179, 0.15)',
		},
		'.box-span': {
			display: 'block',
			width: 50,
			//height:150,
			borderRadius: '100%',
			// marginTop: 125,
			// marginLeft: 175,

			//fontSize:28,
			fontWeight: 'bold',
			textAlign: 'center',
			// lineHeight:150,
			/// backgroundColor:"#81D4FA",
			zIndex: 20,
		},

		'.box2': {
			//position:"relative",
			zindex: -10,
			display: 'inline-block',
			// width: 200,
			// height: 300,
			//marginTop: -119,
			//  backgroundColor:"#ccc",
			verticalAlign: 'top',
		},
	}))

	const [value, setValue] = React.useState('1')

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue)
	}
	return (
		<Box>
			<Grid container spacing={1}>
				<Grid item xs={12} sm={12} md={3} lg={2.5}>
					<Box>
						<Paper elevation={3} style={{ width: 345, height: 711, margin: 20 }}>
							<Box style={{ backgroundColor: 'rgba(36, 76, 179, 0.15)', height: 117 }}>
								<Stack style={{ left: 113, top: 57, position: 'absolute' }}>
									<img
										style={{
											borderRadius: '50%',
											display: 'block',
											width: 150,
											//height: 50,
											textAlign: 'center',
										}}
										src='http://bluegalaxy.info/images/sea_captain.jpg'
									/>
								</Stack>
							</Box>
							<Box style={{ paddingTop: 80, paddingLeft: 20, paddingRight: 20 }}>
								<Typography
									style={{ textAlign: 'center', overflow: 'hidden', fontSize: 24, margin: 8 }}>
									Deepak Kushwaha
								</Typography>

								<Typography
									style={{ textAlign: 'center', overflow: 'hidden', fontSize: 12, margin: 8 }}>
									<LocationOnIcon
										style={{ fontSize: 14, color: '#CC2C49', verticalAlign: 'middle' }}
									/>{' '}
									Nagpur, Maharashtra
								</Typography>

								<Stack
									direction='row'
									spacing={1}
									style={{ textAlign: 'center', display: 'flex', justifyContent: 'center' }}
									//style={{ textAlign: 'center', overflow: 'hidden', fontSize: 24, margin: 8 }}
								>
									<Chip icon={<VerifiedUserIcon />} color='success' label='Vaccinated' />
									<Chip label='Technitian' />
								</Stack>

								<Stack style={{ padding: 20 }}>
									<Typography style={{ fontSize: 18 }}>About</Typography>
									<Typography style={{ fontSize: 12, opacity: 0.5, paddingTop: 8 }}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
										incididunt ut labore et dolore magna aliqua.
									</Typography>
								</Stack>

								<Stack
									direction='row'
									sx={{
										display: 'flex',
										flexWrap: 'wrap',
									}}>
									<Chip color='primary' label='Text1' style={{ margin: 4 }} />
									<Chip color='primary' label='Text2' style={{ margin: 4 }} />
									<Chip color='primary' label='Text1' style={{ margin: 4 }} />
									<Chip color='primary' label='Text2' style={{ margin: 4 }} />
									<Chip color='primary' label='Text1' style={{ margin: 4 }} />
									<Chip color='primary' label='Text2' style={{ margin: 4 }} />
								</Stack>

								<Stack style={{ padding: 20 }}>
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
					</Box>
				</Grid>

				<Grid item xs={12} sm={12} md={9} lg={9.5}>
					<Box>
						<Paper elevation={3} style={{ width: 716, height: 711, margin: 20 }}>
							<TabContext value={value} >
								<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
									<TabList
										onChange={handleChange}
										aria-label='lab API tabs example'
										variant='scrollable'
										scrollButtons='auto'>
										<Tab label='Basic Details' value='1' />
										<Tab label='Bank Details' value='2' />
										<Tab label='Projects(Detailed rating)' value='3' />
										<Tab label='Documentation' value='4' />
									</TabList>
								</Box>
								<TabPanel value='1'>
									<BasicDetails />
								</TabPanel>
								<TabPanel value='2'>
									<BankDetails />
								</TabPanel>
								<TabPanel value='3'>
									<Rating />
								</TabPanel>
								<TabPanel value='4'>
									<DocInfo />
								</TabPanel>
							</TabContext>
						</Paper>
					</Box>
				</Grid>
			</Grid>
		</Box>
	)
}
