import { ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import { theme } from '../sdk'
import '../sdk/styles/onlyCssWeNeed.css'
function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default MyApp
