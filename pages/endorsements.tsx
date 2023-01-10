import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { externalLinks, getCookie, LandingLayout, Section, sendAnalytics, useSnackbar } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'
import Lottie from 'react-lottie'
import animationData from 'public/assets/lottie/successCheckLottie.json'
import axios from 'axios'
import { useRouter } from 'next/router'
import { IDetails, WorkerReferencesStatus } from './employments'

const Endorsements: NextPage = () => {
	const [isGuaranteed, setIsGuaranteed] = useState<string | undefined>(undefined)
	const [steps, setSteps] = useState(0)
	const [token, setToken] = useState<string | undefined>()
	const [details, setDetails] = useState<IDetails | undefined>(undefined)
	const { showSnackbar } = useSnackbar()
	const router = useRouter()

	const handleSubmit = useCallback(async () => {
		try {
			const { data, status } = await axios.put('/gateway/worker-api/references/guarantee', {
				status: isGuaranteed,
				additionalDetails: {},
				token: token,
			})
			if (status === 204) {
				setSteps(1)
				setTimeout(() => setSteps(2), 3000)
			}
		} catch (error) {
			showSnackbar('Something went wrong!', 'error')
		}
	}, [isGuaranteed])

	const getDetails = useCallback(async (token) => {
		try {
			const { data } = await axios.get(`/gateway/worker-api/references/guarantee?token=${token}`)
			setDetails(data?.payload)
		} catch (error) {
			showSnackbar('Something went wrong!', 'error')
		}
	}, [])

	useEffect(() => {
		if (router.isReady) {
			setToken(router.query.token as string)
			getDetails(router.query.token)
		}
	}, [router.isReady])

	return (
		<>
			<LandingLayout>
				<Section backgroundColor='#000000' sx={{ p: 0 }}>
					{steps === 0 ? (
						<Stack>
							<Stack mx={'25px'}>
								<Typography variant='h5' sx={{ color: 'common.white' }} mt={'26px'}>
									{details?.referenceeName} ji,
								</Typography>
								<Typography fontWeight={'300'} sx={{ color: 'common.white' }} mt={'19px'}>
									Humare app pe {details?.workerName} ne bataya ke aap unhe jaante hai.
								</Typography>
							</Stack>
							<Stack
								sx={{
									maxHeight: 350,
									backgroundColor: '#222222',
									mt: '12px',
									px: '16px',
									py: '20px',
									borderTop: '1px dashed #fff',
									borderBottom: '1px dashed #fff',
								}}>
								<Typography variant='h6' fontWeight={'700'} sx={{ color: 'common.white', ml: '10px' }}>
									{details?.workerName.split(' ')[0]} ki Profile
								</Typography>
								<Box
									component={'img'}
									src={details?.imgUrl}
									sx={{ mt: '12px', borderRadius: '12px' }}
								/>
							</Stack>
							<Stack sx={{ ml: '25px', maxWidth: '80%' }}>
								<Typography variant='h6' fontWeight={'500'} mt={'21px'} sx={{ color: 'common.white' }}>
									Kya aap is baat ki pushti karte hai?
								</Typography>
								<Stack
									sx={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-between',
										maxWidth: '85%',
										mt: '14px',
									}}>
									{[
										{ label: 'Yes', value: WorkerReferencesStatus.ACCEPTED },
										{ label: 'No', value: WorkerReferencesStatus.REJECTED },
									].map((item, index) => {
										return item.value === isGuaranteed ? (
											<Button
												sx={{
													width: '118px',
													height: '42px',
													fontWeight: '700',
													fontSize: '16px',
												}}
												key={index}
												variant='contained'>
												{item.label}
											</Button>
										) : (
											<Button
												sx={{
													width: '118px',
													height: '42px',
													fontWeight: '700',
													fontSize: '16px',
													color: 'common.white',
													borderColor: 'common.white',
												}}
												key={index}
												variant='outlined'
												onClick={() => {
													setIsGuaranteed(item.value)
												}}>
												{item.label}
											</Button>
										)
									})}
								</Stack>
							</Stack>
							<Button
								sx={{
									m: '16px',
									height: '48px',
									fontWeight: '700',
									fontSize: '16px',
									bottom: 0,
									mt: '44px',
								}}
								variant='contained'
								onClick={() => {
									handleSubmit()
									sendAnalytics({
										name: 'submitEndorsement',
										action: 'ButtonClick',
										metaData: {
											Status: isGuaranteed ? 'Confirmed' : 'Rejected',
										},
									})
								}}>
								{'Submit'}
							</Button>
						</Stack>
					) : steps === 1 ? (
						<Stack sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
							<Lottie
								options={{
									loop: true,
									autoplay: true,
									animationData: animationData,
									rendererSettings: {
										preserveAspectRatio: 'xMidYMid slice',
									},
								}}
								style={{ marginTop: '205px' }}
								height={120}
								width={120}
							/>
							<Typography variant='body2' sx={{ color: 'common.white', mt: '23px' }}>
								Feedback dene ke liye
							</Typography>
							<Typography
								variant='h6'
								mt={'6px'}
								mb={'323px'}
								fontSize={'20px'}
								sx={{ color: 'common.white' }}>
								Dhanyawad
							</Typography>
						</Stack>
					) : (
						<Stack
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								backgroundImage: `url(${'/assets/endrosmentImages/background.png'})`,
								backgroundSize: 'contain',
								flex: 1,
							}}>
							<Box
								component={'img'}
								mt={'64px'}
								width={300}
								height={323}
								src={'/assets/endrosmentImages/endrosment.png'}
							/>
							<Stack
								component={'a'}
								href={
									externalLinks.heroDeepLinkApp +
									(getCookie('utmParams') || externalLinks.fixUtmForApp)
								}
								onClick={() => {
									sendAnalytics({
										name: 'applicationInstall',
										action: 'ButtonClick',
										metaData: {
											Location: 'EndorsementScreen',
										},
									})
								}}
								target='_blank'
								rel='noopener noreferrer'
								alignItems={'center'}
								mt={'56px'}>
								<Typography variant='h6' fontWeight={'700'} sx={{ color: 'common.white', mb: '5px' }}>
									ऐप डाउनलोड करें
								</Typography>
								<Box
									component={'img'}
									width={215}
									height={62}
									src={'/assets/landingv3/googlePlay.svg'}
									mb={'195px'}
								/>
							</Stack>
						</Stack>
					)}
				</Section>
			</LandingLayout>
		</>
	)
}

export default Endorsements

const pageUrl = '/endorsements'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
