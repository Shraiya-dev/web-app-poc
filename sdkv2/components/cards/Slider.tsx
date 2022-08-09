import React, { useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { Box, Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material'
import { homePage } from 'sdk/data'
import { useMobile } from 'sdk/hooks'
import { primary, theme } from 'sdk/constants'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'

export const Slider = () => {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [loaded, setLoaded] = useState(false)
	const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
		loop: false,
		initial: 0,
		slideChanged(slider) {
			setCurrentSlide(slider.track.details.rel)
		},
		created() {
			setLoaded(true)
		},
	})
	const isMobile = useMobile()
	return (
		<Stack direction={'column'}>
			<div ref={sliderRef} className='keen-slider'>
				{Array(5)
					.fill(5)
					.map((x, index) => {
						return (
							<Stack
								key={index}
								className='keen-slider__slide'
								direction={'column'}
								justifyContent={'center'}
								alignItems={'center'}>
								<Card
									sx={{
										display: 'flex',
										flexDirection: isMobile ? 'column' : 'row',
										maxWidth: 800,
										height: isMobile ? 500 : 300,
									}}>
									<CardMedia
										component='img'
										sx={{
											background: 'cover',
										}}
										height={isMobile ? '300' : '300'}
										image={homePage.customerReview.card.cardImageSrc}
									/>
									<CardContent
										sx={{
											background: theme.palette.primary.main,
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											height: isMobile ? 500 : 300,
										}}>
										<Typography
											variant='body2'
											color={primary.properDark}
											fontFamily={'Saira,sans-serif'}
											fontWeight={600}>
											{homePage.customerReview.card.cardText}
										</Typography>
									</CardContent>
								</Card>
								<Stack direction={'column'} alignItems={'center'} mt={3}>
									<Typography variant='h3' fontFamily={'Saira ,sans-serif'} fontWeight={700}>
										GECPL
									</Typography>
									<Typography variant='h6' fontFamily={'Karla ,sans-serif'} fontWeight={300}>
										Mumbai Registered
									</Typography>
								</Stack>
							</Stack>
						)
					})}
			</div>

			<Stack
				direction={'row'}
				justifyContent={'center'}
				alignItems={'center'}
				sx={{
					background: '#f7f7f7',
					height: '100px',
					width: '100%',
				}}>
				{loaded && instanceRef?.current && (
					<>
						<IconButton
							onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
							disabled={currentSlide === 0}>
							<KeyboardBackspaceIcon
								sx={{
									fontSize: '25px',
									color: '#000',
								}}
							/>
						</IconButton>
						<IconButton
							onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
							disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}>
							<KeyboardBackspaceIcon
								sx={{
									transform: 'rotate(-180deg)',
									fontSize: '25px',
									color: '#000',
								}}
							/>
						</IconButton>
					</>
				)}
			</Stack>
		</Stack>
	)
}
