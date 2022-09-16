import { FlashOffOutlined } from '@mui/icons-material'
import { AlertColor, alpha, Backdrop, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TutorialCard } from 'sdk/components'
import { TutorialSteps } from 'sdk/types'

interface TutorialState {}

interface TutorialProviderValue {}
const initialState: TutorialState = {}
const TutorialContext = createContext<TutorialProviderValue>({
	showSplash: (msg: string, sev: AlertColor) => null,
})
const { Provider, Consumer } = TutorialContext

const TutorialProvider = ({ children, pageStaticData }: any) => {
	const router = useRouter()
	const [tutorialState, setTutorialState] = useState<{
		open: boolean
		currentStep?: TutorialSteps
	}>({
		open: false,
	})
	const initiate = useCallback(() => {
		const step = localStorage.getItem('tutorialStep')
		if (!step) {
			localStorage.setItem('tutorialStep', TutorialSteps.DASHBOARD)
		}
		setTutorialState({
			open: step !== TutorialSteps.COMPLETED,
			currentStep: (step ?? TutorialSteps.DASHBOARD) as TutorialSteps,
		})
	}, [])
	const skip = useCallback(() => {
		sessionStorage.setItem('skippedForSessions', 'true')
		setTutorialState({
			open: false,
		})
	}, [])
	const next = useCallback(() => {
		setTutorialState((p) => {
			let open = p.open
			let nextStep = p.currentStep
			let redirectUrl: string | undefined
			switch (p.currentStep) {
				case TutorialSteps.DASHBOARD:
					nextStep = TutorialSteps.PROJECT_DETAILS
					break
				case TutorialSteps.PROJECT_DETAILS:
					open = false
					nextStep = TutorialSteps.COMPLETED
					redirectUrl = `/projects/${router.query.projectId}/details?edit=true`
					break
			}
			localStorage.setItem('tutorialStep', nextStep as string)
			redirectUrl && router.push(redirectUrl as any)
			return {
				open: open,
				currentStep: nextStep,
			}
		})
	}, [router])
	useEffect(() => {
		if (router?.pathname === '/projects/[projectId]/[tab]' && !sessionStorage.getItem('skippedForSessions')) {
			initiate()
		}
	}, [initiate, router])
	const value: TutorialProviderValue = useMemo(() => ({}), [])
	return (
		<Provider value={value}>
			{children}
			<Backdrop open={tutorialState?.open} sx={{ p: 2, backgroundColor: `${alpha('#ffffff', 0.4)}` }}>
				<Box sx={{ position: 'relative', width: '100%', maxWidth: 468, minHeight: '100vh' }}>
					<TutorialCard step={tutorialState?.currentStep} skip={skip} next={next} />
				</Box>
			</Backdrop>
		</Provider>
	)
}

export const useTutorial = () => useContext(TutorialContext)
export { TutorialProvider, Consumer as TutorialConsumer, TutorialContext }
