import { Box, BoxProps, Container, ContainerProps, SxProps } from '@mui/material'

export interface SectionProps extends ContainerProps {
	backgroundColor?: string
	backgroundImage?: string
	sectionProps?: BoxProps<any>
	boxSx?: SxProps
}
export const Section = ({ backgroundColor, backgroundImage, boxSx, sectionProps, sx, ...rest }: SectionProps) => {
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
			<Container sx={{ py: 4, ...sx }} {...rest} />
		</Box>
	)
}
