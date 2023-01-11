import { Box, Stack, Typography } from '@mui/material'
import { Section, externalLinks, getCookie, sendAnalytics, useMobile } from 'sdk'

export const Home = () => {
	const isMobile = useMobile()
	return (
		<>
			<Section
				sx={{
					backgroundImage: {
						xs: `url(${'/assets/landingv3/mob-bg-top.png'}), url(${'/assets/landingv3/mob-bg-bottom.png'})`,
						md: `url(${'/assets/landingv3/web-bg-top.png'}), url(${'/assets/landingv3/web-bg-bottom.png'})`,
					},
					backgroundSize: { xs: '120vw', md: '90%' },
					backgroundPositionX: { xs: '80%,40%', md: '64%,40%' },
					backgroundPositionY: { xs: '0vw,120vw', md: '-55px,78%' },
					backgroundRepeat: 'no-repeat',
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
					pt: { xs: 4, md: 10 },
				}}>
				<Stack direction='row' sx={{ maxWidth: { xs: '100%', md: '72%' }, alignSelf: 'center' }} spacing={2}>
					<Stack pr={{ xs: '14px', md: '37px' }}>
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
							pr={{ xs: 0, md: 0 }}>
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
						<Stack pl={{ xs: 1, md: 0 }} mt={{ xs: '32px', md: '60px' }} mb={10}>
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
									mr={{ xs: 4, md: 30 }}>
									ProjectHero Worker App
								</Typography>
							</Stack>
							<Stack
								component={'a'}
								href={
									(isMobile ? externalLinks.heroDeepLinkApp : externalLinks.heroPlayStoreApp) +
									(getCookie('utmParams') || externalLinks.fixUtmForApp)
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
					<Stack
						component={'a'}
						href={
							(isMobile ? externalLinks.heroDeepLinkApp : externalLinks.heroPlayStoreApp) +
							(getCookie('utmParams') || externalLinks.fixUtmForApp)
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
						rel='noopener noreferrer'>
						<Box
							width={{ xs: 151, md: 352 }}
							height={{ xs: 320, md: 745 }}
							sx={{
								backgroundImage: `url(${'/assets/landingv3/naukriChaiye.gif'})`,
								backgroundSize: 'contain',
								transition: 'all ease  0.3s',
							}}
						/>
					</Stack>
				</Stack>
				<Stack mt={{ md: 20 }} mb={{ md: 20 }} alignItems={'center'}>
					<Stack
						direction={'row'}
						maxWidth={{ xs: '100%', md: '85%' }}
						mt={{ xs: '38px', md: '60px' }}
						spacing={2}>
						<Stack
							component={'a'}
							href={
								(isMobile
									? externalLinks.contractorDeepLinkApp
									: externalLinks.contractorPlayStoreApp) +
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
							rel='noopener noreferrer'>
							<Box
								ml={{ xs: 0, md: 0 }}
								width={{ xs: 151, md: 352 }}
								height={{ xs: 320, md: 745 }}
								sx={{
									backgroundImage: `url(${'/assets/landingv3/workerChaiye.gif'})`,
									backgroundSize: 'contain',
									transition: 'all ease  0.3s',
								}}
							/>
						</Stack>
						<Stack pt={{ xs: '21px', md: '39px' }} pl={{ xs: 0, md: '37px' }}>
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
										(isMobile
											? externalLinks.contractorDeepLinkApp
											: externalLinks.contractorPlayStoreApp) +
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
					</Stack>
				</Stack>
				<Stack
					alignItems={'center'}
					mx='auto'
					mt={{ xs: 20, md: 10 }}
					maxWidth={{ xs: '100%', md: '60%' }}
					spacing={2}>
					<Box alignSelf={'center'}>
						<Box component={'img'} width={{ xs: 220, md: 418 }} src={'/assets/landingv3/divider.svg'} />
					</Box>
					<Typography
						variant='h6'
						fontSize={{ xs: '22px', md: '40px' }}
						sx={{ maxWidth: { xs: '100%', md: '60%' } }}
						textAlign={'center'}>
						India’s Largest & Most Trusted Construction Platform
					</Typography>
				</Stack>
			</Section>
		</>
	)
}
