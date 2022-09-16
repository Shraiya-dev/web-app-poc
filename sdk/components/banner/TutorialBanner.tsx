import { BoxProps, Typography } from '@mui/material'
import { Box, SxProps } from '@mui/system'
import { FC } from 'react'

export const TutorialBanner: FC<BoxProps> = ({ children, sx }) => {
	return (
		<Box component='div' sx={{ backgroundColor: '#E58A51', p: 2, mx: -2, ...sx }} mb={1}>
			<Typography color='common.black' variant='body2' fontFamily={'Karla,sans-serif'} lineHeight={1}>
				{children}
			</Typography>
		</Box>
	)
}
