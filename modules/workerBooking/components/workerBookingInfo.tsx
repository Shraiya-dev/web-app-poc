import { Box } from '@mui/system'
import { Paper, Typography, Button } from '@mui/material'

import { styled } from '@mui/material'
export const WorkerBookingInfo = () => {
	const CustomWorkerBookInfo = styled(Box)(({ theme }) => ({
		'.id': {
			fontSize: 12,
		},
		'.status': {
			justifyContent: 'center',
			background: '#30B12E',
			boxSizing: 'border-box',
			borderRadius: 25,
			fontSize: 10,
			marginLeft: 10,
			padding: 10,
			color: 'white',
		},
	}))

	return (
		<CustomWorkerBookInfo>
			<Box style={{ width: 345, height: 399 }}>
				<Paper elevation={3}>
					<Box style={{ background: 'rgba(36, 76, 179, 0.15)', height: 82 }}>
						<Box>
							<Typography variant='h5' display='inline'>
								Mason
							</Typography>
							<Typography display='inline' className='id'>
								ID: OADSKTUQSIQC
							</Typography>
							<Typography className='status' display='inline'>
								Recieved
							</Typography>
						</Box>
					</Box>
					<Box style={{ height: 317 }}>Hello</Box>
				</Paper>
			</Box>
		</CustomWorkerBookInfo>
	)
}
