import { Alert, AlertColor, Snackbar } from '@mui/material'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

interface SnackbarState {
	open: boolean
	message: string
	severity: AlertColor
}

interface SnackbarProviderValue {
	showSnackbar: (msg: string, sev: AlertColor) => void
}
const initialState: SnackbarState = {
	open: false,
	message: '',
	severity: 'info',
}
const SnackbarContext = createContext<SnackbarProviderValue>({
	showSnackbar: (msg: string, sev: AlertColor) => null,
})
const { Provider, Consumer } = SnackbarContext

const SnackbarProvider = ({ children }: any) => {
	const [snackbarProps, setSnackbarProps] = useState<SnackbarState>(initialState)
	const closeSnackbar = useCallback(() => {
		setSnackbarProps((prev) => ({ ...prev, open: false }))
	}, [])
	const showSnackbar = useCallback(
		(msg: string, sev: AlertColor) => {
			closeSnackbar()
			setSnackbarProps({
				open: true,
				message: msg,
				severity: sev,
			})
		},
		[closeSnackbar]
	)

	const snackbarProviderValue: SnackbarProviderValue = useMemo(
		() => ({
			showSnackbar: showSnackbar,
		}),
		[showSnackbar]
	)
	return (
		<Provider value={snackbarProviderValue}>
			{children}
			<Snackbar
				autoHideDuration={4000}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={snackbarProps.open}
				onClose={closeSnackbar}>
				<Alert variant='filled' onClose={closeSnackbar} severity={snackbarProps.severity}>
					{snackbarProps.message}
				</Alert>
			</Snackbar>
		</Provider>
	)
}

export const useSnackbar = () => useContext(SnackbarContext)
export { SnackbarProvider, Consumer as SnackbarConsumer, SnackbarContext }
