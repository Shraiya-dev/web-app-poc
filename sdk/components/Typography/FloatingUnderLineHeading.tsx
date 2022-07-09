import { Divider, Stack, Typography, TypographyProps } from '@mui/material'

interface Props extends TypographyProps {
	underlinePosition?: 'center' | 'flex-start' | 'flex-end'
	underlineWidth?: string
}
export const FloatingUnderLineHeading = ({
	underlinePosition = 'center',
	underlineWidth = '45%',
	sx,
	...rest
}: Props) => {
	const UnderlineOffset = 100 - Number(underlineWidth.replace('%', ''))
	return (
		<Stack width='fit-content'>
			<Typography fontWeight={700} {...rest} />
			<Divider
				sx={{
					alignSelf: underlinePosition,
					width: underlineWidth,
					border: '2px solid #0663F6',
					backgroundColor: '#0663F6',
					margin: '10px 0',
				}}
			/>
		</Stack>
	)
}
