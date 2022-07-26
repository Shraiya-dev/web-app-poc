import { Box, Button, Paper, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { isAfter, isBefore } from 'date-fns'
import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import Countdown from 'react-countdown'
import { ButtonClicked } from 'sdk/analytics/analyticsWrapper'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const eventDate = Date.parse('2022-07-17T13:10:00')
const eventEndDate = Date.parse('2022-07-17T12:30:00')
const meetLink = 'https://meet.google.com/gvk-uvgh-ywy'
const Page: NextPage = () => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	const router = useRouter()
	const ref = useRef()
	useEffect(() => {
		if (isAfter(new Date(), eventDate) && isBefore(new Date(), eventEndDate) && window) {
			window.location.href = meetLink
		}
	}, [])

	return (
		<>
			<Box
				style={{
					display: 'flex',
					justifyContent: 'center',
					margin: isMobile ? 20 : 40,
				}}>
				<Stack justifyContent='center' spacing={2}>
					<Box>
						<img
							width={'100%'}
							src={'/assets/landing/banners/kM-july-17.png'}
							alt='khula-manch'
							style={{ maxWidth: isMobile ? '' : 600, borderRadius: 8 }}
						/>
					</Box>

					<Typography
						textAlign={'center'}
						style={{
							fontSize: isMobile ? 16 : 24,
							fontWeight: 'bold',
							textAlign: 'center',
						}}>
						Time: 1:30 - 2:30pm, 17 July (Sunday)
					</Typography>

					{isAfter(new Date(), eventDate) && isBefore(new Date(), eventEndDate) ? (
						<Typography
							textAlign={'center'}
							color='primary.main'
							sx={{
								fontSize: isMobile ? 16 : 32,
								fontWeight: 'bold',
								textAlign: 'center',
							}}>
							Meeting has Started Join Now!!
						</Typography>
					) : (
						isBefore(new Date(), eventDate) && (
							<Paper variant='outlined' sx={{ width: 'fit-content', alignSelf: 'center' }}>
								<Stack p={2} direction={'column'} spacing={1} alignItems='center'>
									<Typography color={'#CC2C49'}>Event Starts in</Typography>
									<Stack
										sx={{
											fontWeight: 600,

											fontSize: 32,
											color: '#CC2C49',
											borderRadius: 8,
										}}>
										<Countdown date={eventDate}>
											<Typography
												textAlign={'center'}
												color='primary.main'
												sx={{
													fontSize: isMobile ? 16 : 32,
													fontWeight: 'bold',
													textAlign: 'center',
												}}>
												Meeting has Started Join Now!!
											</Typography>
										</Countdown>
									</Stack>
									<Stack direction='row' spacing={2.5} paddingLeft={1}>
										<Typography color={'#CC2C49'}>Day</Typography>
										<Typography color={'#CC2C49'}>Hrs</Typography>
										<Typography color={'#CC2C49'}>Mins</Typography>
										<Typography color={'#CC2C49'}>Sec</Typography>
									</Stack>
								</Stack>
							</Paper>
						)
					)}

					<Button
						variant='contained'
						sx={{
							textTransform: 'none',
							fontSize: isMobile ? 20 : 36,
							backgroundColor: '#CC2C49',
						}}
						href={meetLink}
						onClick={() => {
							ButtonClicked({
								action: 'Khula Manch',
								page: 'projecthero.in',
								url: router.asPath,
							})
						}}
						disabled={isAfter(new Date(), eventEndDate)}>
						{isAfter(new Date(), eventEndDate) ? 'समाप्त हो चुका है' : 'बात करने के लिए यहां क्लिक करें'}
					</Button>

					<Button
						variant='contained'
						sx={{ textTransform: 'none', alignSelf: 'center' }}
						href='https://play.google.com/store/apps/details?id=com.google.android.apps.meetings'>
						Download Google Meet for Joining Video call
					</Button>
					<Stack>
						<Typography sx={{ pb: 2 }} textAlign={'center'} fontSize={18} fontWeight={600}>
							वीडियो कॉल पे जुड़ने के सम्बंधित किसी भी समस्या लिए आपके सुपरवाइजर या पार्टनर से संपर्क करे।
						</Typography>
						<Typography textAlign={'center'}>Saurabh Tiwari : 63804-37119</Typography>
						<Typography textAlign={'center'}>Amaresh Dwivedi Bajrangi : 84008-71240</Typography>
					</Stack>
				</Stack>
			</Box>
		</>
	)
}
export default Page

const pageUrl = '/about-us'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
