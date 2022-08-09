import { Stack, Box, Typography, Button, Divider, Grid, IconButton } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { DataLayerPush } from 'sdk/analytics'
import { ButtonClicked, sendAnalytics } from 'sdk/analytics/analyticsWrapper'
import { AppStoreImage } from 'sdk/constants'
import { externalLinks, footer } from 'sdk/data'
import { useMobile } from 'sdk/hooks'
import { HyperLink } from '../atomic'
import { LinkButton } from '../button'
import { Section, SectionProps } from './Section'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import LinkedInIcon from '@mui/icons-material/LinkedIn'

export const Footer = () => {
	const isMobile = useMobile()
	const router = useRouter()
	return (
		<Section backgroundColor='#000000'>
			{!isMobile ? (
				<>
					<Stack
						direction={'row'}
						spacing={2}
						pt={isMobile ? 2 : 1}
						justifyContent={'space-between'}
						alignItems={'center'}>
						<Stack
							direction={isMobile ? 'row' : 'column'}
							justifyContent='space-between'
							alignItems={'center'}>
							<Stack direction={'column'}>
								<HyperLink href='/'>
									<Image
										src={footer.brandImage}
										width={isMobile ? 150 : 300}
										height={isMobile ? 50 : 140}
										alt='Project hero'
									/>
								</HyperLink>

								<Stack direction='column' alignItems='flex-start' spacing={4}>
									<Typography variant='h3' color={footer.textColor}>
										{footer.tagLine}
									</Typography>
									<LinkButton
										href='/#book-worker'
										onClick={() => {
											DataLayerPush({ event: 'book_hero_home_footer' })
											sendAnalytics({
												name: 'EasyBookWorker',
												action: 'ButtonClick',
												metaData: {
													origin: 'Footer',
												},
											})
										}}
										variant='contained'
										sx={{ fontSize: '20px', p: '14px 64px', fontWeight: '900' }}>
										Book Workers Now
									</LinkButton>
								</Stack>
							</Stack>
							<Stack mt={'40px'} direction={'column'} alignItems={'flex-start'} width={'100%'}>
								<Typography variant='h4' color={'#fff'}>
									Download Now!
								</Typography>
								<Box mt={'20px'} sx={{ cursor: 'pointer' }}>
									<a
										href={externalLinks.heroApp}
										onClick={() => {
											ButtonClicked({
												page: document.title,
												action: 'App store link',
												url: router.asPath,
											})
										}}
										target='_blank'
										rel='noopener noreferrer'>
										<img src='/assets/landingv2/heroSection/googlebutton.svg' alt='' />
									</a>
								</Box>
							</Stack>
						</Stack>
						<Stack direction={'column'}>
							<Typography variant='h2' color={'#fff'}>
								Have a question? Here to help.
							</Typography>
							<Typography variant='h6' color={'#fff'} fontSize={'18px'} fontWeight={'500'} mt={'8px'}>
								Our friendly customer support team is your <br /> extended family. Speak your heart out.
								Give <br />
								us a call or drop us an email, we&#39;re here to <br />
								help.
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
										fontSize={'18px'}
										fontWeight={700}>
										marketing@projecthero.in
									</Typography>
								</Stack>
								<Stack direction={'row'} alignItems={'center'} spacing={2}>
									<img src='/assets/landingv2/heroSection/phone.svg' />
									<Typography
										component='a'
										href='tel:+91 9151003513'
										variant='subtitle2'
										color={'#fff'}
										fontSize={'18px'}
										fontWeight={700}>
										+91-9151003513
									</Typography>
								</Stack>
							</Stack>
						</Stack>
					</Stack>
					<Stack direction={'row'} justifyContent='space-between' alignItems={'center'} mt={8}>
						<Box>
							{isMobile ? (
								<HyperLink href='/'>
									<Image
										src={footer.brandImage}
										width={isMobile ? 100 : 200}
										height={isMobile ? 30 : 70}
										alt='Project hero'
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
											<Typography color='#ffffff'>{item.label}</Typography>
										</a>
									))}
								</Stack>
							)}
						</Box>
						<Box>
							<Stack direction={'row'} justifyContent={'space-between'} alignItems='center'>
								{/* <Stack direction={'row'} spacing={2} alignItems='center'>
									<a
										href={externalLinks.heroApp}
										onClick={() => {
											ButtonClicked({
												page: document.title,
												action: 'App store link',
												url: router.asPath,
											})
										}}
										target='_blank'
										rel='noopener noreferrer'>
										<Image src={AppStoreImage} width={100} height={30} alt='' />
									</a>
									<a
										href={externalLinks.instaGram}
										onClick={() => {
											ButtonClicked({
												page: document.title,
												action: 'Instagram Link',
												url: router.asPath,
											})
										}}
										target='_blank'
										rel='noopener noreferrer'>
										<Image src={'/assets/landing/instagram.svg'} width={30} height={30} alt='' />
									</a>
									<a
										href={externalLinks.youtube}
										onClick={() => {
											ButtonClicked({
												page: document.title,
												action: 'Youtube link',
												url: router.asPath,
											})
										}}
										target='_blank'
										rel='noopener noreferrer'>
										<Image src={'/assets/landing/youtube.svg'} width={45} height={45} alt='' />
									</a>
								</Stack> */}
								<Stack direction={'row'}>
									<IconButton>
										<a href={externalLinks.instaGram} target='blank'>
											<InstagramIcon sx={{ color: '#fff' }} />
										</a>
									</IconButton>
									{/* <IconButton>
										<a href='' target='blank'>
											<TwitterIcon sx={{ color: '#fff' }} />
										</a>
									</IconButton> */}
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
									width={isMobile ? 150 : 300}
									height={isMobile ? 50 : 140}
									alt='Project hero'
								/>
							</HyperLink>

							<Stack flex={1} direction='column' alignItems='flex-start' spacing={4}>
								<Typography variant={isMobile ? 'h4' : 'h3'} color={footer.textColor}>
									{footer.tagLine}
								</Typography>
							</Stack>
						</Box>
					</Stack>
					<Stack direction={'row'} justifyContent={'flex-start'} mt={4}>
						<LinkButton
							href='/#book-worker'
							onClick={() => {
								DataLayerPush({ event: 'book_hero_home_footer' })
								sendAnalytics({
									name: 'EasyBookWorker',
									action: 'ButtonClick',
									metaData: {
										origin: 'Footer',
									},
								})
							}}
							variant='contained'
							sx={{ fontSize: '14px', p: '13px 45px', fontWeight: '900' }}>
							Book Workers Now
						</LinkButton>
					</Stack>
					<Stack direction={'column'} mt={6}>
						<Typography variant='h2' color={'#fff'}>
							Have a question? Here to help.
						</Typography>
						<Typography variant='h6' color={'#fff'} fontSize={'18px'} fontWeight={'500'} mt={4}>
							Our friendly customer support team is your extended family. Speak your heart out. Give us a
							call or drop us an email, we&#39;re here to help.
						</Typography>
					</Stack>
					<Stack mt={'46px'} direction={'column'} spacing={2}>
						<Stack direction={'row'} alignItems={'center'} spacing={2}>
							<img src='/assets/landingv2/heroSection/mail.svg' />
							<Typography
								component='a'
								href='mailto:marketing@projecthero.in'
								variant='subtitle2'
								color={'#fff'}
								fontSize={'18px'}
								fontWeight={700}>
								marketing@projecthero.in
							</Typography>
						</Stack>
						<Stack direction={'row'} alignItems={'center'} spacing={2}>
							<img src='/assets/landingv2/heroSection/phone.svg' />
							<Typography
								component='a'
								href='tel:+91 9151003513'
								variant='subtitle2'
								color={'#fff'}
								fontSize={'18px'}
								fontWeight={700}>
								+91-9151003513
							</Typography>
						</Stack>
					</Stack>
					<Stack direction={'column'} alignItems='flex-start' mt={8}>
						<Typography variant='h4' color={'#fff'}>
							Download Now!
						</Typography>
						<Box mt={'20px'} sx={{ cursor: 'pointer', width: '45%' }}>
							<a
								href={externalLinks.heroApp}
								onClick={() => {
									ButtonClicked({
										page: document.title,
										action: 'App store link',
										url: router.asPath,
									})
								}}
								target='_blank'
								rel='noopener noreferrer'>
								<img
									height={'100%'}
									width={'100%'}
									src='/assets/landingv2/heroSection/googlebutton.svg'
									alt=''
								/>
							</a>
						</Box>
					</Stack>
					<Stack direction={'row'} mt={6}>
						<IconButton>
							<a href={externalLinks.instaGram} target='blank'>
								<InstagramIcon sx={{ color: '#fff' }} />
							</a>
						</IconButton>
						{/* <IconButton>
							<a href='' target='blank'>
								<TwitterIcon sx={{ color: '#fff' }} />
							</a>
						</IconButton> */}
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
					<Stack direction={'column'} spacing={2} mt={4}>
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
								<Typography color='#ffffff'>{item.label}</Typography>
							</a>
						))}
					</Stack>
				</Stack>
			)}
		</Section>
	)
}
