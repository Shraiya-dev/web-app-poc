import { Box, Container, ContainerProps } from '@mui/material'

interface Section extends ContainerProps {
	backgroundColor?: string
	backgroundImage?: string
}
export const Section = ({ backgroundColor, backgroundImage, sx, ...rest }: Section) => {
	return (
		<Box
			sx={{
				backgroundColor: backgroundColor,
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'contain',
			}}>
			<Container sx={{ py: 3, ...sx }} {...rest} />
		</Box>
	)
}
