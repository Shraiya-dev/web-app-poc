import { ThemeProvider } from '@mui/material/styles'
import axios, { AxiosError, AxiosResponse } from 'axios'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ContractorAuthProvider, SERVER_URL, theme } from '../sdk'
import '../sdk/styles/onlyCssWeNeed.css'

//=====================initializing axios interceptor=======================
axios.defaults.baseURL = SERVER_URL
axios.interceptors.request.use(
	(request: any) => {
		console.log('interceptor reached')
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
		const originalRequest = error.config
		const refreshToken = localStorage.getItem('refreshToken')
		if (refreshToken && error?.response?.status === 401) {
			//todo add retry logic here to retry login before logout
			localStorage.clear()
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
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		)
	}
	// else contractor node
	return (
		<ThemeProvider theme={theme}>
			<ContractorAuthProvider>
				<Component {...pageProps} />
			</ContractorAuthProvider>
		</ThemeProvider>
	)
}

export default MyApp
