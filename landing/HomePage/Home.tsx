import { ArrowCircleLeftOutlined, ArrowCircleRightOutlined, Circle, Close } from '@mui/icons-material'

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	Dialog,
	Grid,
	IconButton,
	List,
	ListItem,
	Paper,
	Stack,
	Theme,
	Typography,
	useMediaQuery,
} from '@mui/material'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import {
	CarouselV2,
	DataLayerPush,
	externalLinks,
	getCookie,
	LinkButton,
	primary,
	Section,
	sendAnalytics,
	useMobile,
} from 'sdk'
import { HeroDiscoveryMetaData } from 'sdk/data/discoverHero'
import { homePage } from 'sdk/data/home'
import { sliceIntoChunks } from 'sdk/utils/arrayHelpers'
import { CreateBookingCard, JobCategoryCard } from 'sdkv2/components'
import { WorkerCard } from 'sdkv2/components/cards/WorkerCard'
import { BigPlayButton, Player } from 'video-react'
import 'video-react/dist/video-react.css'

const animation = { duration: 25000, easing: (t: number) => t }

export const Home = () => {
	const { jobSection } = homePage
	const isMobile = useMobile()
	const router = useRouter()
	const [videoPlayerPopper, setVideoPlayerPopper] = useState(false)
	const [sliderRef] = useKeenSlider<HTMLDivElement>({
		loop: true,
		renderMode: 'performance',
		drag: false,
		slides: { perView: 'auto' },
		created(s) {
			s.moveToIdx(5, true, animation)
		},
		updated(s) {
			s.moveToIdx(s.track.details.abs + 5, true, animation)
		},
		animationEnded(s) {
			s.moveToIdx(s.track.details.abs + 5, true, animation)
		},
	})

	const verticalCarousel = useKeenSlider<HTMLDivElement>(
		{
			loop: true,
			rubberband: true,
			vertical: true,
			drag: false,
		},
		[
			(slider) => {
				let timeout: ReturnType<typeof setTimeout>
				let mouseOver = false
				function clearNextTimeout() {
					clearTimeout(timeout)
				}
				function nextTimeout() {
					clearTimeout(timeout)
					if (mouseOver) return
					timeout = setTimeout(() => {
						setVerticalState((p) => (p + 1) % 3)
						slider.next()
					}, 5000)
				}
				slider.on('created', () => {
					slider.container.addEventListener('mouseover', () => {
						mouseOver = true
						clearNextTimeout()
					})
					slider.container.addEventListener('mouseout', () => {
						mouseOver = false
						nextTimeout()
					})
					nextTimeout()
				})
				slider.on('dragStarted', clearNextTimeout)
				slider.on('animationEnded', nextTimeout)
				slider.on('updated', nextTimeout)
			},
		]
	)
	const [verticalState, setVerticalState] = useState(0)

	const [jobTypeForCarousal, setJobTypeForCarousal] = useState('MASON')
	const isTab = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))
	const [userType, setUserType] = useState('CONTRACTOR')

	return (
		<>
			<Stack alignItems={'center'}>
				<Stack
					sx={{
						backgroundImage: {
							xs: `url(${'/assets/landingv3/contractorBackgroundMobile.png'})`,
							md: `url(${'/assets/landingv3/contractorBackground.png'})`,
						},
						backgroundRepeat: 'no-repeat',
						backgroundPosition: { xs: '-50px 29% ', md: '0px -15%' },
					}}>
					<Typography
						variant='h6'
						fontSize={{ xs: '22px', md: '40px' }}
						px={{ xs: 2, md: 50 }}
						pt={'46px'}
						textAlign={'center'}>
						India’s Largest & Most Trusted Construction Platform
					</Typography>
					<Box mt={{ xs: '23px', md: '25px' }} alignSelf={'center'}>
						<Box component={'img'} width={{ xs: 220, md: 418 }} src={'/assets/landingv3/divider.svg'} />
					</Box>
					<Stack
						direction={'row'}
						mt={{ xs: '38px', md: '60px' }}
						pl={{ xs: '18px', md: '354px' }}
						pr={{ xs: '18px', md: '275px' }}>
						<Stack pt={{ xs: '21px', md: '39px' }} pr={{ xs: 0, md: '37px' }}>
							<Typography
								variant='h1'
								pl={{ xs: 1, md: 0 }}
								fontSize={{ xs: '32px', md: '80px' }}
								mr={{ xs: 5, md: 15 }}>
								Worker Chahiye?
							</Typography>
							<Stack
								mt={{ xs: '24px', md: '62px' }}
								spacing={{ xs: 0, md: 1.5 }}
								pl={{ xs: 1, md: 0 }}
								pr={{ xs: 0, md: '20px' }}>
								<Stack direction={'row'} alignItems={'flex-start'} spacing={{ xs: 0.8, md: 2 }}>
									<Box
										component={'img'}
										sx={{ mt: { xs: 0.5, md: 1 } }}
										height={{ xs: 13, md: 32 }}
										width={{ xs: 13, md: 32 }}
										src={'/assets/landingv3/verified.svg'}
									/>
									<Typography variant='body1' fontSize={{ xs: '14px', md: '34px' }}>
										4L+ Worker Profiles
									</Typography>
								</Stack>
								<Stack direction={'row'} alignItems={'flex-start'} spacing={{ xs: 0.8, md: 2 }}>
									<Box
										component={'img'}
										sx={{ mt: { xs: 0.5, md: 1 } }}
										height={{ xs: 13, md: 32 }}
										width={{ xs: 13, md: 32 }}
										src={'/assets/landingv3/verified.svg'}
									/>
									<Typography variant='body1' fontSize={{ xs: '14px', md: '34px' }}>
										<strong>Unlimited</strong> Workers ko <strong>FREE</strong> mai Hire karein
									</Typography>
								</Stack>
								<Stack direction={'row'} alignItems={'flex-start'} spacing={{ xs: 0.8, md: 2 }}>
									<Box
										component={'img'}
										sx={{ mt: { xs: 0.5, md: 1 } }}
										height={{ xs: 13, md: 32 }}
										width={{ xs: 13, md: 32 }}
										src={'/assets/landingv3/verified.svg'}
									/>
									<Typography variant='body1' fontSize={{ xs: '14px', md: '34px' }}>
										Lakhon ke Sub-Contracting Orders
									</Typography>
								</Stack>
							</Stack>
							<Stack pl={{ xs: 1, md: 0 }} mt={{ xs: '32px', md: '60px' }}>
								<Stack direction={'row'}>
									<Box
										component={'img'}
										height={{ xs: 26, md: 55 }}
										width={{ xs: 26, md: 55 }}
										src={'/assets/landingv3/contractorLogo.svg'}
									/>
									<Typography
										variant='h3'
										fontSize={{ xs: '12px', md: '25.5px' }}
										fontWeight={'800'}
										ml={{ xs: '4px', md: '8.5px' }}
										mr={{ xs: 2, md: 15 }}>
										ProjectHero Contractor App
									</Typography>
								</Stack>
								<Stack alignSelf={'flex-start'} mt={{ xs: '6px', md: '15px' }}>
									<Box
										component={'img'}
										width={{ xs: 135, md: 285 }}
										height={{ xs: 40, md: 84.5 }}
										src={'/assets/landingv3/googlePlay.svg'}
									/>
								</Stack>
							</Stack>
						</Stack>
						<Stack>
							<Box
								component={'img'}
								width={{ xs: 151, md: 352 }}
								height={{ xs: 320, md: 745 }}
								src={'/assets/landingv3/contractorMobile2.svg'}
							/>
						</Stack>
					</Stack>

					<Stack
						direction={'row'}
						sx={{
							backgroundImage: {
								xs: `url(${'/assets/landingv3/heroBackgroundMobile.png'})`,
								md: `url(${'/assets/landingv3/heroBackground.png'})`,
							},
							backgroundRepeat: 'no-repeat',
							backgroundPosition: { xs: '-150px 180%', md: '-600px 180px' },
						}}
						pt={{ xs: '155px', md: '470px' }}
						pb={{ xs: '138px', md: '477px' }}
						pl={{ xs: '18px', md: '272px' }}
						pr={{ xs: '18px', md: '236px' }}>
						<Stack>
							<Box
								component={'img'}
								width={{ xs: 151, md: 352 }}
								height={{ xs: 320, md: 745 }}
								src={'/assets/landingv3/heroMobile2.svg'}
							/>
						</Stack>
						<Stack pl={{ xs: '14px', md: '37px' }}>
							<Typography
								variant='h1'
								pl={{ xs: 1, md: 0 }}
								fontSize={{ xs: '32px', md: '80px' }}
								mr={{ xs: 5, md: 30 }}>
								नौकरी चाहिए?
							</Typography>
							<Stack
								mt={{ xs: '24px', md: '62px' }}
								spacing={{ xs: 0, md: 1.5 }}
								pl={{ xs: 1, md: 0 }}
								pr={{ xs: 0, md: '40px' }}>
								<Stack direction={'row'} alignItems={'flex-start'} spacing={{ xs: 0.8, md: 2 }}>
									<Box
										component={'img'}
										sx={{ mt: { xs: 0.5, md: 1 } }}
										height={{ xs: 13, md: 32 }}
										width={{ xs: 13, md: 32 }}
										src={'/assets/landingv3/verified.svg'}
									/>
									<Typography variant='body1' fontSize={{ xs: '14px', md: '34px' }}>
										कंस्ट्रक्शन लाइन की हज़ारों नौकरियां
									</Typography>
								</Stack>
								<Stack direction={'row'} alignItems={'flex-start'} spacing={{ xs: 0.8, md: 2 }}>
									<Box
										component={'img'}
										sx={{ mt: { xs: 0.5, md: 1 } }}
										height={{ xs: 13, md: 32 }}
										width={{ xs: 13, md: 32 }}
										src={'/assets/landingv3/verified.svg'}
									/>
									<Typography variant='body1' fontSize={{ xs: '14px', md: '34px' }}>
										सैलरी, लोकेशन और नौकरी की बाकी डिटेल्स ऐप पर
									</Typography>
								</Stack>
								<Stack direction={'row'} alignItems={'flex-start'} spacing={{ xs: 0.8, md: 2 }}>
									<Box
										component={'img'}
										sx={{ mt: { xs: 0.5, md: 1 } }}
										height={{ xs: 13, md: 32 }}
										width={{ xs: 13, md: 32 }}
										src={'/assets/landingv3/verified.svg'}
									/>
									<Typography variant='body1' fontSize={{ xs: '14px', md: '34px' }}>
										ठेकेदार से डायरेक्ट बात करें और काम पाएं
									</Typography>
								</Stack>
							</Stack>
							<Stack pl={{ xs: 1, md: 0 }} mt={{ xs: '32px', md: '60px' }}>
								<Stack direction={'row'}>
									<Box
										component={'img'}
										height={{ xs: 26, md: 55 }}
										width={{ xs: 26, md: 55 }}
										src={'/assets/landingv3/heroLogo.svg'}
									/>
									<Typography
										variant='h3'
										fontSize={{ xs: '12px', md: '25.5px' }}
										fontWeight={'800'}
										ml={{ xs: '4px', md: '8.5px' }}
										mr={{ xs: 4, md: 40 }}>
										ProjectHero Worker App
									</Typography>
								</Stack>
								<Stack alignSelf={'flex-start'} mt={{ xs: '6px', md: '15px' }}>
									<Box
										component={'img'}
										width={{ xs: 135, md: 285 }}
										height={{ xs: 40, md: 84.5 }}
										src={'/assets/landingv3/googlePlay.svg'}
									/>
								</Stack>
								<Typography
									variant='h3'
									fontSize={{ xs: '10px', md: '24px' }}
									mt={{ xs: '6px', md: '14px' }}
									ml={{ xs: 0, md: 5 }}>
									*ऐप हिंदी में भी उपलब्ध
								</Typography>
							</Stack>
						</Stack>
					</Stack>
				</Stack>
			</Stack>
		</>
		// <>
		// 	<Stack alignItems='center ' p={2}>
		// 		<ButtonGroup disableElevation fullWidth sx={{ maxWidth: 700 }}>
		// 			<Button
		// 				onClick={() => {
		// 					sendAnalytics({
		// 						action: 'HorizontalTabClick',
		// 						name: 'contractorTab',
		// 					})
		// 					setUserType('CONTRACTOR')
		// 				}}
		// 				fullWidth
		// 				variant={userType === 'CONTRACTOR' ? 'contained' : 'outlined'}
		// 				sx={{
		// 					':hover': {
		// 						backgroundColor: userType === 'CONTRACTOR' ? 'primary.light' : undefined,
		// 					},
		// 					border: '2px solid #000000',
		// 					borderRightWidth: '1px',
		// 					flexDirection: 'column',
		// 					color: userType === 'CONTRACTOR' ? '#000000' : '#000000',
		// 				}}>
		// 				<Typography variant='h4' fontWeight='bold'>
		// 					Worker chahiye?
		// 				</Typography>
		// 				<Typography variant='caption'>Job post karen </Typography>
		// 			</Button>
		// 			<Button
		// 				onClick={() => {
		// 					sendAnalytics({
		// 						action: 'HorizontalTabClick',
		// 						name: 'workerTab',
		// 					})
		// 					setUserType('WORKER')
		// 				}}
		// 				variant={userType === 'WORKER' ? 'contained' : 'outlined'}
		// 				fullWidth
		// 				sx={{
		// 					':hover': {
		// 						backgroundColor: userType === 'WORKER' ? 'primary.light' : undefined,
		// 					},
		// 					border: '2px solid #000000',
		// 					borderLeftWidth: '1px',
		// 					// backgroundColor: userType === 'WORKER' ? undefined : primary.darkGrey,

		// 					flexDirection: 'column',
		// 					color: userType === 'WORKER' ? '#000000' : '#000000',
		// 				}}>
		// 				<Typography variant='h4' fontWeight='bold'>
		// 					Naukri chahiye?
		// 				</Typography>
		// 				<Typography variant='caption'>App download karen</Typography>
		// 			</Button>
		// 		</ButtonGroup>
		// 	</Stack>
		// 	<Dialog open={videoPlayerPopper} fullWidth maxWidth={'xs'} onClose={() => setVideoPlayerPopper(false)}>
		// 		<Stack p={1} pt={0} alignItems='flex-end'>
		// 			<IconButton onClick={() => setVideoPlayerPopper(false)}>
		// 				<Close />
		// 			</IconButton>
		// 			<Paper
		// 				elevation={0}
		// 				onClick={() => {
		// 					sendAnalytics({
		// 						name: 'videoPlay',
		// 						action: 'ButtonClick',
		// 						metaData: {
		// 							origin: 'Home',
		// 						},
		// 					})
		// 				}}
		// 				sx={{
		// 					background: '#fcfcfc',
		// 					borderRadius: '10px',
		// 					'& .video-react .video-react-big-play-button': {
		// 						background: '#CD201F',
		// 						borderRadius: '10px',
		// 						height: '50px',
		// 						aspectRatio: '2 / 3',
		// 						borderColor: '#CD201F',
		// 						'&:hover': {
		// 							borderColor: '#CD201F',
		// 							background: '#CD201F',
		// 						},
		// 						'&:focus': {
		// 							borderColor: '#CD201F',
		// 							background: '#CD201F',
		// 						},
		// 						':before': {
		// 							color: '#fff',
		// 						},
		// 					},

		// 					'& .video-react-control-bar': {
		// 						borderRadius: '0px 0px 10px 10px',
		// 					},
		// 					'& .video-react-poster': {
		// 						borderRadius: '10px',
		// 						backgroundSize: 'cover',
		// 					},
		// 					'& .video-react': {
		// 						borderRadius: '10px',
		// 					},
		// 					'& .video-react-video': {
		// 						borderRadius: '10px',
		// 					},
		// 					width: '100%',
		// 					overflow: 'hidden',
		// 				}}>
		// 				<Player poster='/assets/icons/videoPoster.jpg'>
		// 					<source src={externalLinks.howItWorksVideoLink} />
		// 					<BigPlayButton position={'center'} />
		// 				</Player>
		// 			</Paper>
		// 		</Stack>
		// 	</Dialog>
		// 	<Section
		// 		boxSx={
		// 			{
		// 				// background: isMobile
		// 				// 	? 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.05) 100px, rgba(255,255,255,1) 100px, rgba(255,255,255,1) 100%)'
		// 				// 	: undefined,
		// 			}
		// 		}
		// 		sx={{ p: 2, pb: 3 }}>
		// 		<Grid container spacing={2}>
		// 			{userType === 'CONTRACTOR' && (
		// 				<Grid item xs={12} md={9} display={{ xs: 'flex', md: 'none' }}>
		// 					<Stack
		// 						justifyContent='space-between'
		// 						spacing={1}
		// 						flex={1}
		// 						direction={{ xs: 'row', md: 'column' }}>
		// 						<Typography variant={'h6'}>
		// 							India ka sabse bada
		// 							<Typography color='success.dark' variant='inherit'>
		// 								Construction worker platform.{' '}
		// 							</Typography>
		// 							<Typography variant={'h6'} fontSize={14}>
		// 								Adhik Jankari ke liye Video dekhen
		// 							</Typography>
		// 						</Typography>
		// 						<Box
		// 							onClick={() => setVideoPlayerPopper(true)}
		// 							sx={{
		// 								cursor: 'pointer',
		// 							}}>
		// 							<Image width={100} height={100} src={'/assets/landingv2/how-it-works.png'} />
		// 						</Box>
		// 					</Stack>
		// 				</Grid>
		// 			)}
		// 			{userType === 'WORKER' && (
		// 				<Grid item xs={12} md={9} display={{ xs: 'flex', md: 'none' }}>
		// 					<Stack justifyContent='space-between' spacing={2} direction={{ xs: 'row', md: 'column' }}>
		// 						<Typography variant={'h6'}>
		// 							Construction line ki{' '}
		// 							<Typography display='inline' color='success.dark' variant='inherit'>
		// 								hajaro naukriyo
		// 							</Typography>{' '}
		// 							me apply karen and{' '}
		// 							<Typography display='inline' color='success.dark' variant='inherit'>
		// 								seedhe contractor se baat karen!
		// 							</Typography>{' '}
		// 						</Typography>
		// 					</Stack>
		// 				</Grid>
		// 			)}
		// 			<Grid item xs={12} md={8.5} display={{ xs: 'none', md: 'flex' }}>
		// 				<Stack flex={1} spacing={3}>
		// 					<Paper
		// 						onClick={() => {
		// 							sendAnalytics({
		// 								name: 'videoPlay',
		// 								action: 'ButtonClick',
		// 								metaData: {
		// 									origin: 'Home',
		// 								},
		// 							})
		// 						}}
		// 						elevation={0}
		// 						sx={{
		// 							background: '#fcfcfc',
		// 							borderRadius: '10px',
		// 							'& .video-react .video-react-big-play-button': {
		// 								background: '#CD201F',
		// 								borderRadius: '10px',
		// 								height: '50px',
		// 								borderColor: '#CD201F',
		// 								'&:hover': {
		// 									borderColor: '#CD201F',
		// 									background: '#CD201F',
		// 								},
		// 								'&:focus': {
		// 									borderColor: '#CD201F',
		// 									background: '#CD201F',
		// 								},
		// 								':before': {
		// 									color: '#fff',
		// 								},
		// 							},

		// 							'& .video-react-control-bar': {
		// 								borderRadius: '0px 0px 10px 10px',
		// 							},
		// 							'& .video-react-poster': {
		// 								borderRadius: '10px',
		// 								backgroundSize: 'cover',
		// 							},
		// 							'& .video-react': {
		// 								borderRadius: '10px',
		// 							},
		// 							'& .video-react-video': {
		// 								borderRadius: '10px',
		// 							},
		// 							width: '80%',
		// 							overflow: 'hidden',
		// 						}}>
		// 						<Player poster='/assets/icons/videoPoster.jpg'>
		// 							<source src={externalLinks.howItWorksVideoLink} />
		// 							<BigPlayButton position={'center'} />
		// 						</Player>
		// 					</Paper>
		// 					{userType === 'CONTRACTOR' && (
		// 						<Typography maxWidth={'90%'} fontSize={28} variant='h2' fontWeight={700}>
		// 							India ka sabse bada
		// 							<Typography fontSize={28} variant='h2' color='success.dark'>
		// 								Construction worker platform.
		// 							</Typography>
		// 							Adhik Jankari ke liye Video dekhen
		// 						</Typography>
		// 					)}
		// 					{userType === 'WORKER' && (
		// 						<Typography maxWidth={'90%'} fontSize={28} variant='h2' fontWeight={700}>
		// 							Construction line ki{' '}
		// 							<Typography display='inline' fontSize={28} variant='h2' color='success.dark'>
		// 								hajaro naukriyo <br />
		// 							</Typography>
		// 							me apply karen and{' '}
		// 							<Typography display='inline' fontSize={28} variant='h2' color='success.dark'>
		// 								seedhe contractor
		// 							</Typography>{' '}
		// 							se baat karen!
		// 						</Typography>
		// 					)}
		// 					{!isMobile && userType === 'CONTRACTOR' && (
		// 						<Stack direction={'row'} spacing={2}>
		// 							<Stack
		// 								spacing={1}
		// 								sx={{
		// 									justifyContent: 'space-evenly',
		// 									'.dot': {
		// 										borderRadius: '50%',
		// 										width: '8px',
		// 										p: 0,
		// 										aspectRatio: '1 / 1',
		// 										border: '0px solid transparent',
		// 										backgroundColor: 'grey.A200',
		// 									},
		// 									'.active': {
		// 										backgroundColor: 'success.dark',
		// 									},
		// 								}}>
		// 								{verticalCarousel[1].current &&
		// 									[
		// 										...(
		// 											Array(
		// 												verticalCarousel[1].current.track.details.slides.length
		// 											) as any
		// 										).keys(),
		// 									].map((_, idx) => {
		// 										return (
		// 											<button
		// 												key={idx}
		// 												onClick={() => {
		// 													verticalCarousel[1].current?.moveToIdx(idx)
		// 													setVerticalState(idx)
		// 												}}
		// 												className={
		// 													'dot' + (verticalState === idx ? ' active' : '')
		// 												}></button>
		// 										)
		// 									})}
		// 							</Stack>
		// 							<Box
		// 								ref={verticalCarousel[0]}
		// 								className='keen-slider'
		// 								style={{ height: 50, maxWidth: 300 }}>
		// 								<Box className='keen-slider__slide number-slide1'>
		// 									<Stack direction='row' alignItems='center' spacing={2}>
		// 										<Image
		// 											height={50}
		// 											width={50}
		// 											src={'/assets/landingv2/icons/user.svg'}
		// 										/>
		// 										<Typography>
		// 											<strong>4 Lac+</strong> construction workers ka network
		// 										</Typography>
		// 									</Stack>
		// 								</Box>
		// 								<Box className='keen-slider__slide number-slide2'>
		// 									<Stack direction='row' alignItems='center' spacing={2}>
		// 										<Image
		// 											height={50}
		// 											width={50}
		// 											src={'/assets/landingv2/icons/call.svg'}
		// 										/>
		// 										<Typography>
		// 											<strong>Best workers</strong> aapko seedhe call karenge
		// 										</Typography>
		// 									</Stack>
		// 								</Box>
		// 								<Box className='keen-slider__slide number-slide3'>
		// 									<Stack direction='row' alignItems='center' spacing={2}>
		// 										<Image height={50} width={50} src={'/assets/landingv2/icons/hat.svg'} />
		// 										<Typography>
		// 											<strong>Apply karne wale workers</strong> ka number dashboard par
		// 											dekhen
		// 										</Typography>
		// 									</Stack>
		// 								</Box>
		// 							</Box>
		// 						</Stack>
		// 					)}
		// 				</Stack>
		// 			</Grid>

		// 			{userType === 'WORKER' ? (
		// 				<Grid item xs={12} md={3.5} container spacing={2}>
		// 					{/* <Grid item xs={12} md={6}>
		// 							<Stack direction={'column'}>
		// 								<Box mb={'14px'}>{homePage.heroApp.heading}</Box>
		// 								<Box mb={'40px'}>{homePage.heroApp.desc}</Box>
		// 								<List sx={{ color: '#fff' }}>
		// 									{homePage.heroApp.list.map((data, index) => {
		// 										return (
		// 											<ListItem key={index} sx={{ mb: '24px' }}>
		// 												<Stack direction={'row'} spacing={1.5} alignItems={'center'}>
		// 													<FiberManualRecordIcon
		// 														sx={{
		// 															fontSize: '8px',
		// 														}}
		// 													/>
		// 													<Typography
		// 														variant='h4'
		// 														sx={{
		// 															fontWeight: 400,
		// 															fontSize: { md: '20px', xs: '16px' },
		// 															fontFamily: 'Karla , sans-serif',
		// 														}}>
		// 														{data.item}
		// 													</Typography>
		// 												</Stack>
		// 											</ListItem>
		// 										)
		// 									})}
		// 								</List>
		// 								<Typography
		// 									variant='h4'
		// 									color={'#fff'}
		// 									sx={{
		// 										fontWeight: 400,
		// 										fontSize: { md: '24px', xs: '16px' },
		// 										fontFamily: 'Karla , sans-serif',
		// 									}}>
		// 									Download Now!
		// 								</Typography>
		// 								<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
		// 									<a
		// 										href={externalLinks.heroApp}
		// 										onClick={() => {
		// 											sendAnalytics({
		// 												name: 'heroAppPlayStore',
		// 												action: 'ButtonClick',
		// 												metaData: {
		// 													origin: 'Hero App section',
		// 												},
		// 											})
		// 										}}
		// 										target='_blank'
		// 										rel='noopener noreferrer'>
		// 										<img src='/assets/landingv2/heroSection/googlebutton.svg' alt='' />
		// 									</a>
		// 								</Box>
		// 							</Stack>
		// 						</Grid> */}
		// 					<Grid item xs={12} md={12}>
		// 						<Card sx={{ backgroundColor: '#000000', p: 2 }}>
		// 							<Typography variant='h6' fontSize={14} color='common.white'>
		// 								Apni skill ke hisab se{' '}
		// 								<Typography display='inline' fontSize={'inherit'} color='primary.main'>
		// 									badhiya naukari dhondhne k liye
		// 								</Typography>{' '}
		// 								ProjectHero app download karein!
		// 							</Typography>
		// 							<Box mt={3}>
		// 								<LinkButton
		// 									variant='contained'
		// 									sx={{ px: 4 }}
		// 									href={
		// 										externalLinks.heroApp +
		// 										(getCookie('utmParams') || externalLinks.fixUtmForApp)
		// 									}
		// 									onClick={() => {
		// 										DataLayerPush({ event: 'book_workers_now_top' })
		// 										sendAnalytics({
		// 											name: 'postJobNow',
		// 											action: 'ButtonClick',
		// 											metaData: {
		// 												origin: 'How it Works section',
		// 											},
		// 										})
		// 									}}>
		// 									Download App Now
		// 								</LinkButton>
		// 							</Box>

		// 							<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
		// 								<a
		// 									href={
		// 										externalLinks.heroApp +
		// 										(getCookie('utmParams') || externalLinks.fixUtmForApp)
		// 									}
		// 									onClick={() => {
		// 										sendAnalytics({
		// 											name: 'heroAppPlayStore',
		// 											action: 'ButtonClick',
		// 											metaData: {
		// 												origin: 'Hero section',
		// 											},
		// 										})
		// 									}}
		// 									target='_blank'
		// 									rel='noopener noreferrer'>
		// 									<img
		// 										width='100px'
		// 										src='/assets/landingv2/heroSection/googlebutton.svg'
		// 										alt=''
		// 									/>
		// 								</a>
		// 							</Box>
		// 							<Stack direction='row' sx={{ mb: '-100px', overflow: 'hidden' }}>
		// 								<Box
		// 									sx={{
		// 										maxWidth: '100%',
		// 										maxHeight: '100%',
		// 										mr: '-25%',
		// 										zIndex: '4',
		// 									}}>
		// 									<img
		// 										width={'100%'}
		// 										height={'100%'}
		// 										src='/assets/landingv2/heroSection/mobile2.svg'
		// 										alt=''
		// 									/>
		// 								</Box>
		// 								<Box
		// 									sx={{
		// 										maxWidth: '100%',
		// 										maxHeight: '100%',
		// 										zIndex: '2',
		// 										mt: '15%',

		// 										mb: { md: 1.8, xs: 1.2 },
		// 									}}>
		// 									<img
		// 										width={'100%'}
		// 										height={'100%'}
		// 										src='/assets/landingv2/heroSection/mobile1.svg'
		// 										alt=''
		// 									/>
		// 								</Box>
		// 							</Stack>
		// 						</Card>
		// 					</Grid>
		// 				</Grid>
		// 			) : (
		// 				<Grid item xs={12} md={3.5} justifyContent='center' id='book-worker'>
		// 					<CreateBookingCard />
		// 				</Grid>
		// 			)}
		// 			{userType === 'CONTRACTOR' && (
		// 				<>
		// 					{isMobile && (
		// 						<Grid item xs={12} display={{ xs: 'flex', md: 'none' }} alignItems='center' gap={1}>
		// 							<Stack
		// 								spacing={1}
		// 								sx={{
		// 									justifyContent: 'space-evenly',
		// 									'.dot': {
		// 										borderRadius: '50%',
		// 										aspectRatio: '1 / 1',
		// 										width: '8px',
		// 										p: 0,
		// 										border: '0px solid transparent',
		// 										backgroundColor: 'grey.A200',
		// 									},
		// 									'.active': {
		// 										backgroundColor: 'success.dark',
		// 									},
		// 								}}>
		// 								{verticalCarousel[1].current &&
		// 									[
		// 										...(
		// 											Array(
		// 												verticalCarousel[1].current.track.details.slides.length
		// 											) as any
		// 										).keys(),
		// 									].map((_, idx) => {
		// 										return (
		// 											<button
		// 												key={idx}
		// 												onClick={() => {
		// 													verticalCarousel[1].current?.moveToIdx(idx)
		// 													setVerticalState(idx)
		// 												}}
		// 												className={
		// 													'dot' + (verticalState === idx ? ' active' : '')
		// 												}></button>
		// 										)
		// 									})}
		// 							</Stack>
		// 							<Box ref={verticalCarousel[0]} className='keen-slider' style={{ height: 50 }}>
		// 								<Box className='keen-slider__slide number-slide1'>
		// 									<Stack direction='row' alignItems='center' spacing={2}>
		// 										<Box
		// 											component='img'
		// 											height={50}
		// 											width={50}
		// 											src={'/assets/landingv2/icons/user.svg'}></Box>
		// 										<Typography>
		// 											<strong>4 Lac+</strong> construction workers ka network
		// 										</Typography>
		// 									</Stack>
		// 								</Box>
		// 								<Box className='keen-slider__slide number-slide2'>
		// 									<Stack direction='row' alignItems='center' spacing={2}>
		// 										<Box
		// 											component='img'
		// 											height={50}
		// 											width={50}
		// 											src={'/assets/landingv2/icons/call.svg'}></Box>
		// 										<Typography>
		// 											<strong>Best workers</strong> aapko seedhe call karenge
		// 										</Typography>
		// 									</Stack>
		// 								</Box>
		// 								<Box className='keen-slider__slide number-slide3'>
		// 									<Stack direction='row' alignItems='center' spacing={2}>
		// 										<Box
		// 											component='img'
		// 											height={50}
		// 											width={50}
		// 											src={'/assets/landingv2/icons/hat.svg'}></Box>
		// 										<Typography>
		// 											<strong>Apply karne wale workers</strong> ka number dashboard par
		// 											dekhen
		// 										</Typography>
		// 									</Stack>
		// 								</Box>
		// 							</Box>
		// 						</Grid>
		// 					)}
		// 				</>
		// 			)}
		// 		</Grid>
		// 	</Section>
		// 	{userType === 'CONTRACTOR' && (
		// 		<>
		// 			<Section backgroundColor='#000000'>
		// 				<Box ref={sliderRef} className='keen-slider'>
		// 					{jobSection.tagLine.map((item, index, arr) => (
		// 						<Typography
		// 							sx={{ minWidth: 'fit-content' }}
		// 							display='flex'
		// 							alignItems='center'
		// 							key={index}
		// 							className='keen-slider__slide'>
		// 							<Typography noWrap variant='h6' color='common.white'>
		// 								{item}
		// 							</Typography>
		// 							<Circle sx={{ fontSize: 8, color: 'common.white', mx: 2 }} />
		// 						</Typography>
		// 					))}
		// 				</Box>
		// 				<Stack p={3}>
		// 					<Typography
		// 						variant='h2'
		// 						color='common.white'
		// 						fontWeight={600}
		// 						fontSize={{ md: '32px', xs: '24px' }}>
		// 						Explore{' '}
		// 						<Typography
		// 							variant='h2'
		// 							color='primary'
		// 							display='inline'
		// 							fontWeight={600}
		// 							fontSize={{ md: '32px', xs: '24px' }}>
		// 							Job Categories{' '}
		// 						</Typography>
		// 						Post your job for{' '}
		// 						<Typography
		// 							variant='h2'
		// 							color='primary'
		// 							display='inline'
		// 							fontWeight={600}
		// 							fontSize={{ md: '32px', xs: '24px' }}>
		// 							Free
		// 						</Typography>
		// 					</Typography>
		// 				</Stack>

		// 				<CarouselV2
		// 					componentPerView={isMobile ? (isTab ? 6 : 3) : 7}
		// 					mobileStepperPosition='center'
		// 					icons={{
		// 						left: (
		// 							<ArrowCircleLeftOutlined
		// 								sx={{
		// 									color: 'common.white',
		// 									fontSize: 40,
		// 									position: !isMobile ? '' : 'absolute',
		// 									top: !isMobile ? '' : '70px',
		// 									left: !isMobile ? '' : '8px',
		// 								}}
		// 							/>
		// 						),
		// 						right: (
		// 							<ArrowCircleRightOutlined
		// 								sx={{
		// 									color: 'common.white',
		// 									fontSize: 40,
		// 									position: !isMobile ? '' : 'absolute',
		// 									top: !isMobile ? '' : '70px',
		// 									right: !isMobile ? '' : '8px',
		// 								}}
		// 							/>
		// 						),
		// 					}}
		// 					items={jobSection.jobs.map((item) => (
		// 						<Button
		// 							onClick={(e) => setJobTypeForCarousal(item.value)}
		// 							variant='text'
		// 							value={item.value}
		// 							key={item.label}
		// 							sx={(theme) => ({
		// 								color: 'common.white',
		// 								borderRadius: 0.5,
		// 								textTransform: 'none',
		// 								borderBottom:
		// 									jobTypeForCarousal === item.value
		// 										? `5px solid ${theme.palette.primary.main}`
		// 										: undefined,
		// 							})}>
		// 							<JobCategoryCard src={item.image} label={item.label} />
		// 						</Button>
		// 					))}
		// 					slideDelay={5000000}
		// 				/>
		// 				<CarouselV2
		// 					mobileStepperPosition={isMobile ? 'bottom' : 'center'}
		// 					componentPerView={1}
		// 					items={sliceIntoChunks(
		// 						HeroDiscoveryMetaData[jobTypeForCarousal],
		// 						isMobile ? (isTab ? 4 : 2) : 6
		// 					).map((slide, index) => {
		// 						return (
		// 							<Grid key={index} container py={3} spacing={2}>
		// 								{slide.map((item: any) => (
		// 									<Grid xs={11} mx={'auto'} sm={6} md={6} lg={4} item key={item.workerId}>
		// 										<WorkerCard worker={item} />
		// 									</Grid>
		// 								))}
		// 							</Grid>
		// 						)
		// 					})}
		// 					slideDelay={5000}
		// 				/>
		// 			</Section>

		// 			<Section backgroundColor='#F7F7F7' id='how-it-works'>
		// 				<Box pt={'24px'} pb={'66px'}>
		// 					<Stack direction={'column'} mb={'32px'}>
		// 						<Typography variant='h1' fontWeight={600} fontSize={{ md: '32px', xs: '24px' }}>
		// 							{homePage.howItWorksSection.heading}
		// 						</Typography>
		// 						<Typography variant='h4' fontWeight={400} fontSize={{ md: '20px', xs: '12px' }}>
		// 							{homePage.howItWorksSection.subHeading}
		// 						</Typography>
		// 					</Stack>
		// 					<Box mb={'66px'}>
		// 						<LinkButton
		// 							variant='contained'
		// 							sx={{ px: { xs: 7, md: 11 }, py: { xs: 1, md: 2 }, fontSize: { xs: 16, md: 20 } }}
		// 							href={homePage.howItWorksSection.buttonText.link}
		// 							onClick={() => {
		// 								DataLayerPush({ event: 'book_workers_now_top' })
		// 								sendAnalytics({
		// 									name: 'postJobNow',
		// 									action: 'ButtonClick',
		// 									metaData: {
		// 										origin: 'How it Works section',
		// 									},
		// 								})
		// 							}}>
		// 							{homePage.howItWorksSection.buttonText.text}
		// 						</LinkButton>
		// 					</Box>
		// 					<Box
		// 						sx={{
		// 							width: '100%',
		// 						}}>
		// 						<Box
		// 							component={'img'}
		// 							sx={{
		// 								content: {
		// 									xs: `url(${'/assets/landingv2/heroSection/howitworksMobile.svg'})`,
		// 									md: `url(${'/assets/landingv2/heroSection/howitworks.svg'})`,
		// 								},
		// 								width: '100%',
		// 							}}
		// 							loading='lazy'
		// 						/>
		// 					</Box>
		// 				</Box>
		// 			</Section>

		// 			<Section backgroundColor='#000'>
		// 				<Box
		// 					sx={{
		// 						padding: '46px 0 70px 0',
		// 					}}>
		// 					<Grid
		// 						container
		// 						sx={{
		// 							flexDirection: { xs: 'column', md: 'row' },
		// 						}}>
		// 						<Grid
		// 							item
		// 							md={6}
		// 							xs={12}
		// 							sx={{
		// 								mb: { xs: 6 },
		// 							}}>
		// 							<Stack direction={'column'} spacing={4}>
		// 								<Box>{homePage.whyYouShouldHire.left.heading}</Box>
		// 								<Box>
		// 									<LinkButton
		// 										sx={{
		// 											px: { xs: 7, md: 11 },
		// 											py: { xs: 1, md: 2 },
		// 											fontSize: { xs: 16, md: 20 },
		// 											backgroundColor: 'common.white',
		// 											borderColor: 'common.white',
		// 										}}
		// 										href={homePage.howItWorksSection.buttonText.link}
		// 										onClick={() => {
		// 											DataLayerPush({
		// 												event: 'book_workers_now_middle',
		// 											})
		// 											sendAnalytics({
		// 												name: 'postJobNow',
		// 												action: 'ButtonClick',
		// 												metaData: {
		// 													origin: 'why You Should Hire section',
		// 												},
		// 											})
		// 										}}>
		// 										{homePage.whyYouShouldHire.left.buttonText.text}
		// 									</LinkButton>
		// 								</Box>
		// 							</Stack>
		// 						</Grid>

		// 						<Grid item xs={6}>
		// 							<Grid
		// 								container
		// 								spacing={4}
		// 								sx={{
		// 									width: { xs: 'fit-content' },
		// 								}}>
		// 								{homePage.whyYouShouldHire.right.item.map((data, index) => {
		// 									return (
		// 										<Grid key={index} item xs={12} md={6}>
		// 											<Stack direction={'row'} spacing={2} width={'310px'}>
		// 												<Box sx={homePage.whyYouShouldHire.right.indexSx}>
		// 													<Typography
		// 														variant='h2'
		// 														color={'#EFC430'}
		// 														fontSize={{ md: '28px', xs: '21px' }}
		// 														fontWeight={600}>
		// 														0{index + 1}
		// 													</Typography>
		// 												</Box>
		// 												<Box>
		// 													<Stack
		// 														direction={'column'}
		// 														sx={{ color: '#fff' }}
		// 														spacing={2}>
		// 														<Typography
		// 															variant='h4'
		// 															sx={{
		// 																color: homePage.whyYouShouldHire.right
		// 																	.itemTextColor,
		// 															}}
		// 															fontSize={{ md: '24px', xs: '16px' }}
		// 															fontWeight={500}>
		// 															{data.heading}
		// 														</Typography>
		// 														<Typography
		// 															variant='h5'
		// 															fontSize={{ md: '16px', xs: '12px' }}
		// 															fontWeight={400}>
		// 															{data.desc}
		// 														</Typography>
		// 													</Stack>
		// 												</Box>
		// 											</Stack>
		// 										</Grid>
		// 									)
		// 								})}
		// 							</Grid>
		// 						</Grid>
		// 					</Grid>
		// 				</Box>
		// 			</Section>
		// 			<Section
		// 				backgroundColor='#F7F7F7'
		// 				boxSx={{
		// 					background: !isMobile
		// 						? 'linear-gradient(100deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 51%, rgba(246,242,225,1) 51%, rgba(246,242,225,1) 100%)'
		// 						: undefined,
		// 				}}
		// 				sx={{
		// 					backgroundSize: { xs: '95%', md: '50%' },
		// 					backgroundRepeat: 'no-repeat',
		// 					backgroundImage: {
		// 						md: `url(${'/assets/landingv2/heroSection/heroAdvantage.svg'})`,
		// 						xs: `url(${'/assets/landingv2/heroSection/heroAdvantageMobile.svg'})`,
		// 					},
		// 					backgroundPosition: { md: 'right', xs: 'right bottom' },
		// 					minHeight: { md: '600px', xs: '880px' },
		// 				}}>
		// 				<Box
		// 					sx={{
		// 						p: { xs: '20px 0px', md: '46px 0px' },
		// 						overflowX: 'hidden',
		// 					}}>
		// 					<Grid container spacing={8}>
		// 						<Grid item xs={12} md={6}>
		// 							<Stack direction={'column'} spacing={4}>
		// 								<Stack direction={'column'} spacing={2}>
		// 									<Box>{homePage.HeroAdvantage.Heading}</Box>
		// 									<Box>{homePage.HeroAdvantage.subHeading}</Box>
		// 								</Stack>
		// 								<Box>
		// 									<LinkButton
		// 										href={homePage.HeroAdvantage.buttonText.link}
		// 										sx={{
		// 											px: { xs: 7, md: 11 },
		// 											py: { xs: 1, md: 2 },
		// 											fontSize: { xs: 16, md: 20 },
		// 										}}
		// 										// href='/login'
		// 										onClick={() => {
		// 											DataLayerPush({
		// 												event: 'book_workers_now_bottom',
		// 											})
		// 											sendAnalytics({
		// 												name: 'postJobNow',
		// 												action: 'ButtonClick',
		// 												metaData: {
		// 													origin: 'Hero Advantage section',
		// 												},
		// 											})
		// 										}}>
		// 										{homePage.HeroAdvantage.buttonText.text}
		// 									</LinkButton>
		// 								</Box>
		// 							</Stack>
		// 						</Grid>
		// 						<Grid item xs={12} md={6}></Grid>
		// 					</Grid>
		// 				</Box>
		// 			</Section>

		// 			<Section backgroundColor='#000'>
		// 				<Box
		// 					sx={{
		// 						p: '46px 0 60px 0',
		// 					}}>
		// 					<Grid container spacing={2}>
		// 						<Grid item xs={12} md={6}>
		// 							<Stack direction={'column'}>
		// 								<Box mb={'14px'}>{homePage.heroApp.heading}</Box>
		// 								<Box mb={'40px'}>{homePage.heroApp.desc}</Box>
		// 								<List sx={{ color: '#fff' }}>
		// 									{homePage.heroApp.list.map((data, index) => {
		// 										return (
		// 											<ListItem key={index} sx={{ mb: '24px' }}>
		// 												<Stack direction={'row'} spacing={1.5} alignItems={'center'}>
		// 													<FiberManualRecordIcon
		// 														sx={{
		// 															fontSize: '8px',
		// 														}}
		// 													/>
		// 													<Typography
		// 														variant='h4'
		// 														sx={{
		// 															fontWeight: 400,
		// 															fontSize: { md: '20px', xs: '16px' },
		// 															fontFamily: 'Karla , sans-serif',
		// 														}}>
		// 														{data.item}
		// 													</Typography>
		// 												</Stack>
		// 											</ListItem>
		// 										)
		// 									})}
		// 								</List>
		// 								<Typography
		// 									variant='h4'
		// 									color={'#fff'}
		// 									sx={{
		// 										fontWeight: 400,
		// 										fontSize: { md: '24px', xs: '16px' },
		// 										fontFamily: 'Karla , sans-serif',
		// 									}}>
		// 									Download Now!
		// 								</Typography>
		// 								<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
		// 									<a
		// 										href={
		// 											externalLinks.heroApp +
		// 											(getCookie('utmParams') || externalLinks.fixUtmForApp)
		// 										}
		// 										onClick={() => {
		// 											sendAnalytics({
		// 												name: 'heroAppPlayStore',
		// 												action: 'ButtonClick',
		// 												metaData: {
		// 													origin: 'Hero App section',
		// 												},
		// 											})
		// 										}}
		// 										target='_blank'
		// 										rel='noopener noreferrer'>
		// 										<img
		// 											src='/assets/landingv2/heroSection/googlebutton.svg'
		// 											alt=''
		// 											loading='lazy'
		// 										/>
		// 									</a>
		// 								</Box>
		// 							</Stack>
		// 						</Grid>
		// 						<Grid item xs={12} md={6}>
		// 							<Stack direction={'row'} justifyContent={'center'} alignItems='flex-end'>
		// 								<Box sx={{ maxWidth: '75%', maxHeight: '100%', mr: '-25%', zIndex: '4' }}>
		// 									<img
		// 										width={'100%'}
		// 										height={'100%'}
		// 										src='/assets/landingv2/heroSection/mobile2.svg'
		// 										alt=''
		// 										loading='lazy'
		// 									/>
		// 								</Box>
		// 								<Box
		// 									sx={{
		// 										maxWidth: '65%',
		// 										maxHeight: '90%',
		// 										zIndex: '2',
		// 										mb: { md: 1.8, xs: 1.2 },
		// 									}}>
		// 									<img
		// 										width={'100%'}
		// 										height={'100%'}
		// 										src='/assets/landingv2/heroSection/mobile1.svg'
		// 										alt=''
		// 										loading='lazy'
		// 									/>
		// 								</Box>
		// 							</Stack>
		// 						</Grid>
		// 					</Grid>
		// 				</Box>
		// 			</Section>

		// 			{/* what are you section  */}

		// 			<Section backgroundColor='#F7F7F7'>
		// 				<Box
		// 					sx={{
		// 						padding: '46px 0px',
		// 						userSelect: 'none',
		// 					}}>
		// 					<Stack
		// 						direction={'column'}
		// 						spacing={4}
		// 						sx={(theme) => ({
		// 							width: '100%',
		// 							'.leftQuote': { position: 'absolute', zIndex: -1, top: -40, left: -60 },
		// 							'.rightQuote': { position: 'absolute', bottom: -30, right: 0 },
		// 							'.helmet': {
		// 								marginRight: '20%',
		// 							},
		// 							[theme.breakpoints.down('md')]: {
		// 								'.leftQuote': { display: 'none' },
		// 								'.rightQuote': { display: 'none' },
		// 								'.helmet': { display: 'none' },
		// 							},
		// 						})}>
		// 						<Stack direction='row' justifyContent={'space-between'}>
		// 							{homePage.customerReview.heading}
		// 							<img className='helmet' src='/assets/icons/backgrounds/Helmet.svg' loading='lazy' />
		// 						</Stack>
		// 						<CarouselV2
		// 							componentPerView={1}
		// 							items={homePage.customerReview.cards.map((item, index) => {
		// 								return (
		// 									<Stack
		// 										key={index}
		// 										py={5}
		// 										mx={2}
		// 										position='relative'
		// 										direction={'row'}
		// 										justifyContent={'center'}>
		// 										<Card
		// 											sx={(theme) => ({
		// 												display: 'flex',
		// 												flexDirection: { sx: 'column', md: 'row' },
		// 												maxWidth: 800,
		// 												zIndex: 12,
		// 												position: 'relative',
		// 												overflow: 'visible',
		// 												backgroundColor: theme.palette.primary.main,
		// 											})}>
		// 											<img
		// 												className='leftQuote'
		// 												src='/assets/landingv2/icons/quoteup.svg'
		// 												loading='lazy'
		// 											/>
		// 											<img
		// 												className='rightQuote'
		// 												src='/assets/landingv2/icons/quotedown.svg'
		// 												loading='lazy'
		// 											/>

		// 											<Stack
		// 												height={{ xs: 450, md: 350 }}
		// 												spacing={3}
		// 												p={4}
		// 												alignItems='center'
		// 												justifyContent='center'>
		// 												<Typography
		// 													textAlign='center'
		// 													variant='h5'
		// 													fontSize={{ xs: '12px', md: '16px' }}
		// 													fontWeight='500'
		// 													color={primary.properDark}>
		// 													{item.testimonial}
		// 												</Typography>
		// 												<Typography
		// 													textAlign='center'
		// 													variant='h5'
		// 													fontSize={{ xs: '14px', md: '16px' }}
		// 													fontWeight='600'
		// 													color={primary.properDark}>
		// 													- {item.by}
		// 												</Typography>
		// 											</Stack>
		// 										</Card>
		// 									</Stack>
		// 								)
		// 							})}
		// 						/>

		// 						<Stack
		// 							direction={'row'}
		// 							spacing={2}
		// 							justifyContent={'space-between'}
		// 							sx={{
		// 								overflowX: 'scroll',
		// 								width: '100%',
		// 								mt: '50px',
		// 								'&::-webkit-scrollbar': {
		// 									display: 'none',
		// 								},
		// 							}}>
		// 							{homePage.customerReview.ImageList.map((val, index) => {
		// 								return (
		// 									<ListItem key={index}>
		// 										<img src={val.src} alt='' loading='lazy' />
		// 									</ListItem>
		// 								)
		// 							})}
		// 						</Stack>
		// 					</Stack>
		// 				</Box>
		// 			</Section>
		// 		</>
		// 	)}
		// </>
	)
}
