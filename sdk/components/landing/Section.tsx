import { Box, BoxProps, Container, ContainerProps, SxProps } from '@mui/material'

interface Section extends ContainerProps {
	backgroundColor?: string
	backgroundImage?: string
	sectionProps?: BoxProps<any>
	boxSx?: SxProps
}
export const Section = ({ backgroundColor, backgroundImage, boxSx, sectionProps, sx, ...rest }: Section) => {
	return (
		<Box
			sx={{
				backgroundColor: backgroundColor,
				backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'contain',
				...boxSx,
			}}>
			<Container sx={{ py: 3, ...sx }} {...rest} />
		</Box>
	)
}
