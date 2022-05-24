import { NextPage } from 'next'
import { Box, Button } from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { theme } from '../sdk'
import { ArrowBack, Logout } from '@mui/icons-material'
import { useRouter } from 'next/router'

import { BasicDetailsForm } from '../modules/onboarding/components/BasicDetailsForm'
import DashboardLayout from '../sdk/layouts/DashboardLayout'

import ContractorDashboardLayout from '../sdk/layouts/ContractorDashboardLayout'
import { useContractorAuth } from '../sdk'
import Head from 'next/head'

const Profile: NextPage = () => {
	const router = useRouter()
	const { logOut } = useContractorAuth()
	return (
		<>
			<Head>
				<title>Profile | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			{/* <DashboardLayout> */}
			<ContractorDashboardLayout>
				<BasicDetailsForm />
			</ContractorDashboardLayout>
			{/* </DashboardLayout> */}
		</>
	)
}

export default Profile
