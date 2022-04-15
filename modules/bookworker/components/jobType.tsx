import { Grid, Button, Stack, Box } from '@mui/material'

export const JobType = ({ ...props }) => {
	const { icon, jobName } = props

	return (
		<Grid item xs={4} sm={4} md={2} lg={2}>
			<Button
				style={{
					borderRadius: 8,
					padding: 8,
					background: 'white',
					color: 'black',
					height: 100,
					width: 100,
				}}>
				<Box>
					<Stack
						direction='column'
						alignItems='center'
						justifyContent='center'
						style={{ textAlign: 'center' }}>
						{icon}
					</Stack>
					<Stack>{jobName}</Stack>
				</Box>
			</Button>
		</Grid>
	)
}
