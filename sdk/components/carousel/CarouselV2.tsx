import { ArrowBack, ArrowForward, ArrowRight } from '@mui/icons-material'
import { Box, IconButton, MobileStepper, MobileStepperProps, Stack } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'
interface CarouselProps {
	componentPerView: number
	items: any[]
	loop?: boolean
	slideDelay?: number
	icons?: { left: any; right: any }
	mobileStepperPosition?: 'top' | 'static' | 'bottom' | 'center'
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
export const CarouselV2 = ({
	items,
	componentPerView,
	slideDelay = 5000,
	loop = false,
	icons = { left: <ArrowBack color='primary' />, right: <ArrowForward color='primary' /> },
	mobileStepperPosition = 'bottom',
}: CarouselProps) => {
	const contentPerSlide = useMemo(() => {
		const slides: any[] = []
		let i = 0
		while (i < items.length) {
			slides.push(items.slice(i, i + componentPerView))
			i = i + componentPerView
		}
		return slides
	}, [componentPerView, items])
	const [activeStep, setActiveStep] = useState<number>(0)
	const maxSteps = useMemo(() => Math.ceil(items.length / componentPerView), [componentPerView, items.length])
	useEffect(() => {
		if (activeStep < 0 || activeStep > maxSteps - 1) {
			setActiveStep(0)
		}
	}, [activeStep, maxSteps])
	const handelPrev = useCallback(() => {
		setActiveStep((p) => {
			if (p === 0) {
				return p + maxSteps - 1
			}
			return (p - 1) % maxSteps
		})
	}, [maxSteps])
	const handelNext = useCallback(() => {
		setActiveStep((p) => {
			return (p + 1) % maxSteps
		})
	}, [maxSteps])
	return (
		<Stack
			sx={{
				mb: 6,
			}}>
			{mobileStepperPosition === 'top' && (
				<Stack direction='row' justifyContent='center'>
					<IconButton onClick={handelPrev}>{icons.left}</IconButton>
					<IconButton onClick={handelNext}>{icons.right}</IconButton>
				</Stack>
			)}
			<Stack direction='row' alignItems='center'>
				{mobileStepperPosition === 'center' && (
					// <IconButton sx={{ display: { xs: 'flex', md: 'flex' } }} onClick={handelPrev}>
					// 	{icons.left}
					// </IconButton>
					<IconButton onClick={handelPrev}>{icons.left}</IconButton>
				)}

				<AutoPlaySwipeableViews
					interval={slideDelay}
					index={activeStep}
					onChangeIndex={(i) => setActiveStep(i)}
					scrolling=''
					enableMouseEvents>
					{contentPerSlide.map((items: any[], index) => (
						<Stack direction='row' key={index} alignItems={'flex-start'} justifyContent='space-evenly'>
							{items.map((com, id) => {
								return com
							})}
						</Stack>
					))}
				</AutoPlaySwipeableViews>
				{mobileStepperPosition === 'center' && <IconButton onClick={handelNext}>{icons.right}</IconButton>}
			</Stack>
			{mobileStepperPosition === 'bottom' && (
				<Stack direction='row' justifyContent='center'>
					<IconButton onClick={handelPrev}>{icons.left}</IconButton>
					<IconButton onClick={handelNext}>{icons.right}</IconButton>
				</Stack>
			)}
		</Stack>
	)
}
