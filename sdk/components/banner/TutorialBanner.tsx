import { Typography, TypographyProps } from '@mui/material'
import { FC } from 'react'

export const TutorialBanner: FC<TypographyProps> = ({ children, sx = {} }) => {
	return (
		<Typography
			color='common.black'
			variant='body2'
			fontFamily={'Karla,sans-serif'}
			lineHeight={1.2}
			sx={{ backgroundColor: '#E58A51', p: 2, mx: -2, mb: 1, ...sx }}>
			{children}
		</Typography>
	)
}
