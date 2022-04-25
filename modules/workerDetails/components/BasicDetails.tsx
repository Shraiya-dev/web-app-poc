import { Grid, Box, Typography, Stack, Chip } from '@mui/material'

export const BasicDetails = () => {
	return (
		<Box>
			<Grid container margin={2}>
				<Grid item sm={12} xs={12} md={6} lg={6} direction='column'>
					<Stack spacing={1} style={{ paddingBottom: 20 }}>
						<Typography variant='h5' fontSize={18}>
							Gender
						</Typography>
						<Typography style={{ opacity: 0.5 }}>Male</Typography>
					</Stack>

					<Stack spacing={1} style={{ paddingBottom: 20 }}>
						<Typography fontSize={18}>Marital Status</Typography>
						<Typography style={{ opacity: 0.5 }}>Single</Typography>
					</Stack>

					<Stack spacing={1} style={{ paddingBottom: 20 }}>
						<Typography fontSize={18}>Experience</Typography>
						<Typography style={{ opacity: 0.5 }}>4 years 8 months</Typography>
					</Stack>
				</Grid>

				<Grid item sm={12} xs={12} md={6} lg={6} direction='column'>
					<Stack spacing={1} style={{ paddingBottom: 20 }}>
						<Typography fontSize={18}>Projects completed</Typography>
						<Typography style={{ opacity: 0.5 }}>5</Typography>
					</Stack>
				</Grid>
			</Grid>
		</Box>
	)
}
