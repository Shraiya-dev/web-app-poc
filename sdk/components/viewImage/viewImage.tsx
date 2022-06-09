import { Box, CardMedia, Dialog, DialogContent } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'

const ViewImage = ({ ...props }) => {
	const { open, imageSrc, onClick } = props

	const fileType = imageSrc.substr(imageSrc.lastIndexOf('.') + 1)

	const openPdf = () => {
		return window.open(imageSrc, '_blank')
	}

	return (
		<>
			{fileType === 'pdf' && open ? (
				<>{openPdf()}</>
			) : (
				<Dialog style={{ zIndex: 1800 }} open={open} keepMounted onClose={onClick} maxWidth='md'>
					<DialogContent>
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
						/>
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}

export default ViewImage
