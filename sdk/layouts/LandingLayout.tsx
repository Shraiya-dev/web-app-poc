import { CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { Footer, Navbar } from 'sdk/components'
import { landingTheme } from 'sdk/constants/landingTheme'

export const LandingLayout = ({ children }: any) => {
	return (
		<>
			<ThemeProvider theme={landingTheme}>
				<CssBaseline />
				<Navbar />

				<Stack
					sx={{
						body: {
							maxWidth: '100vw !important',
							margin: '0 auto !important',
						},
						html: {},
					}}
					mt='70px'>
					{children}
				</Stack>
				<Footer />
			</ThemeProvider>
		</>
	)
}
