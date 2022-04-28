import { NextPage } from 'next'
import { LoginForm } from '../modules/login/components/LoginForm'
import { OnboardingLayout } from '../sdk'
import { Box } from '@mui/material'

const Login: NextPage = () => {
	return (
		<OnboardingLayout>
			<LoginForm />
		</OnboardingLayout>
	)
}

export default Login
