/* eslint-disable @next/next/next-script-for-ga */
import { ThemeProvider } from '@mui/material/styles'
import axios, { AxiosError, AxiosResponse } from 'axios'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
	ContractorAuthProvider,
	envs,
	GlobalCssProvider,
	logOutService,
	refreshTokenService,
	SEO,
	SnackbarProvider,
	theme,
	USER_TYPE,
} from '../sdk'
import { Analytic } from '../sdk/analytics/analytics'
import '../sdk/styles/onlyCssWeNeed.css'

const queryClient = new QueryClient()

import { landingTheme } from 'sdk/constants/landingTheme'
import { SplashProvider } from 'sdk/providers/SplashProvider'
import { AnalyticsPage, Identify, NewAnalyticsPage } from '../sdk/analytics/analyticsWrapper'
import { createCookieInHour, getCookie } from '../sdk/analytics/helper'
//=====================initializing axios interceptor=======================

axios.defaults.baseURL = envs.SERVER_URL
axios.interceptors.request.use(
	(request: any) => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			request.headers['Authorization'] = `Bearer ${accessToken}`
		}
		return request
	},
	function (error) {
		return Promise.reject(error)
	}
)
// replace console.* for disable log on production
if (process.env.NODE_ENV === 'production') {
	console.log = () => {}
	console.error = () => {}
	console.debug = () => {}
}
let _retry = false
axios.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			const originalRequest = error.config
			const accessToken = localStorage.getItem('accessToken')
			const refreshToken = localStorage.getItem('refreshToken')
			if (accessToken && refreshToken && !_retry) {
				try {
					_retry = true

					const { status, data } = await refreshTokenService(refreshToken, accessToken, USER_TYPE.CONTRACTOR)
					if (!data?.success) {
						Analytic.reset()
						return logOutService()
					}

					localStorage.setItem('accessToken', data.data.accessToken)
					// Analytic.page()
					return window.location.reload()
				} catch (error) {
					return logOutService()
				}
			}
			return logOutService()
		}
		return Promise.reject(error)
	}
)
//=====================axios interceptor end=======================

const domain = {
	stage: 'https://stage-booking.projecthero.in',
	dev: 'https://dev-booking.projecthero.in',
	production: 'https://booking.projecthero.in',
}

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	const fullYearDays = 365
	const cookieExpiryDays = 45
	const { seoData } = pageProps
	useEffect(() => {
		if (router.isReady) {
			const utmParams = router.asPath.includes('utm_')

			if (utmParams) {
				let queryInfo = router.asPath?.split('?')
				createCookieInHour('utmParams', queryInfo[1], cookieExpiryDays)
				if (getCookie('isUTMParamIdentified') === '') {
					createCookieInHour('isUTMParamIdentified', false, fullYearDays)
				}
			}

			if (!localStorage.getItem('accessToken')) {
				Identify({})
			}
			NewAnalyticsPage(router)
		}
	}, [router])

	//if route begin with /admin redirect to admin node
	if (
		[
			'/',
			'/about-us',
			'/contact-us',
			'/privacy-policy',
			'/refund-policy',
			'/tnc',
			'/faq',
			'/hero/plans',
			'/KhulaManch',
		].includes(router.pathname)
	) {
		if (typeof window !== 'undefined') {
			if (window.location.hostname.includes('booking')) {
				window.location.pathname = '/login'
			}
		}
		return (
			<>
				<CommonHead />
				<SEO {...seoData} />

				<QueryClientProvider client={queryClient}>
					<ThemeProvider theme={landingTheme}>
						<GlobalCssProvider>
							<SnackbarProvider>
								<SplashProvider>
									<Component {...pageProps} />
								</SplashProvider>
							</SnackbarProvider>
						</GlobalCssProvider>
					</ThemeProvider>
				</QueryClientProvider>
			</>
		)
	}
	if (typeof window !== 'undefined') {
		if (!window.location.hostname.includes('booking')) {
			if (window.location.hostname.includes('localhost')) {
			} else if (window.location.hostname.includes('stage')) {
				window.location.replace(domain.stage + router.asPath)
			} else if (window.location.hostname.includes('dev')) {
				window.location.replace(domain.dev + router.asPath)
			} else {
				window.location.replace(domain.production + router.asPath)
			}
		}
	}
	return (
		<>
			<CommonHead />
			<SEO {...seoData} />
			<QueryClientProvider client={queryClient}>
				<ThemeProvider theme={theme}>
					<GlobalCssProvider>
						<SnackbarProvider>
							<SplashProvider>
								<ContractorAuthProvider>
									<Component {...pageProps} />
								</ContractorAuthProvider>
							</SplashProvider>
						</SnackbarProvider>
					</GlobalCssProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</>
	)
}

export default MyApp

const CommonHead = () => {
	return (
		<>
			<Script src='https://checkout.razorpay.com/v1/checkout.js' />
			<Head>
				<title>Project hero</title>
				{/* eslint-disable-next-line @next/next/next-script-for-ga */}
				{/* Facebook Pixel Code  */}
				<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
				<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
				<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
				<link rel='manifest' href='/site.webmanifest' />
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta name='theme-color' content='#333333' />
				{process.env.NEXT_PUBLIC_APP_ENV === 'PROD' && (
					<>
						<script>dataLayer = [];</script>

						{/* Facebook pixels */}
						<script
							dangerouslySetInnerHTML={{
								__html: `
										!(function (f, b, e, v, n, t, s) {
											if (f.fbq) return
											n = f.fbq = function () {
												n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
											}
											if (!f._fbq) f._fbq = n
											n.push = n
											n.loaded = !0
											n.version = '2.0'
											n.queue = []
											t = b.createElement(e)
											t.async = !0
											t.src = v
											s = b.getElementsByTagName(e)[0]
											s.parentNode.insertBefore(t, s)
										})(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
										fbq('init', '1285086655286614');
										fbq('track', 'PageView');
										`,
							}}></script>
						<noscript>
							<img
								height='1'
								width='1'
								src='https://www.facebook.com/tr?id=1285086655286614&ev=PageView&noscript=1'
							/>
						</noscript>
						{/* End Facebook Pixel Code */}
						{/* New Google tag manager  */}

						<script
							dangerouslySetInnerHTML={{
								__html: `
							(function (w, d, s, l, i) {
								w[l] = w[l] || []; w[l].push({
									'gtm.start':
										new Date().getTime(), event: 'gtm.js'
								}); var f = d.getElementsByTagName(s)[0],
									j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
										'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
							})(window, document, 'script', 'dataLayer', 'GTM-5JM8G4W');`,
							}}></script>
						{/* END New Google tag manager  */}

						{/* OLD GTM code */}
						<script async src='https://www.googletagmanager.com/gtag/js?id=UA-230793668-1'></script>
						<script
							dangerouslySetInnerHTML={{
								__html: `
						window.dataLayer = window.dataLayer || [];
						  function gtag(){dataLayer.push(arguments);}
						  gtag('js', new Date());
						  gtag('config', 'UA-230793668-1');					
						`,
							}}></script>
						{/* END OLD GTM code */}
					</>
				)}
			</Head>
		</>
	)
}
