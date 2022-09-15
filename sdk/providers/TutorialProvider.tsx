import { DoNotDisturb, KeyboardArrowRight, SkipNext } from '@mui/icons-material'
import { AlertColor, alpha, Backdrop, Button, Card, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { getPageData } from 'sdk/analytics'

interface TutorialState {}

interface TutorialProviderValue {}
const initialState: TutorialState = {}
const TutorialContext = createContext<TutorialProviderValue>({
	showSplash: (msg: string, sev: AlertColor) => null,
})
const { Provider, Consumer } = TutorialContext

const TutorialProvider = ({ children }: any) => {
	const value: TutorialProviderValue = useMemo(() => ({}), [])
	const initiate = useCallback(() => {}, [])
	const skip = useCallback(() => {}, [])
	const next = useCallback((event: 'PROJECT_DETAILS' | 'ADD_DETAILS') => {}, [])
	useEffect(() => {
		console.log(getPageData())
	}, [])
	return (
		<Provider value={value}>
			{children}
			<Backdrop open={false} sx={{ p: 2, backgroundColor: `${alpha('#ffffff', 0.4)}` }}>
				<Card
					sx={{
						position: 'absolute',
						top: 140,
						left: 16,
						right: 16,
						p: 2,
						overflow: 'visible',
						borderRadius: 3,
					}}>
					<Stack direction='row' justifyContent='space-between'>
						<Typography variant='subtitle2' fontSize={10} color='primary.main'>
							Add Project Details
						</Typography>
					</Stack>
					<Typography variant='subtitle2' color='common.white'>
						Job postings with updated site details attract 70% more applications from workers. Update
						Details now.
					</Typography>
					<Stack direction='row' justifyContent='flex-end'>
						<Button size='small' sx={{ py: 0 }} color='primary'>
							Add Details
						</Button>
					</Stack>
					<Box
						sx={{
							backgroundColor: '#000000',
							clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
							width: 10,
							height: 10,
							position: 'absolute',
							top: -10,
							left: '46%',
						}}></Box>
				</Card>
				<Card
					sx={{
						position: 'absolute',
						bottom: 70,
						left: 16,
						right: 16,
						p: 2,
						overflow: 'visible',
						borderRadius: 3,
					}}>
					<Stack direction='row' justifyContent='space-between' alignItems={'center'}>
						<Typography variant='subtitle2' fontSize={10} color='primary.main'>
							Dashboard
						</Typography>
						<Button
							endIcon={<KeyboardArrowRight fontSize='small' />}
							size='small'
							sx={{ p: 0 }}
							variant='text'
							color='success'>
							next
						</Button>
					</Stack>
					<Typography variant='subtitle2' color='common.white'>
						All your job postings are here. Click on “View Applications” to see the phone numbers of workers
						who applied to your job
					</Typography>
					<Stack direction='row' justifyContent='space-between'>
						<Button
							startIcon={<DoNotDisturb fontSize='small' sx={{ height: 10 }} />}
							size='small'
							sx={{ p: 0, fontSize: 10 }}
							variant='text'
							color='primary'>
							Skip for Now
						</Button>
					</Stack>
					<Box
						sx={{
							backgroundColor: '#000000',
							clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
							width: 10,
							height: 10,
							position: 'absolute',
							bottom: -10,
							left: '6%',
							transform: 'rotate(180deg)',
						}}></Box>
				</Card>
			</Backdrop>
		</Provider>
	)
}

export const useTutorial = () => useContext(TutorialContext)
export { TutorialProvider, Consumer as TutorialConsumer, TutorialContext }
