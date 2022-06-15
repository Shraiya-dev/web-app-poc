import { Box, CardMedia, Dialog, DialogContent } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import Carousal from '../carousal/carousal'

const ViewImage = ({ ...props }) => {
	const { open, imageSrc, onClick } = props

	console.log('imageSrc', imageSrc)

	// const fileType = imageSrc.substr(imageSrc.lastIndexOf('.') + 1)

	const openPdf = () => {
		return window.open(imageSrc, '_blank')
	}

	return (
		<>
			{/* {fileType === 'pdf' && open ? (
				<>{openPdf()}</>
			) : ( */}
			<Dialog style={{ zIndex: 1800 }} open={open} keepMounted onClose={onClick} maxWidth='md'>
				<DialogContent>
					<Box>
						{/* <Carousel showArrows={true} >
								<Box>
								<img
									src={imageSrc}
									style={{
										width: '100%',
										height: '100%',

										objectFit: 'cover',
										borderRadius: 8,
										marginBottom: 0,
									}}
									alt={'image'}
								></img>
								</Box>
								
							</Carousel> */}

						<Carousal images={imageSrc} />
					</Box>
				</DialogContent>
			</Dialog>
			{/* )} */}
		</>
	)
}

export default ViewImage
