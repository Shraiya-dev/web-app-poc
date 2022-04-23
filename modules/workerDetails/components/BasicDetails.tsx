import { Grid, Box, Typography, Stack, Chip } from '@mui/material'

export const BasicDetails = () => {
	return (
		<Box>
			<Grid container margin={2}>
			<Grid item sm={12} xs={12} md={6} lg={6} direction='column' >
				{/* <Stack spacing={1} style={{ paddingBottom: 20 }} display='block'>
					<Typography variant='h5'>Name</Typography>

					<Typography style={{ opacity: 0.5 }}>RamBabu Kewati</Typography>
				</Stack>

				<Stack spacing={1} style={{ paddingBottom: 20 }} display='flex'>
					<Typography variant='h5'>Age</Typography>
					<Typography style={{ opacity: 0.5 }}>34 y/o</Typography>
				</Stack> */}

				<Stack spacing={1} style={{ paddingBottom: 20 }} >
					<Typography variant='h5' fontSize={18}>Gender</Typography>
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

				{/* <Stack spacing={1} style={{ paddingBottom: 20 }}>
					<Typography variant='h5'>Skills</Typography>
					<Typography>
						<Stack
							direction='row'
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
							}}>
							<Chip color='primary' label='Text1' style={{ margin: 4 }} />
							<Chip color='primary' label='Text2' style={{ margin: 4 }} />
							<Chip color='primary' label='Text1' style={{ margin: 4 }} />
							<Chip color='primary' label='Text2' style={{ margin: 4 }} />
							<Chip color='primary' label='Text1' style={{ margin: 4 }} />
							<Chip color='primary' label='Text2' style={{ margin: 4 }} />
						</Stack>
					</Typography>
				</Stack> */}
			</Grid>

			<Grid item sm={12} xs={12} md={6} lg={6} direction='column'>
				<Stack spacing={1} style={{ paddingBottom: 20 }}>
					<Typography fontSize={18}>Projects completed</Typography>
					<Typography style={{ opacity: 0.5 }}>5</Typography>
				</Stack>

				{/* <Stack spacing={1} style={{ paddingBottom: 20 }}>
					<Typography variant='h5'>Skill Type</Typography>
					<Typography>
						<Stack
							direction='row'
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
							}}>
							<Chip color='primary' label='Text1' style={{ margin: 4 }} />
						</Stack>
					</Typography>
				</Stack> */}

				{/* <Stack spacing={1} style={{ paddingBottom: 20 }}>
					<Typography variant='h5'>Home Address</Typography>
					<Typography style={{ opacity: 0.5 }}>Plot no.23, hometown-city,state,village.</Typography>
				</Stack> */}

				{/* <Stack spacing={1} style={{ paddingBottom: 20 }}>
					<Typography variant='h5'>Languages Known</Typography>
					<Typography>
						<Stack
							direction='row'
							sx={{
								display: 'flex',
								flexWrap: 'wrap',
							}}>
							<Chip color='primary' label='Text1' style={{ margin: 4 }} />
							<Chip color='primary' label='Text2' style={{ margin: 4 }} />
							<Chip color='primary' label='Text1' style={{ margin: 4 }} />
							<Chip color='primary' label='Text2' style={{ margin: 4 }} />
						</Stack>
					</Typography>
				</Stack> */}
			</Grid>
		</Grid>
		</Box>
		
	)
}
