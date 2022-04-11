import { NextPage } from 'next'
import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import { useFormik } from 'formik'
import OtpInput from 'react-otp-input'
import { Button, Container, TextField, Typography } from '@mui/material'

import { LoginForm } from '../modules/login/components/LoginForm'
import { BasicDetailsForm } from '../modules/login/components/BasicDetailsForm'
import { OnboardingLayout } from '../sdk'

const Item = styled(Paper)(({ theme }) => ({
	// backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	// ...theme.typography.body2,
	// padding: theme.spacing(1),
	textAlign: 'center',
	// color: theme.palette.text.secondary,
	height: '100%',
}))

const Login: NextPage = () => {


	const [isBasicDetailsForm, setIsBasicDetailsForm] = useState(false)

	const renderForm = () => {
		if (isBasicDetailsForm) {
			return <BasicDetailsForm setIsBasicDetails={setIsBasicDetailsForm} />
		} else {
			return <LoginForm setIsBasicDetails={setIsBasicDetailsForm} />
		}
	}
	return (
		<OnboardingLayout>
			<div>{renderForm()}</div>
		</OnboardingLayout>
	)
}

export default Login
