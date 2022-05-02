import { ThemeProvider } from '@mui/material/styles'
import axios, { AxiosError, AxiosResponse } from 'axios'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ContractorAuthProvider, SERVER_URL, SnackbarProvider, theme } from '../sdk'
import '../sdk/styles/onlyCssWeNeed.css'
import Head from 'next/head'
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
axios.interceptors.response.use(
	(response: AxiosResponse) => {
		return response
	},
	async (error: AxiosError) => {
		console.log(error?.response?.status)

		const originalRequest = error.config
		const refreshToken = localStorage.getItem('refreshToken')
		if (error?.response?.status === 401) {
			//todo add retry logic here to retry login before logout
			localStorage.clear()
			if (window.location.pathname !== `/login`) {
				window.location.href = `/login`
			}
			return
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
