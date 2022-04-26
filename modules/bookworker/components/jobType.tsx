import { Grid, Button, Stack, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { theme } from '../../../sdk'

export const JobType = ({ ...props }) => {
	const { icon, jobName } = props

	const [selectedJob, setSelectedjob] = useState('')

	const handleJobClick = () => {
		setSelectedjob(jobName)
	}

	return (
		<Grid item xs={4} sm={4} md={2} lg={2}>
			<Button
				onClick={handleJobClick}
				style={{
					borderRadius: 8,
					padding: 8,
					background: selectedJob === jobName ? theme.palette.primary.light : 'white',
					color: 'black',
					height: 100,
					width: 100,
					textTransform: 'none',
				}}>
				<Box>
					<Image src={icon} />

					<Stack>{jobName}</Stack>
				</Box>
			</Button>
		</Grid>
	)
}
