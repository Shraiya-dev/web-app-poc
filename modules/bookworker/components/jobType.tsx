import { Grid, Button, Stack, Box } from '@mui/material'
import { useState, useEffect } from 'react';

export const JobType = ({ ...props }) => {
	const { icon, jobName } = props

	const [selectedJob, setSelectedjob] = useState('');

	const handleClick = ()=>{
		console.log("hello",jobName)
		setSelectedjob(jobName);
	}

	return (
		<Grid item xs={4} sm={4} md={2} lg={2}>
			<Button
			onClick={handleClick}
				style={{
					borderRadius: 8,
					padding: 8,
					background: selectedJob===jobName?'white':'red',
					color: 'black',
					height: 100,
					width: 100,
				}}>
				<Box>
					<Stack
					
						direction='column'
						alignItems='center'
						justifyContent='center'
						style={{ textAlign: 'center' }} >
						{icon}
					</Stack>
					<Stack>{jobName}</Stack>
				</Box>
			</Button>
		</Grid>
	)
}
