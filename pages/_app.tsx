import { ThemeProvider } from '@mui/material/styles'
import axios, { AxiosError, AxiosResponse } from 'axios'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
	ContractorAuthProvider,
	logOutService,
	refreshTokenService,
	SERVER_URL,
	SnackbarProvider,
	theme,
	USER_TYPE,
} from '../sdk'
import '../sdk/styles/onlyCssWeNeed.css'
//=====================initializing axios interceptor=======================
axios.defaults.baseURL = SERVER_URL
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
let _retry = false
axios.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	async (error: AxiosError) => {
		const originalRequest = error.config
		const accessToken = localStorage.getItem('accessToken')
		const refreshToken = localStorage.getItem('refreshToken')
		if (accessToken && refreshToken && error.response?.status === 401 && !_retry) {
			_retry = true

			try {
				const { status, data } = await refreshTokenService(refreshToken, accessToken, USER_TYPE.CONTRACTOR)
				if (status === 200) {
					if (!data.success) {
						return logOutService()
					}

					localStorage.setItem('accessToken', data.data.accessToken)
					return window.location.reload()
				}
			} catch (error) {
				return logOutService()
			}
		}
		return Promise.reject(error)
	}
)
//=====================axios interceptor end=======================

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter()
	useEffect(() => {}, [])

	//if route begin with /admin redirect to admin node
	if (router.pathname.includes('/admin')) {
		return (
			<>
				<Head>
					<title>Project Hero</title>
					<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
					<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
					<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
					<link rel='manifest' href='/site.webmanifest' />
					<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
					<meta name='msapplication-TileColor' content='#da532c' />
					<meta name='theme-color' content='#333333' />
				</Head>
				<ThemeProvider theme={theme}>
					<Component {...pageProps} />
				</ThemeProvider>
			</>
		)
	}
	// else contractor node
	return (
		<>
			<Head>
				<title></title>
				{/* Facebook Pixel Code  */}
				{/* eslint-disable-next-line @next/next/next-script-for-ga */}
				{process.env.NEXT_PUBLIC_SERVER_URL === 'https://api.projecthero.in' && (
					<>
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
					</>
				)}
				{/* End Facebook Pixel Code */}
			</Head>
			<ThemeProvider theme={theme}>
				<SnackbarProvider>
					<ContractorAuthProvider>
						<Component {...pageProps} />
					</ContractorAuthProvider>
				</SnackbarProvider>
			</ThemeProvider>
		</>
	)
}

export default MyApp
