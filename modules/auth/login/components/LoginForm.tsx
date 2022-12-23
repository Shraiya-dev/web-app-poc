import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Button, Checkbox, FormControlLabel, Stack, styled, Typography } from '@mui/material'

import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { InputWrapper } from 'sdkv2/components'
import {
	checkError,
	externalLinks,
	getCookie,
	primary,
	sendAnalytics,
	useContractorAuth,
	useMobile,
} from '../../../../sdk'
import { PhoneField } from '../../../../sdk/components/Input/PhoneField'
import useLogin from '../hooks/useLogin'
import { getSelectorsByUserAgent, useDeviceSelectors } from 'react-device-detect'

const CustomLoginStyles = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',

	'.info': {
		margin: 10,
	},
	'.headerInfo': {
		//paddingBottom: 48,
		fontSize: 30,
		textAlign: 'center',
		fontWeight: 700,
	},
	'.subHeader': {
		fontSize: 14,
		paddingBottom: 8,
		marginTop: 48,
	},
	'.cta': {
		marginTop: 48,
		width: '100%',
		//background: '#244CB3',
		cursor: 'pointer',
	},
	'.register': {
		paddingTop: 24,
		textAlign: 'center',
		justifyContent: 'center',
	},
}))

export const LoginForm = ({ ...props }) => {
	const { form, loading, error, isRegister, handleLogin, status } = useLogin()
	const { isOtpSent, setIsOtpSent, fromHome } = props
	const [isDiscoveryBooking, setIsDiscoveryBooking] = useState<boolean>(false)
	const { handleWhatsApp, isWhatsAppOptIn } = useContractorAuth()
	const isMobile = useMobile()

	const router = useRouter()

	useEffect(() => {
		if (status === 'success') {
			setIsOtpSent(true)
		}
	}, [form, setIsOtpSent, status])
	useEffect(() => {
		if (!!getCookie('discoveryBooking')) setIsDiscoveryBooking(true)
		else setIsDiscoveryBooking(false)
	}, [isDiscoveryBooking, router])

	return (
		<form onSubmit={form.handleSubmit}>
			<CustomLoginStyles>
				<Stack spacing={1.5} width='100%' px={1.5} mb={'15px'}>
					{!!fromHome ? (
						<Typography
							variant='h1'
							textAlign={'center'}
							sx={{
								color: !!fromHome ? primary?.properDark : '#fff',
								fontWeight: 700,
								fontFamily: 'Saira,sans-serif',
								fontSize: 30,
							}}>
							{isRegister ? 'Register' : 'Login'}
						</Typography>
					) : (
						<Typography
							textAlign='center'
							fontSize={34}
							variant='h1'
							sx={{
								color: !!fromHome ? primary?.properDark : '#ccc',
								fontWeight: 700,
								fontFamily: 'Saira,sans-serif',
								fontSize: 30,
							}}>
							{isRegister ? 'Register' : 'Login'}
						</Typography>
					)}

					<InputWrapper
						label='Enter Phone Number'
						sx={{
							color: !!fromHome ? '#000' : '#ccc',
							fontFamily: 'Saira,sans-serif',
							fontWeight: 400,
							fontSize: '13px',
						}}>
						<PhoneField
							error={!!checkError('phoneNumber', form)}
							id='phoneNumber'
							name='phoneNumber'
							placeholder='Enter Phone Number'
							helperText={
								checkError('phoneNumber', form) !== 'valid' ? checkError('phoneNumber', form) : ''
							}
							sx={{
								width: '100%',
								'& .MuiOutlinedInput-root': {
									// outline: '1px solid #ccc',
									border: '1px solid #ccc',
									overflow: 'hidden',
								},
							}}
							value={form.values.phoneNumber}
							onChange={form.handleChange}
						/>
					</InputWrapper>
					<FormControlLabel
						control={
							<Checkbox checked={isWhatsAppOptIn} value={isWhatsAppOptIn} onClick={handleWhatsApp} />
						}
						label='Send me whatsapp updates'
						sx={{
							'& .MuiTypography-root': {
								color: primary.properDark,
							},
							'& .MuiFormControlLabel-root': {
								mt: '12px',
							},
						}}
					/>
					<LoadingButton fullWidth type='submit' loading={!!loading} variant='contained'>
						{isRegister ? 'Register' : 'Login'}
					</LoadingButton>

					<Stack className='register' direction={'row'} style={{ cursor: 'pointer' }}>
						<Typography color={primary?.properDark} mr={1}>
							{isRegister ? `Already have an account?` : `Don't have an account?`}
						</Typography>
						<a
							href={
								(isMobile
									? externalLinks.contractorDeepLinkApp
									: externalLinks.contractorPlayStoreApp) +
								(getCookie('utmParams') || externalLinks.fixUtmForApp)
							}
							onClick={() => {
								sendAnalytics({
									name: 'contractorAppPlayStore',
									action: 'ButtonClick',
									metaData: {
										origin: 'Login Dialog',
									},
								})
							}}
							target='_blank'
							rel='noopener noreferrer'>
							<Box
								color={'primary.main'}
								sx={{
									textDecoration: 'underline',
									fontSize: 14,
								}}>
								Download App
							</Box>
						</a>
					</Stack>
				</Stack>
			</CustomLoginStyles>
		</form>
	)
}
