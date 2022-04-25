import { NextPage } from 'next'
import { Box, Button } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { theme } from '../sdk'
import { ArrowBack } from '@mui/icons-material'
import { useRouter } from 'next/router'

import { BasicDetailsForm } from '../modules/onboarding/components/BasicDetailsForm'
import DashboardLayout from '../sdk/layouts/DashboardLayout'

const Profile: NextPage = () => {
	const router = useRouter()
	return (
		<DashboardLayout>
			<Button startIcon={<ArrowBack />} onClick={() => router.back()} variant='text' color='primary'>
				Go Back
			</Button>
			<BasicDetailsForm />
		</DashboardLayout>
	)
}

export default Profile
