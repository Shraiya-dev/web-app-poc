import { Typography, Box, styled, Stack, TextField, Select, MenuItem } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'

import useEmailVerification from '../hooks/useEmailVerification'
import { useRouter } from 'next/router'
import { checkError, getCustomerRoles, getSelectOptions, InputWrapper, theme } from '../../../../sdk'
import BackButton from '../../../../sdk/components/backButton/backButtom'
import { companyRoles } from '../../../../sdk'
import { useEffect, useState } from 'react'
import { NameField } from '../../../../sdk/components/Input/nameField'
import { OnboardingCard } from '../../../../sdk/layouts/OrganisationCard'

const CustomEmailVerifyFormStyles = styled(Box)(({ theme }) => ({
	margin: 8,

	'.headerInfo': {
		marginBottom: 48,
		fontSize: 30,
		fontWeight: 700,
		//textAlign: 'center',
	},
	'.info': {
		marginTop: 44,
		marginBottom: 12,
		fontSize: 13,
		color: theme.palette.secondary.main,
		textAlign: 'center',
	},
	'.cta': {
		width: '100%',
		color: 'white',
		cursor: 'pointer',
	},
}))
export const EmailVerificationForm = () => {
	const { form, loading } = useEmailVerification()
	const [customerRoles, setCustomerRoles] = useState()

	const router = useRouter()

	useEffect(() => {
		getCustomerRoles()
			.then((res) => {
				setCustomerRoles(res?.data?.payload?.designations)
			})
			.catch((error) => {
				console.log('error', error)
			})
	}, [])

	return (
		<OnboardingCard title='Leave without completing profile?'>
			<CustomEmailVerifyFormStyles>
				<form onSubmit={form.handleSubmit}>
					<Typography className='headerInfo'>Tell us about yourself</Typography>

					<Stack spacing={3}>
						<InputWrapper id='name' label='Name'>
							<NameField
								id='name'
								name='name'
								value={form.values.name}
								//onChange={form.handleChange}
								onBlur={form.handleBlur}
								placeholder='Full Name'
								error={!!checkError('name', form)}
								helperText={checkError('name', form)}
								fullWidth
								onChange={form.handleChange}
							/>
						</InputWrapper>
						<InputWrapper
							id='email'
							label='Company Email'
							toolTip='Use email with your company domain e.g. rahul@gecpl.com'>
							<TextField
								id='email'
								name='email'
								value={form.values.email}
								onChange={form.handleChange}
								onBlur={form.handleBlur}
								placeholder='name@company.com'
								error={!!checkError('email', form)}
								helperText={checkError('email', form)}
							/>
						</InputWrapper>

						<InputWrapper id='companyRole' label='Designation'>
							<Select
								labelId='companyRole'
								id='companyRole'
								name='companyRole'
								value={form.values.companyRole}
								onChange={form.handleChange}>
								<MenuItem value={'none'}>Select Designation</MenuItem>
								{getSelectOptions(customerRoles)}
							</Select>
						</InputWrapper>
					</Stack>

					<Typography className='info'>Your email will be verified in the next step</Typography>
					<LoadingButton
						className='cta'
						type='submit'
						loading={!!loading}
						variant='contained'
						disabled={
							!!loading ||
							!form.isValid ||
							form.values.companyRole === 'none' ||
							!form.values.email ||
							!form.values.name
						}>
						Continue
					</LoadingButton>
				</form>
			</CustomEmailVerifyFormStyles>
		</OnboardingCard>
	)
}
