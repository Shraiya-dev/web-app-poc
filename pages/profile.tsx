import { NextPage } from 'next'
import { Box, Button } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { theme } from '../sdk';

import { BasicDetailsForm } from '../modules/onboarding/components/BasicDetailsForm'
import DashboardLayout from '../sdk/layouts/DashboardLayout'

const Profile: NextPage = () => {
	return (
		<DashboardLayout>
			<Box style={{ paddingTop: '1em' }}>
				<Button
					href='/dashboard'
					startIcon={
						<KeyboardBackspaceIcon style={{ fontSize: '24px', color:theme.palette.primary.main }} />
					}
					variant='text'>
					Back
				</Button>
			</Box>
			<BasicDetailsForm />
		</DashboardLayout>
	)
}

export default Profile
