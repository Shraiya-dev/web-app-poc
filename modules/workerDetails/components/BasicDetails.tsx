import { Grid, Box, Typography, Stack, styled } from '@mui/material'

const BasicDetailsStyle = styled(Box)(({ theme }) => ({
	'.stack': {
		paddingBottom: 20,
	},
	'.textInfo': {
		color: theme.palette.secondary.main,
	},
}))

export const BasicDetails = ({ ...props }) => {
	const { workerData } = props
	return (
		<BasicDetailsStyle>
			<Box>
				<Grid container margin={2}>
					<Grid item sm={12} xs={12} md={6} lg={6} direction='column'>
						<Stack spacing={1} className='stack'>
							<Typography fontSize={18}>Gender</Typography>
							<Typography className='textInfo'>{workerData?.gender || ''}</Typography>
						</Stack>

						{/* <Stack spacing={1} className='stack'>
							<Typography fontSize={18}>Marital Status</Typography>
							<Typography className='textInfo'>{workerData?.maritalStatus || ''}</Typography>
						</Stack> */}

						<Stack spacing={1} className='stack'>
							<Typography fontSize={18}>Experience</Typography>
							<Typography className='textInfo'>{workerData?.workDetails?.experience || ''}</Typography>
						</Stack>
					</Grid>

					<Grid item sm={12} xs={12} md={6} lg={6} direction='column'>
						<Stack spacing={1} className='stack'>
							<Typography fontSize={18}>Projects completed</Typography>
							<Typography className='textInfo'>{workerData?.pastProjects.length() || ''}</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Box>
		</BasicDetailsStyle>
	)
}
