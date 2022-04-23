import { NextPage } from 'next'
import { Box, Button } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { BasicDetailsForm } from '../modules/onboarding/components/BasicDetailsForm'
import DashboardLayout from '../sdk/layouts/DashboardLayout'

const Profile: NextPage = () => {
	return (
		<DashboardLayout>
			<Box style={{ paddingTop: '1em', paddingLeft: '7em' }}>
				<Button
					href='/dashboard'
					startIcon={
						<ArrowBackIosIcon style={{ fontSize: '24px', marginRight: '12', verticalAlign: 'middle' }} />
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
