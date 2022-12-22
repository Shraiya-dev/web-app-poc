import { Box, Stack, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { Section, externalLinks, getCookie, sendAnalytics } from 'sdk'

const workerImages = [
	'/assets/landingv3/worker-01.png',
	'/assets/landingv3/worker-02.png',
	'/assets/landingv3/worker-03.png',
	'/assets/landingv3/worker-04.png',
	'/assets/landingv3/worker-05.png',
]

const contractorImages = [
	'/assets/landingv3/contractor-01.png',
	'/assets/landingv3/contractor-02.png',
	'/assets/landingv3/contractor-03.png',
	'/assets/landingv3/contractor-04.png',
	'/assets/landingv3/contractor-05.png',
]
export const Home = () => {
	const [counter, setCounter] = useState(0)
	useEffect(() => {
		const interval = setInterval(() => setCounter((p) => (p + 1) % 5), 3000)
		return () => clearInterval(interval)
	}, [])

	return (
		<>
			<Section
				boxSx={{
					backgroundImage: {
						xs: `url(${'/assets/landingv3/contractorBackgroundMobile.png'})`,
						md: `url(${'/assets/landingv3/contractorBackground.png'})`,
					},
					backgroundSize: { xs: '160%', md: '90%' },
					backgroundPositionX: { xs: '-80px', md: '250px' },
					backgroundPositionY: { xs: '160px', md: '-150px' },
					pb: { xs: 15, md: 20 },
				}}>
				<Stack alignItems={'center'}>
					<Typography
						variant='h6'
						fontSize={{ xs: '22px', md: '40px' }}
						pt={{ md: '46px' }}
						sx={{ maxWidth: { xs: '100%', md: '60%' } }}
						textAlign={'center'}>
						India’s Largest & Most Trusted Construction Platform
					</Typography>
					<Box mt={{ xs: '23px', md: '25px' }} alignSelf={'center'}>
						<Box component={'img'} width={{ xs: 220, md: 418 }} src={'/assets/landingv3/divider.svg'} />
					</Box>
					<Stack
						direction={'row'}
						maxWidth={{ xs: '100%', md: '60%' }}
						mt={{ xs: '38px', md: '60px' }}
						spacing={2}>
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
								<Stack
									component={'a'}
									href={
										externalLinks.contractorApp +
										(getCookie('utmParams') || externalLinks.fixUtmForApp)
									}
									onClick={() => {
										sendAnalytics({
											name: 'contractorAppPlayStore',
											action: 'ButtonClick',
											metaData: {
												origin: 'home',
											},
										})
									}}
									target='_blank'
									rel='noopener noreferrer'
									alignSelf={'flex-start'}
									mt={{ xs: '6px', md: '15px' }}>
									<Box
										component={'img'}
										width={{ xs: 135, md: 285 }}
										height={{ xs: 40, md: 84.5 }}
										src={'/assets/landingv3/googlePlay.svg'}
									/>
								</Stack>
							</Stack>
						</Stack>
						<Stack
							component={'a'}
							href={externalLinks.contractorApp + (getCookie('utmParams') || externalLinks.fixUtmForApp)}
							onClick={() => {
								sendAnalytics({
									name: 'contractorAppPlayStore',
									action: 'ButtonClick',
									metaData: {
										origin: 'home',
									},
								})
							}}
							target='_blank'
							rel='noopener noreferrer'>
							<Box
								width={{ xs: 151, md: 352 }}
								height={{ xs: 320, md: 745 }}
								sx={{
									backgroundImage: `url(${contractorImages[counter]})`,
									backgroundSize: 'contain',
									transition: 'all ease  0.3s',
								}}
							/>
						</Stack>
					</Stack>
				</Stack>
			</Section>
			<Section
				boxSx={{
					backgroundImage: {
						xs: `url(${'/assets/landingv3/heroBackgroundMobile.png'})`,
						md: `url(${'/assets/landingv3/heroBackground.png'})`,
					},
					backgroundSize: { md: '100%' },
					backgroundPositionX: { xs: '-150px', md: '-150px' },
					backgroundPositionY: { md: '-200px' },
					py: { xs: 10, md: 20 },
					pb: { md: 40 },
				}}>
				<Stack>
					<Stack
						direction='row'
						sx={{ maxWidth: { xs: '100%', md: '60%' }, alignSelf: 'center' }}
						spacing={2}>
						<Stack
							component={'a'}
							href={externalLinks.heroApp + (getCookie('utmParams') || externalLinks.fixUtmForApp)}
							onClick={() => {
								sendAnalytics({
									name: 'heroAppPlayStore',
									action: 'ButtonClick',
									metaData: {
										origin: 'home',
									},
								})
							}}
							target='_blank'
							rel='noopener noreferrer'>
							<Box
								width={{ xs: 151, md: 352 }}
								height={{ xs: 320, md: 745 }}
								sx={{
									backgroundImage: `url(${workerImages[counter]})`,
									backgroundSize: 'contain',
									transition: 'all ease  0.3s',
								}}
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
								<Stack
									component={'a'}
									href={
										externalLinks.heroApp + (getCookie('utmParams') || externalLinks.fixUtmForApp)
									}
									onClick={() => {
										sendAnalytics({
											name: 'heroAppPlayStore',
											action: 'ButtonClick',
											metaData: {
												origin: 'home',
											},
										})
									}}
									target='_blank'
									rel='noopener noreferrer'
									alignSelf={'flex-start'}
									mt={{ xs: '6px', md: '15px' }}>
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
			</Section>
		</>
	)
}
