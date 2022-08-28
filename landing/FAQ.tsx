import { HelpOutline } from '@mui/icons-material'
import { Box, Button, Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'
import { DataLayerPush, FAQCard, FAQPage, FAQTypes, FAQuestion, LinkButton, primary, Section, theme } from 'sdk'
import { ContactUsSection } from './components'

interface Props {}

const faqCard = [
	{
		title: 'Booking Requirement',
		detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		id: '0',
	},
	{
		title: 'Payment and Pricing',
		detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		id: '1',
	},
	{
		title: 'Hero Worker',
		detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		id: '2',
	},
	{
		title: 'Contractor Dashboard',
		detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		id: '3',
	},
	{
		title: 'Behind the Scenes',
		detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
		id: '4',
	},
	// {
	// 	title: 'Terms and Conditions',
	// 	detail: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
	// 	id: '5',
	// },
]

const ListOfQuestion = [
	'Booking Requirements',
	'Payment and Pricing',
	'Contractor Dashboard',
	'Behind the Scenes',
	'Terms and Conditions',
]

export const FAQ: FC<Props> = () => {
	const router = useRouter()
	// const { bannerSection, faqSection } = FAQPage
	// const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	return (
		<>
			<Section
				backgroundColor={primary.properDark}
				sx={{
					overflow: 'hidden',
					backgroundImage: '/assets/landingv2/faq.svg',
				}}>
				<Stack
					direction={'row'}
					alignItems='center'
					justifyContent='center'
					spacing={3}
					minHeight={{ xs: 'calc( 100vh - 700px )', md: 'calc( 100vh - 430px )' }}>
					{/* <Stack>
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
					</LinkButton> */}
					<Stack
						direction={'column'}
						width={'100%'}
						alignItems={{ xs: 'flex-start', md: 'center' }}
						spacing={{ xs: 1.5, md: 3.75 }}>
						<Typography
							fontSize={{ xs: '28px', md: '36px' }}
							color={theme.palette.success.dark}
							fontFamily={'Saira , sans-serif'}
							fontWeight={500}
							textAlign={{ xs: 'left', md: 'center' }}>
							Frequently asked <br />
							questions
						</Typography>
						<Typography
							fontSize={{ md: '24px', xs: '16px' }}
							color={'#fff'}
							fontFamily={'Karla ,sans-serif'}
							fontWeight={400}>
							Have a question?
						</Typography>
					</Stack>
					<Box
						height={{ xs: '62px', md: '271px' }}
						width={{ xs: '62px', md: '271px' }}
						position={'relative'}
						top={{ xs: '35px', md: '155px' }}
						left={{
							md: '40px',
						}}>
						<img width={'100%'} height={'100%'} src={'/assets/landingv2/faq.svg'} />
					</Box>
				</Stack>
			</Section>
			{/* <Section>
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
			</Section> */}
			{!router.query.step || router.query.step === '0' ? (
				<Section backgroundColor='#fff'>
					<Grid container spacing={3}>
						{faqCard.map((info, index) => {
							return (
								<Grid key={info.id} item xs={12} md={3}>
									<FAQCard id={info.id} title={info.title} detail={info.detail} />
								</Grid>
							)
						})}
					</Grid>
				</Section>
			) : (
				<Section backgroundColor='#fff'>
					<FAQuestion ListOfQuestion={ListOfQuestion} />
				</Section>
			)}

			{/* <ContactUsSection /> */}
		</>
	)
}
