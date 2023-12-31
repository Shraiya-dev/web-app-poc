import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { IconButton, MobileStepper, Stack } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { autoPlay } from 'react-swipeable-views-utils'

interface CarouselProps {
	componentPerView: number
	items: any[]
	mobileStepper?: boolean
	slideDelay?: number
	mobileStepperPosition?: 'top' | 'static' | 'bottom'
}

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)
export const Carousel = ({
	items,
	componentPerView,
	mobileStepper = true,
	slideDelay = 5000,
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
	const maxSteps = useMemo(() => Math.ceil(items.length / componentPerView), [componentPerView, items.length])
	const [activeStep, setActiveStep] = useState<number>(0)
	useEffect(() => {
		if (activeStep < 0 || activeStep > maxSteps - 1) {
			setActiveStep(0)
		}
	}, [activeStep, maxSteps])

	return (
		<>
			{mobileStepper && mobileStepperPosition === 'top' && maxSteps > 1 && (
				<MobileStepper
					position={'static'}
					color='common.white'
					sx={{ backgroundColor: 'transparent' }}
					backButton={
						<IconButton disabled={activeStep === 0} onClick={() => setActiveStep((p) => p - 1)}>
							{/* <ArrowLeft color='primary' /> */}
						</IconButton>
					}
					nextButton={
						<IconButton disabled={activeStep >= maxSteps - 1} onClick={() => setActiveStep((p) => p + 1)}>
							{/* <ArrowRight color='primary' /> */}
						</IconButton>
					}
					steps={maxSteps}
					activeStep={activeStep}
				/>
			)}
			<Stack direction='row' alignItems='center'>
				{!mobileStepper && (
					<IconButton disabled={activeStep === 0} onClick={() => setActiveStep((p) => p - 1)}>
						<ArrowBack color='primary' />
					</IconButton>
				)}
				<AutoPlaySwipeableViews
					interval={slideDelay}
					index={activeStep}
					onChangeIndex={(i) => setActiveStep(i)}
					scrolling=''
					enableMouseEvents>
					{contentPerSlide.map((items: any[], index) => (
						<Stack direction='row' key={index} justifyContent='space-evenly'>
							{items.map((com, id) => {
								return com
							})}
						</Stack>
					))}
				</AutoPlaySwipeableViews>
				{!mobileStepper && (
					<IconButton disabled={activeStep >= maxSteps - 1} onClick={() => setActiveStep((p) => p + 1)}>
						<ArrowForward color='primary' />
					</IconButton>
				)}
			</Stack>
			{mobileStepper && mobileStepperPosition === 'bottom' && maxSteps > 1 && (
				<MobileStepper
					position={'static'}
					color='common.white'
					sx={{ backgroundColor: 'transparent', top: 0 }}
					backButton={
						<IconButton disabled={activeStep === 0} onClick={() => setActiveStep((p) => p - 1)}>
							{/* <ArrowLeft color='primary' /> */}
						</IconButton>
					}
					nextButton={
						<IconButton disabled={activeStep >= maxSteps - 1} onClick={() => setActiveStep((p) => p + 1)}>
							{/* <ArrowRight color='primary' /> */}
						</IconButton>
					}
					steps={maxSteps}
					activeStep={activeStep}
				/>
			)}
		</>
	)
}
