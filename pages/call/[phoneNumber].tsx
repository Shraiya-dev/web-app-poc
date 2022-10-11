import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { LandingLayout } from 'sdk'

const Page: NextPage = () => {
	const router = useRouter()
	useEffect(() => {
		if (typeof window !== 'undefined' && router.isReady) {
			window.location.replace('tel:+919825252522')
		}
	}, [router])
	return (
		<>
			<Head>
				<title></title>
			</Head>
			<LandingLayout />
		</>
	)
}
export default Page
