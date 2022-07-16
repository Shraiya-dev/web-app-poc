import { Stack, Box, Typography, Button, Divider, Grid } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { DataLayerPush } from 'sdk/analytics'
import { ButtonClicked } from 'sdk/analytics/analyticsWrapper'
import { AppStoreImage } from 'sdk/constants'
import { externalLinks, footer } from 'sdk/data'
import { useMobile } from 'sdk/hooks'
import { LinkButton } from '../button'
import { Section } from './Section'

export const Footer = () => {
	const isMobile = useMobile()
	const router = useRouter()
	return (
		<Section backgroundColor='#000000'>
			<Stack spacing={2} pt={isMobile ? 2 : 4}>
				<Stack direction={'row'} justifyContent='space-between' alignItems={'center'}>
					{!isMobile && (
						<Image
							src={footer.brandImage}
							width={isMobile ? 150 : 200}
							height={isMobile ? 50 : 70}
							alt='Project hero'
						/>
					)}

					<Stack
						flex={1}
						direction='row'
						alignItems='center'
						justifyContent={isMobile ? 'space-between' : 'flex-end'}>
						<Typography variant={isMobile ? 'h4' : 'h3'} color={footer.textColor}>
							{footer.tagLine}
						</Typography>
						<LinkButton
							href='/login'
							onClick={() => {
								DataLayerPush({ event: 'book_hero_home_footer' })
							}}
							variant='contained'
							sx={{ fontSize: '14px', ml: 2 }}>
							Book Hero
						</LinkButton>
					</Stack>
				</Stack>
				{isMobile && (
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
				)}
			</Stack>
			<Divider
				sx={{
					color: 'common.white',
					border: '1px solid #fff',
					my: 2,
					backgroundColor: 'common.white',
				}}
			/>
			<Stack direction={'row'} justifyContent={'space-between'} alignItems='center' py={3}>
				{isMobile ? (
					<Image
						src={footer.brandImage}
						width={isMobile ? 100 : 200}
						height={isMobile ? 30 : 70}
						alt='Project hero'
					/>
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
				<Stack direction={'row'} spacing={2} alignItems='center'>
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
				</Stack>
			</Stack>
		</Section>
	)
}
