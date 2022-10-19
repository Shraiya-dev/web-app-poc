import axios from 'axios'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { LandingLayout, useContractorAuth, useSnackbar } from 'sdk'

const Page: NextPage = () => {
	const router = useRouter()
	const { showSnackbar } = useSnackbar()
	const { user } = useContractorAuth()
	const getContactDetails = useCallback(
		async (token: string) => {
			try {
				const { data } = await axios.get(`/gateway/customer-api/job-card/connect?token=${token}`)
				const { phoneNumber, redirectUrl } = data?.payload
				if (phoneNumber && typeof window !== 'undefined') {
					window.location.replace('tel:+91' + phoneNumber)
					return
				}
				if (typeof window !== 'undefined') {
					router.replace(redirectUrl)
					return
				}

				showSnackbar('Unauthorized', 'error')
				router.replace('/')
			} catch (error: any) {
				showSnackbar(error?.response?.data?.developerInfo, 'error')
				router.replace('/')
			}
		},
		[router, showSnackbar]
	)
	useEffect(() => {
		if (router.isReady) {
			const token = router.query.token
			getContactDetails(token as string)
		}
	}, [router])
	return (
		<>
			<Head>
				<title>Connecting.......</title>
			</Head>
			<LandingLayout />
		</>
	)
}
export default Page
