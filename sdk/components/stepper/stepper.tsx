import { Box, Grid, Stack, styled } from '@mui/material'
import { primary } from '../../constants'

const CustomProjectStyle = styled(Box)(({ theme }) => ({
	'.stepper': {
		height: 6,
		width: 36,

		borderRadius: 8,
		margin: 4,
		background: theme.palette.secondary.light,
	},
}))

export const CustomStepper = ({ ...props }) => {
	const { step, inputSteps } = props

	const ListStepper = () => {
		let rows = []
		for (let i = 1; i <= inputSteps; i++) {
			rows.push(
				<Stack
					className='stepper'
					style={{
						background: `${step === i ? primary.properDark : 'rgba(0,0,0,0.4)'}`,
						opacity: step === i ? 1 : 0.6,
					}}
				/>
			)
		}
		return rows
	}

	return (
		<CustomProjectStyle>
			<Box display='flex'>
				<Grid container justifyContent='flex-start' style={{ marginTop: 20 }}>
					{ListStepper()}
				</Grid>
			</Box>
		</CustomProjectStyle>
	)
}
