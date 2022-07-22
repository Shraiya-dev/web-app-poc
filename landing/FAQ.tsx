import { HelpOutline } from '@mui/icons-material'
import { Button, Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { DataLayerPush, FAQPage, FAQTypes, LinkButton, Section } from 'sdk'
import { ContactUsSection } from './components'
interface Props {}
export const FAQ: FC<Props> = () => {
	const router = useRouter()
	const { bannerSection, faqSection } = FAQPage
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	return (
		<>
			<Section backgroundColor={bannerSection.backgroundColor}>
				<Stack
					direction={{ xs: 'column', md: 'row' }}
					alignItems='center'
					justifyContent='center'
					spacing={3}
					py={4}>
					<Stack>
						<Typography variant='h5' color='grey.A700'>
							{bannerSection.subHeading}
						</Typography>
						<Typography variant='h3' letterSpacing={2} color='primary.main' fontWeight={700}>
							{bannerSection.heading}
						</Typography>
					</Stack>
					<LinkButton
						onClick={() => {
							DataLayerPush({
								event: 'book_worker_faq_hero',
							})
						}}
						href={bannerSection.bookWorker.link}
						variant='contained'
						sx={{ px: 10, fontSize: 24 }}>
						{bannerSection.bookWorker.label}
					</LinkButton>
				</Stack>
			</Section>
			<Section>
				<Grid container spacing={2}>
					{faqSection.tabs?.map((item) => {
						return (
							<Grid key={item.value} item xs={6} md={3}>
								<Button
									fullWidth
									variant={
										((router.query.tab ?? FAQTypes.Pricing) as FAQTypes) === item.value
											? 'contained'
											: 'outlined'
									}
									size='large'
									onClick={() => {
										router.query.tab = item.value
										router.replace(router)
									}}
									sx={{
										py: { xs: 0, md: 4 },
										px: { xs: 0, md: 10 },
										border: '1px solid #efefef !important',
										fontSize: { xs: 16, md: 20 },
										minHeight: 70,
										fontWeight: 700,
										borderRadius: { xs: 2, md: 4 },
										boxShadow: '0 1px 15px #efefef',
									}}>
									{item.label}
								</Button>
							</Grid>
						)
					})}
				</Grid>
				{router.isReady && (
					<Stack p={{ xs: 2, md: 10 }} spacing={3}>
						{faqSection.faq[(router.query.tab ?? FAQTypes.Pricing) as FAQTypes]?.map((item) => {
							return (
								<Stack key={item.question} direction='row' spacing={2}>
									<HelpOutline sx={{ fontSize: 48 }} color='primary' />
									<Stack flex={1}>
										<Typography
											fontSize={(theme) => ({
												xs: theme.typography.body2.fontSize,
												md: theme.typography.h4.fontSize,
											})}
											py={0.8}
											fontWeight={600}>
											{item.question}
										</Typography>
										<Typography
											fontSize={(theme) => ({
												xs: theme.typography.body2.fontSize,
												md: theme.typography.body1.fontSize,
											})}
											marginLeft={{ xs: '-64px', md: 0 }}
											marginTop={{ xs: 2, md: 0 }}>
											{item.answer}
										</Typography>
									</Stack>
								</Stack>
							)
						})}
					</Stack>
				)}
			</Section>
			<ContactUsSection />
		</>
	)
}
