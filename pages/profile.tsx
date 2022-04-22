import { NextPage } from 'next'
import { Box, Button } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'

import { BasicDetailsForm } from '../modules/onboarding/components/BasicDetailsForm'

const Profile: NextPage = () => {
	return (
		<Box>
			<Box style={{ paddingTop: '4em', paddingLeft: '7em' }}>
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
		</Box>
	)
}

export default Profile
