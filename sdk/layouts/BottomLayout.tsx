import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'

export const BottomLayout = ({ ...props }) => {
	return (
		<Box
			sx={{
				background: '#000',
			}}
		>
			<Stack direction={'row'} spacing={2} justifyContent={'space-around'} position={'sticky'} p={2}>
				<Stack direction={'column'}>
					<DashboardIcon />
					<Typography>Dashboard</Typography>
				</Stack>
				<Stack direction={'column'}>
					<PersonIcon />
					<Typography>Company Profile</Typography>
				</Stack>
				<Stack direction={'column'}>
					<BusinessIcon />
					<Typography>Account</Typography>
				</Stack>
			</Stack>
		</Box>
	)
}
