import { NextPage } from 'next'
import { LoginForm } from '../modules/login/components/LoginForm'
import { OnboardingLayout } from '../sdk'
import { Box } from '@mui/material'
import Head from 'next/head'

const Login: NextPage = () => {
	return (
		<>
			<Head>
				<title>Login | Project Hero</title>
				<meta name='description' content='' />
			</Head>
			<OnboardingLayout>
				<LoginForm />
			</OnboardingLayout>
		</>
	)
}

export default Login
