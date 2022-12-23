import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { getSelectorsByUserAgent } from 'react-device-detect'
import { getCookie } from 'sdk/analytics'
import { ButtonClicked, sendAnalytics } from 'sdk/analytics/analyticsWrapper'
import { PHSupport, externalLinks, footer } from 'sdk/data'
import { useMobile } from 'sdk/hooks'
import { HyperLink } from '../atomic'
import { Section } from './Section'

export const Footer = () => {
	const { isMobile } = useMemo(() => {
		if (typeof window === 'undefined') return { isMobile: false }
		return getSelectorsByUserAgent(window.navigator.userAgent)
	}, [])

	const isUIMobile = useMobile()
	const router = useRouter()
	return (
		<Section backgroundColor='#000000'>
			{!isUIMobile ? (
				<>
					<Stack
						direction={'row'}
						spacing={2}
						pt={isUIMobile ? 2 : 1}
						justifyContent={'space-between'}
						alignItems={'center'}>
						<Stack
							direction={isUIMobile ? 'row' : 'column'}
							justifyContent='space-between'
							alignItems={'center'}>
							<Stack direction={'column'}>
								<HyperLink href='/'>
									<Image
										src={footer.brandImage}
										width={isUIMobile ? 150 : 300}
										height={isUIMobile ? 50 : 140}
										alt='ProjectHero'
									/>
								</HyperLink>

								<Stack direction='column' alignItems='flex-start' spacing={4}>
									<Typography
										color={footer.textColor}
										fontFamily={' Saira , sans-serif'}
										fontSize={{ xs: '20px', md: '24px' }}>
										{footer.tagLine}
									</Typography>
									{/* <LinkButton
										href='/#book-worker'
										onClick={() => {
											DataLayerPush({ event: 'book_hero_home_footer' })
											sendAnalytics({
												name: 'postJobNow',
												action: 'ButtonClick',
												metaData: {
													origin: 'Footer',
												},
											})
										}}
										variant='contained'
										sx={{
											px: { xs: 7, md: 11 },
											py: { xs: 1, md: 2 },
											fontSize: { xs: 16, md: 20 },
										}}>
										Job Post Karen
									</LinkButton> */}
								</Stack>
							</Stack>
							<Stack mt={'40px'} direction={'row'} alignItems={'flex-start'} width={'100%'}>
								<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
									<Typography variant='h5' fontSize={'16px'} color={'#fff'}>
										Contractor App
									</Typography>
									<a
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
													origin: 'Footer',
												},
											})
										}}
										target='_blank'
										rel='noopener noreferrer'>
										<Box
											component={'img'}
											height={44}
											width={152}
											mt={'8px'}
											src='/assets/landingv2/heroSection/googlebutton.svg'
											alt=''
										/>
									</a>
								</Box>
								<Divider
									orientation='vertical'
									sx={{ mx: '16px', border: '0.1px solid #fff', height: 80, mt: '20px' }}
								/>
								<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
									<Typography variant='h5' fontSize={'16px'} color={'#fff'}>
										Worker App
									</Typography>
									<a
										href={
											(isMobile
												? externalLinks.heroDeepLinkApp
												: externalLinks.heroPlayStoreApp) +
											(getCookie('utmParams') || externalLinks.fixUtmForApp)
										}
										onClick={() => {
											sendAnalytics({
												name: 'heroAppPlayStore',
												action: 'ButtonClick',
												metaData: {
													origin: 'Footer',
												},
											})
										}}
										target='_blank'
										rel='noopener noreferrer'>
										<Box
											component={'img'}
											height={44}
											width={152}
											mt={'8px'}
											src='/assets/landingv2/heroSection/googlebutton.svg'
											alt=''
										/>
									</a>
								</Box>
							</Stack>
						</Stack>
						<Stack direction={'column'}>
							<Typography
								variant='h2'
								color={'#fff'}
								fontFamily={'Saira ,sans-serif'}
								fontWeight={500}
								fontSize={{ xs: '16px', md: '32px' }}>
								Have a question? Here to help.
							</Typography>
							<Typography
								color={'#fff'}
								mt={'8px'}
								fontFamily={'Karla ,sans-serif'}
								fontWeight={500}
								fontSize={{ xs: '16px', md: '18px' }}>
								Please feel free to reach out to our customer
								<Box component={'br'} /> support from 9 AM - 6 PM on weekdays.
							</Typography>
							{/* {isMobile && (
						<Grid container direction={'row'} flexWrap={'wrap'}>
							{footer.navLinks.map((item) => (
								<Grid key={item.label} item xs={6}>
									<a
										onClick={() => {
											ButtonClicked({
												page: document.title,
												action: item.label,
												url: router.asPath,
											})
										}}
										target='_blank'
										rel='noopener noreferrer'
										href={item.link}>
										<Typography color='#ffffff'>{item.label}</Typography>
									</a>
								</Grid>
							))}
						</Grid>
					)}

					{!isMobile && (
						<Typography textAlign='right' variant='h6' color='common.white'>
							{footer.support}
						</Typography>
					)} */}
							<Stack mt={'46px'} direction={'column'} spacing={2}>
								<Stack direction={'row'} alignItems={'center'} spacing={2}>
									<img src='/assets/landingv2/heroSection/mail.svg' />
									<Typography
										component='a'
										href='mailto:marketing@projecthero.in'
										variant='subtitle2'
										color={'#fff'}
										onClick={() => {
											sendAnalytics({
												action: 'ButtonClick',
												name: 'mailProjectHeroSupport',
											})
										}}
										fontSize={{ md: '18px', xs: '16px' }}
										fontFamily={'Karla,sans-serif'}
										fontWeight={700}>
										marketing@projecthero.in
									</Typography>
								</Stack>
								<Stack direction={'row'} alignItems={'center'} spacing={2}>
									<img src='/assets/landingv2/heroSection/phone.svg' />
									<Typography
										component='a'
										href={`tel:+91 ${PHSupport.phoneNumber}`}
										variant='subtitle2'
										color={'#fff'}
										fontSize={{ md: '18px', xs: '16px' }}
										fontFamily={'Karla,sans-serif'}
										onClick={() => {
											sendAnalytics({
												action: 'ButtonClick',
												name: 'callProjectHeroSupport',
											})
										}}
										fontWeight={700}>
										+91-{PHSupport.phoneNumber}
									</Typography>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
					<Stack direction={'row'} justifyContent='space-between' alignItems={'center'} mt={8}>
						<Box>
							{isUIMobile ? (
								<HyperLink href='/'>
									<Image
										src={footer.brandImage}
										width={isUIMobile ? 100 : 200}
										height={isUIMobile ? 30 : 70}
										alt='ProjectHero'
									/>
								</HyperLink>
							) : (
								<Stack direction={'row'} spacing={3}>
									{footer.navLinks.map((item) => (
										<a
											key={item.label}
											onClick={() => {
												ButtonClicked({
													page: document.title,
													action: item.label,
													url: router.asPath,
												})
											}}
											target='_blank'
											rel='noopener noreferrer'
											href={item.link}>
											<Typography
												color='#ffffff'
												fontFamily={'Karla, sans-serif'}
												fontSize={{ xs: '12px', md: '18px' }}
												fontWeight={500}>
												{item.label}
											</Typography>
										</a>
									))}
								</Stack>
							)}
						</Box>
						<Box>
							<Stack direction={'row'} justifyContent={'space-between'} alignItems='center'>
								<Stack direction={'row'}>
									<IconButton>
										<a href={externalLinks.instaGram} target='blank'>
											<InstagramIcon sx={{ color: '#fff' }} />
										</a>
									</IconButton>
									<IconButton>
										<a href={externalLinks.youtube} target='blank'>
											<YouTubeIcon sx={{ color: '#fff' }} />
										</a>
									</IconButton>
									<IconButton>
										<a href={externalLinks.linkedIn} target='blank'>
											<LinkedInIcon sx={{ color: '#fff' }} />
										</a>
									</IconButton>
									<IconButton>
										<a href={externalLinks.facebook} target='blank'>
											<FacebookIcon sx={{ color: '#fff' }} />
										</a>
									</IconButton>{' '}
								</Stack>
							</Stack>
						</Box>
					</Stack>
				</>
			) : (
				<Stack direction={'column'}>
					<Stack direction={'row'} alignItems={'flex-start'} justifyContent={'space-between'}>
						<Box>
							<HyperLink href='/'>
								<Image
									src={footer.brandImage}
									width={isUIMobile ? 150 : 300}
									height={isUIMobile ? 50 : 140}
									alt='ProjectHero'
								/>
							</HyperLink>

							<Stack flex={1} direction='column' alignItems='flex-start' spacing={4}>
								<Typography variant={isUIMobile ? 'h4' : 'h3'} color={footer.textColor}>
									{footer.tagLine}
								</Typography>
							</Stack>
						</Box>
					</Stack>
					{/* <Stack direction={'row'} justifyContent={'flex-start'} mt={4}>
						<LinkButton
							href='/#book-worker'
							onClick={() => {
								DataLayerPush({ event: 'book_workers_now_footer' })
								sendAnalytics({
									name: 'postJobNow',
									action: 'ButtonClick',
									metaData: {
										origin: 'Footer',
									},
								})
							}}
							variant='contained'
							sx={{
								fontSize: { md: '20px', xs: '14px' },
								p: '8px 40px',
								fontWeight: 500,
								fontFamily: 'Karla ,sans-serif',
							}}>
							Job Post Karen
						</LinkButton>
					</Stack> */}
					<Stack direction={'column'} mt={6}>
						<Typography
							color={'#fff'}
							fontFamily={'Saira ,sans-serif'}
							fontWeight={500}
							fontSize={{ xs: '24px', md: '32px' }}>
							Have a question? Here to help.
						</Typography>
						<Box
							sx={{
								width: { xs: '100%', sm: '60%' },
							}}>
							<Typography
								variant='h6'
								color={'#fff'}
								mt={2}
								fontFamily={'Karla ,sans-serif'}
								fontWeight={500}
								fontSize={{ xs: '16px', md: '18px' }}>
								Please feel free to reach out to our customer support from 9 AM - 6 PM on weekdays.
							</Typography>
						</Box>
					</Stack>
					<Stack mt={'46px'} direction={'column'} spacing={2}>
						<Stack direction={'row'} alignItems={'center'} spacing={2}>
							<img src='/assets/landingv2/heroSection/mail.svg' />
							<Typography
								component='a'
								href='mailto:marketing@projecthero.in'
								onClick={() => {
									sendAnalytics({
										action: 'ButtonClick',
										name: 'mailProjectHeroSupport',
									})
								}}
								variant='subtitle2'
								color={'#fff'}
								fontSize={{ md: '18px', xs: '16px' }}
								fontFamily={'Karla,sans-serif'}
								fontWeight={700}>
								marketing@projecthero.in
							</Typography>
						</Stack>
						<Stack direction={'row'} alignItems={'center'} spacing={2}>
							<img src='/assets/landingv2/heroSection/phone.svg' />
							<Typography
								component='a'
								href={`tel:+91 ${PHSupport.phoneNumber}`}
								variant='subtitle2'
								color={'#fff'}
								fontSize={{ md: '18px', xs: '16px' }}
								fontFamily={'Karla,sans-serif'}
								onClick={() => {
									sendAnalytics({
										action: 'ButtonClick',
										name: 'callProjectHeroSupport',
									})
								}}
								fontWeight={700}>
								+91-{PHSupport.phoneNumber}
							</Typography>
						</Stack>
					</Stack>
					<Stack mt={'40px'} direction={'row'} alignItems={'flex-start'} width={'100%'}>
						<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
							<Typography variant='h5' fontSize={'16px'} color={'#fff'}>
								Contractor App
							</Typography>
							<a
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
											origin: 'Footer',
										},
									})
								}}
								target='_blank'
								rel='noopener noreferrer'>
								<Box
									component={'img'}
									height={44}
									width={152}
									mt={'8px'}
									src='/assets/landingv2/heroSection/googlebutton.svg'
									alt=''
								/>
							</a>
						</Box>
						<Divider
							orientation='vertical'
							sx={{ mx: '16px', border: '0.1px solid #fff', height: 80, mt: '20px' }}
						/>
						<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
							<Typography variant='h5' fontSize={'16px'} color={'#fff'}>
								Worker App
							</Typography>
							<a
								href={
									(isMobile
										? externalLinks.contractorDeepLinkApp
										: externalLinks.contractorPlayStoreApp) +
									(getCookie('utmParams') || externalLinks.fixUtmForApp)
								}
								onClick={() => {
									sendAnalytics({
										name: 'heroAppPlayStore',
										action: 'ButtonClick',
										metaData: {
											origin: 'Footer',
										},
									})
								}}
								target='_blank'
								rel='noopener noreferrer'>
								<Box
									component={'img'}
									height={44}
									width={152}
									mt={'8px'}
									src='/assets/landingv2/heroSection/googlebutton.svg'
									alt=''
								/>
							</a>
						</Box>
					</Stack>
					<Divider sx={{ border: '1px dashed #fff', my: '24px' }} />
					<Stack direction={'row'}>
						<IconButton>
							<a href={externalLinks.instaGram} target='blank'>
								<InstagramIcon sx={{ color: '#fff' }} />
							</a>
						</IconButton>
						<IconButton>
							<a href={externalLinks.youtube} target='blank'>
								<YouTubeIcon sx={{ color: '#fff' }} />
							</a>
						</IconButton>
						<IconButton>
							<a href={externalLinks.linkedIn} target='blank'>
								<LinkedInIcon sx={{ color: '#fff' }} />
							</a>
						</IconButton>
						<IconButton>
							<a href={externalLinks.facebook} target='blank'>
								<FacebookIcon sx={{ color: '#fff' }} />
							</a>
						</IconButton>{' '}
					</Stack>
					<Stack direction={'column'} spacing={2} mt={3}>
						{footer.navLinks.map((item) => (
							<a
								key={item.label}
								onClick={() => {
									ButtonClicked({
										page: document.title,
										action: item.label,
										url: router.asPath,
									})
								}}
								target='_blank'
								rel='noopener noreferrer'
								href={item.link}>
								<Typography
									color='#ffffff'
									fontFamily={'Karla, sans-serif'}
									fontSize={{ xs: '12px', md: '18px' }}
									fontWeight={500}>
									{item.label}
								</Typography>
							</a>
						))}
					</Stack>
				</Stack>
			)}
		</Section>
	)
}
