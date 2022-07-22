import { Button, Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import { contactUsSection, FloatingUnderLineHeading, Section, SectionProps } from 'sdk'
export const ContactUsSection: FC<SectionProps> = (props) => {
	const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
	return (
		<>
			<Section sx={{ minHeight: '600px' }} {...props}>
				{isMobile && (
					<FloatingUnderLineHeading variant='h3' underlinePosition='flex-start'>
						{contactUsSection.title}
					</FloatingUnderLineHeading>
				)}
				<Grid container sx={{ flexDirection: isMobile ? 'column-reverse' : 'row' }}>
					<Grid item xs={12} md={5}>
						<Stack direction={'column'} spacing={4}>
							{!isMobile && (
								<FloatingUnderLineHeading variant='h3' underlinePosition='flex-start'>
									{contactUsSection.title}
								</FloatingUnderLineHeading>
							)}
							<Typography variant='subtitle1'>{contactUsSection.support.message}</Typography>
							<a href={'mailto:' + contactUsSection.support.mailAction.email}>
								<Stack>
									<Button
										sx={{ borderRadius: 3 }}
										startIcon={<img src='/assets/landing/plane.svg' alt='plane' />}
										variant='outlined'>
										<Stack direction='column' alignItems='flex-start' m={2} width={200}>
											<Typography variant='subtitle1'>
												{contactUsSection.support.mailAction.label}
											</Typography>
											<Typography variant='h6' sx={{ color: '#0663F6' }}>
												{contactUsSection.support.mailAction.email}
											</Typography>
										</Stack>
									</Button>
								</Stack>
							</a>
							<a href={'tel:' + contactUsSection.support.contactAction.phone}>
								<Stack>
									<Button
										sx={{ borderRadius: 3 }}
										startIcon={<img src='/assets/landing/call.svg' alt='plane' />}
										variant='outlined'>
										<Stack direction='column' alignItems='flex-start' m={2} width={200}>
											<Typography variant='subtitle1'>
												{contactUsSection.support.contactAction.label}
											</Typography>
											<Typography variant='h6' sx={{ color: '#0663F6' }}>
												{contactUsSection.support.contactAction.phone}
											</Typography>
										</Stack>
									</Button>
								</Stack>
							</a>
						</Stack>
					</Grid>
					<Grid item xs={12} md={7} position='relative' minHeight={250}>
						<Image src={contactUsSection.support.image} layout='fill' />
					</Grid>
				</Grid>
			</Section>
		</>
	)
}
