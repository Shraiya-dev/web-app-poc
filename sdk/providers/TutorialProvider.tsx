import { FlashOffOutlined } from '@mui/icons-material'
import { AlertColor, alpha, Backdrop, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { createContext, MutableRefObject, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { sendAnalytics } from 'sdk/analytics'
import { TutorialCard } from 'sdk/components'
import { TutorialPopUp } from 'sdk/components/tutorial/TutorialPopUp'
import { TutorialSteps } from 'sdk/types'

interface TutorialState {}

interface TutorialProviderValue {
	anchor: MutableRefObject<{ [key in TutorialSteps]: HTMLAnchorElement | HTMLDivElement | null }>
}
const initialState: TutorialState = {}
const TutorialContext = createContext<TutorialProviderValue>({
	anchor: {
		current: {
			DASHBOARD: null,
			COMPLETED: null,
			PROJECT_DETAILS: null,
		},
	},
})
const { Provider, Consumer } = TutorialContext

const TutorialEventName: { [key in TutorialSteps]?: string } = {
	PROJECT_DETAILS: 'Add Project Details',
}
const TutorialProvider = ({ children, pageStaticData }: any) => {
	const router = useRouter()
	const [tutorialState, setTutorialState] = useState<{
		open: boolean
		currentStep?: TutorialSteps
	}>({
		open: false,
	})
	const anchor = useRef<{ [key in TutorialSteps]: HTMLAnchorElement | null }>({
		DASHBOARD: null,
		COMPLETED: null,
		PROJECT_DETAILS: null,
	})

	//initialize tutorial
	const initiate = useCallback(() => {
		const step = localStorage.getItem('tutorialStep')
		if (!step) {
			localStorage.setItem('tutorialStep', TutorialSteps.PROJECT_DETAILS)
		}
		setTutorialState(() => {
			return {
				open: step !== TutorialSteps.COMPLETED,
				currentStep: (step ?? TutorialSteps.PROJECT_DETAILS) as TutorialSteps,
			}
		})
	}, [])

	useEffect(() => {
		if (tutorialState.currentStep && tutorialState.currentStep !== TutorialSteps.COMPLETED) {
			sendAnalytics({
				name: 'tutorialImpression',
				action: 'View',
				metaData: {
					tutorialName: TutorialEventName[tutorialState.currentStep as TutorialSteps],
				},
			})
		}
	}, [tutorialState.currentStep])

	const skip = useCallback(() => {
		sessionStorage.setItem('skippedForSessions', 'true')
		sendAnalytics({
			name: 'tutorialInteraction',
			action: 'ButtonClick',
			metaData: {
				tutorialName: TutorialEventName[tutorialState.currentStep as TutorialSteps],
				type: 'Skip',
			},
		})
		setTutorialState({
			open: false,
		})
	}, [tutorialState.currentStep])
	const next = useCallback(() => {
		setTutorialState((p) => {
			let open = p.open
			let nextStep = p.currentStep
			let redirectUrl: string | undefined
			sendAnalytics({
				name: 'tutorialInteraction',
				action: 'ButtonClick',
				metaData: {
					tutorialName: TutorialEventName[tutorialState.currentStep as TutorialSteps],
					type: 'Main CTA',
				},
			})
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
	}, [router, tutorialState.currentStep])
	useEffect(() => {
		if (router?.pathname === '/projects/[projectId]/[tab]' && !sessionStorage.getItem('skippedForSessions')) {
			setTimeout(() => {
				initiate()
			}, 30)
		}
	}, [initiate, router])

	const value: TutorialProviderValue = useMemo(() => ({ anchor }), [anchor])
	return (
		<Provider value={value}>
			{children}
			{/* <TutorialCard step={tutorialState?.currentStep} skip={skip} next={next} /> */}
			<TutorialPopUp
				open={tutorialState?.open}
				anchor={anchor.current[tutorialState.currentStep as TutorialSteps]}
				step={tutorialState.currentStep}
				skip={skip}
				next={next}
			/>
		</Provider>
	)
}

export const useTutorial = () => useContext(TutorialContext)
export { TutorialProvider, Consumer as TutorialConsumer, TutorialContext }
