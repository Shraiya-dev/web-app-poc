import { CssBaseline, Stack, ThemeProvider } from '@mui/material'
import { Box } from '@mui/system'
import { Footer, Navbar } from 'sdk/components'
import { landingTheme } from 'sdk/constants/landingTheme'

export const LandingLayout = ({ children }: any) => {
	return (
		<>
			<ThemeProvider theme={landingTheme}>
				<CssBaseline />
				<Navbar />

				<Stack
					mt='70px'
					maxHeight='calc(100vh - 70px)'
					minHeight='calc(100vh - 70px)'
					sx={{
						overflowY: 'scroll',
					}}>
					<Stack flex={1}>{children}</Stack>
					<Footer />
				</Stack>
			</ThemeProvider>
		</>
	)
}
