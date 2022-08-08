import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, Circle } from '@mui/icons-material'

import { Box, Button, Grid, List, ListItem, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Carousel, Section, useMobile } from 'sdk'
import { HeroDiscoveryMetaData } from 'sdk/data/discoverHero'
import { homePage } from 'sdk/data/home'
import { sliceIntoChunks } from 'sdk/utils/arrayHelpers'
import { CreateBookingCard, JobCategoryCard } from 'sdkv2/components'
import { WorkerCard } from 'sdkv2/components/cards/WorkerCard'

export const Home = () => {
	const {
		jobSection,
		bookingJourneySection,
		benefitFromHeroSection,
		supportCarouselSection,
		customerSayingSection,
		hireConstructionSection,
		phAdvantage,
		phApp,
		clientCarouselSection,
	} = homePage
	const [jobTypeForCarousal, setJobTypeForCarousal] = useState('MASON')
	const isMobile = useMobile()
	const router = useRouter()
	return (
		<>
			<Section>
				<Grid container spacing={2}>
					<Grid item xs={12} md={7.5}>
						<Stack justifyContent='space-between' spacing={2}>
							<Stack alignItems={'center'} direction={{ md: 'row' }} justifyContent='space-between'>
								<Box
									sx={{
										marginTop: { xs: 2, md: 6 },
										width: '48%',
									}}>
									<img width='100%' src='/assets/landingv2/heroSection/heroImg1.png' />
								</Box>
								<Box
									sx={{
										marginBottom: { xs: 2, md: 6 },
										width: '48%',
									}}>
									<img width='100%' src='/assets/landingv2/heroSection/heroImg2.png' />
								</Box>
							</Stack>
							<Typography variant='h1' lineHeight='1.5'>
								India&apos;s Largest & Most Trusted Platform to{' '}
								<Typography display='inline' variant='h1' color='primary.main'>
									Hire Construction Workers
								</Typography>
								{!isMobile && (
									<img
										style={{ marginLeft: 30, marginBottom: -30 }}
										src='/assets/landingv2/heroSection/curlyArrow.svg'
									/>
								)}
							</Typography>
							<Stack direction='row' alignItems={'center'} spacing={3} mt='auto'>
								<img width={50} src='/assets/landingv2/heroSection/workerGreen.svg' />
								<Typography variant='h5'>
									<strong>4 Lac+</strong> construction workforce available
								</Typography>
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={12} md={4.5} justifyContent='center'>
						<CreateBookingCard />
					</Grid>
				</Grid>
			</Section>
			<Section backgroundColor='#000000'>
				<Stack direction='row' alignItems='center' spacing={2}>
					{jobSection.tagLine.map((item, index, arr) => (
						<>
							<Typography variant='h6' color='common.white' key={item}>
								{item}
							</Typography>
							{index < arr.length - 1 && <Circle sx={{ fontSize: 8, color: 'common.white' }} />}
						</>
					))}
				</Stack>
				<Stack p={3}>
					<Typography variant='h2' color='common.white'>
						Explore{' '}
						<Typography variant='h2' color='primary' display='inline'>
							Job Categories
						</Typography>{' '}
						and Book Workers{' '}
						<Typography variant='h2' color='primary' display='inline'>
							in a minute
						</Typography>
					</Typography>
				</Stack>
				<Tabs
					sx={{ mx: -5 }}
					onChange={(e, v) => setJobTypeForCarousal(v)}
					value={jobTypeForCarousal}
					variant='scrollable'
					ScrollButtonComponent={(props) => {
						if (props.direction === 'left' && !props.disabled) {
							return (
								<Button variant='text' {...props}>
									<ArrowCircleLeftOutlined fontSize={'large'} sx={{ color: 'common.white' }} />
								</Button>
							)
						} else if (props.direction === 'right' && !props.disabled) {
							return (
								<Button variant='text' {...props}>
									<ArrowCircleRightOutlined fontSize={'large'} sx={{ color: 'common.white' }} />
								</Button>
							)
						} else {
							return null
						}
					}}>
					{jobSection.jobs.map((item) => (
						<Tab
							value={item.value}
							key={item.label}
							sx={{ color: 'common.white' }}
							label={<JobCategoryCard src={item.image} label={item.label} />}
						/>
					))}
				</Tabs>
				<Carousel
					componentPerView={1}
					items={sliceIntoChunks(HeroDiscoveryMetaData[jobTypeForCarousal], isMobile ? 2 : 6).map(
						(slide, index) => {
							return (
								<Grid key={index} container py={3} spacing={2}>
									{slide.map((item: any) => (
										<Grid md={4} item key={item.workerId}>
											<WorkerCard worker={item} />
										</Grid>
									))}
								</Grid>
							)
						}
					)}
					slideDelay={5000}
				/>
			</Section>

			<Section backgroundColor='#F7F7F7'>
				<Box pt={'24px'} pb={'66px'}>
					<Stack direction={'column'} mb={'32px'}>
						<Typography variant='h1'>{homePage.howItWorksSection.heading}</Typography>
						<Typography variant='h4'>{homePage.howItWorksSection.subHeading}</Typography>
					</Stack>
					<Box mb={'66px'}>
						<Button variant='contained' sx={homePage.howItWorksSection.buttonSx}>
							{homePage.howItWorksSection.buttonText}
						</Button>
					</Box>
					<Box>
						<img src='/assets/landingv2/heroSection/howitworks.svg' alt='' />
					</Box>
				</Box>
			</Section>

			<Section backgroundColor='#000'>
				<Box
					sx={{
						padding: '46px 0 70px 0',
					}}>
					<Grid container>
						<Grid item xs={6}>
							<Stack direction={'column'} spacing={4}>
								<Box>{homePage.whyYouShouldHire.left.heading}</Box>
								<Box>
									<Button sx={homePage.whyYouShouldHire.left.buttonSx}>
										{homePage.whyYouShouldHire.left.buttonText}
									</Button>
								</Box>
							</Stack>
						</Grid>

						<Grid item xs={6}>
							<Grid container spacing={4}>
								{homePage.whyYouShouldHire.right.item.map((data, index) => {
									return (
										<Grid key={index} item xs={6}>
											<Stack direction={'row'} spacing={2} width={'310px'}>
												<Box sx={homePage.whyYouShouldHire.right.indexSx}>{data.index}</Box>
												<Box>
													<Stack direction={'column'} sx={{ color: '#fff' }} spacing={2}>
														<Typography
															variant='h4'
															sx={{
																color: homePage.whyYouShouldHire.right.itemTextColor,
															}}>
															{data.heading}
														</Typography>
														<Typography variant='h5'>{data.desc}</Typography>
													</Stack>
												</Box>
											</Stack>
										</Grid>
									)
								})}
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</Section>

			<Section backgroundColor='#F7F7F7'>
				<Box
					sx={{
						p: '46px 0px',
						overflowX: 'hidden',
					}}>
					<Grid container spacing={8}>
						<Grid item xs={6}>
							<Stack direction={'column'} spacing={4}>
								<Stack direction={'column'} spacing={2}>
									<Box>{homePage.HeroAdvantage.Heading}</Box>
									<Box>{homePage.HeroAdvantage.subHeading}</Box>
								</Stack>
								<Box>
									<Button
										sx={{
											p: '20px 66px',
											fontWeight: '900',
										}}>
										{homePage.HeroAdvantage.buttonText}
									</Button>
								</Box>
							</Stack>
						</Grid>
						<Grid item xs={6}>
							<Box
							// sx={{ background: '#F6F2E1' }}
							>
								<Stack direction={'row'}>
									<Box>
										<img src='/assets/landingv2/heroSection/advantageHero.svg' alt='' />
									</Box>
									<Box sx={{ position: 'relative', left: '-80px' }}>
										<img src='/assets/landingv2/heroSection/advantageHeropic.svg' alt='' />
									</Box>
								</Stack>
							</Box>
						</Grid>
					</Grid>
				</Box>
			</Section>

			<Section backgroundColor='#000'>
				<Box
					sx={{
						p: '46px 0 60px 0',
					}}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<Stack direction={'column'}>
								<Box mb={'14px'}>{homePage.heroApp.heading}</Box>
								<Box mb={'40px'}>{homePage.heroApp.desc}</Box>
								<List sx={{ color: '#fff' }}>
									{homePage.heroApp.list.map((data, index) => {
										return (
											<ListItem key={index} sx={{ mb: '24px' }}>
												<Typography variant='h4' sx={{ fontWeight: 400, fontSize: '20px' }}>
													{data.item}
												</Typography>
											</ListItem>
										)
									})}
								</List>
								<Typography variant='h4' color={'#fff'}>
									Download Now!
								</Typography>
								<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
									<img src='/assets/landingv2/heroSection/googlebutton.svg' alt='' />
								</Box>
							</Stack>
						</Grid>
						<Grid item xs={6}>
							<Stack direction={'row'}>
								<Box sx={{ position: 'absolute', left: '190px', zIndex: '2' }}>
									<img src='/assets/landingv2/heroSection/mobile1.svg' alt='' />
								</Box>
								<Box sx={{ position: 'relative', zIndex: '4' }}>
									<img src='/assets/landingv2/heroSection/mobile2.svg' alt='' />
								</Box>
							</Stack>
						</Grid>
					</Grid>
				</Box>
			</Section>

			<Section backgroundColor='#F7F7F7'>
				<Box
					sx={{
						padding: '46px 0px',
					}}>
					<Stack direction={'column'} spacing={4} sx={{ width: '100%' }}>
						<Box>{homePage.customerReview.heading}</Box>
						<Stack direction={'row'} justifyContent={'center'} alignItems={'center'}>
							<Box sx={homePage.customerReview.card.cardStyleSx}>
								<Stack direction={'row'}>
									<Box sx={{ backgroundSize: 'cover' }}>
										<img src={homePage.customerReview.card.cardImageSrc} />
									</Box>
									<Stack
										direction={'row'}
										justifyContent='center'
										alignItems={'center'}
										p={'66px 40px'}>
										{homePage.customerReview.card.cardText}
									</Stack>
								</Stack>
							</Box>
						</Stack>
					</Stack>
				</Box>
			</Section>
		</>
	)
}
