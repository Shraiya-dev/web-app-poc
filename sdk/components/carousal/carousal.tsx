import { useState } from 'react'

import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, styled } from '@mui/material'
import { primary } from '../../constants'
import { CustomStepper } from '../stepper'

const CarousalStyle = styled(Box)(({ theme }) => ({
	maxWidth: '100vw',
	maxHeight: '100vh',

	'.rightArrow': {
		display: 'flex',
		top: '43%',
		position: 'absolute',
		float: 'right',
		right: '2%',

		padding: '2%',
		cursor: 'pointer',
	},
	'.leftArrow': {
		display: 'flex',
		top: '43%',
		position: 'absolute',
		float: 'left',
		left: '2%',

		padding: '2%',
		cursor: 'pointer',
	},
}))
const Carousal = ({ ...props }) => {
	const { images } = props

	const [currImg, setCurrImg] = useState(0)

	console.log('images', props)

	return (
		<CarousalStyle>
			{currImg !== 0 && (
				<Box
					className='leftArrow'
					onClick={() => {
						currImg > 0 && setCurrImg(currImg - 1)
					}}>
					<ArrowBackIos style={{ fontSize: 30, color: primary.main }} />
				</Box>
			)}
			<img
				src={images[currImg]}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
					borderRadius: 8,
					marginBottom: 0,
				}}
			/>

			{images.length != currImg + 1 && (
				<Box
					className='rightArrow'
					onClick={() => {
						currImg < images.length - 1 && setCurrImg(currImg + 1)
					}}>
					<ArrowForwardIos style={{ fontSize: 30, color: primary.main }} />
				</Box>
			)}

			{images.length > 1 && (
				<Box style={{ display: 'flex', justifyContent: 'center' }}>
					<CustomStepper step={currImg + 1} inputSteps={images.length} />
				</Box>
			)}
		</CarousalStyle>
	)
}

export default Carousal
