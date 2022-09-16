import { KeyboardArrowRight, DoNotDisturb } from '@mui/icons-material'
import { Card, Stack, Typography, Button } from '@mui/material'
import { Box } from '@mui/system'
import { TutorialSteps } from 'sdk/types'

export const TutorialCard = ({ step, skip, next }: { step?: TutorialSteps; skip?: Function; next?: Function }) => {
	switch (step) {
		case TutorialSteps.DASHBOARD:
			return (
				<Card
					sx={{
						bottom: 80,
						position: 'absolute',
						p: 2,
						overflow: 'visible',
						width: '100%',
						borderRadius: 3,
					}}>
					<Stack direction='row' justifyContent='space-between' alignItems={'center'}>
						<Typography variant='subtitle2' fontSize={10} color='primary.main'>
							Dashboard
						</Typography>
						<Button
							endIcon={<KeyboardArrowRight fontSize='small' />}
							size='small'
							onClick={(e) => next && next()}
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
							sx={{ p: 0, fontSize: 10, color: '#E58A51' }}
							variant='text'
							onClick={(e) => skip && skip()}>
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
			)
		case TutorialSteps.PROJECT_DETAILS:
			return (
				<Card
					sx={{
						top: 140,
						position: 'absolute',
						p: 2,
						overflow: 'visible',
						width: '100%',
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
					<Stack direction='row' justifyContent='justify-content'>
						<Button
							startIcon={<DoNotDisturb fontSize='small' sx={{ height: 10 }} />}
							size='small'
							sx={{ p: 0, fontSize: 10, color: '#E58A51' }}
							variant='text'
							onClick={(e) => skip && skip()}>
							Skip for Now
						</Button>
						<Button size='small' onClick={(e) => next && next()} sx={{ py: 0 }} color='primary'>
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
							left: '38%',
						}}></Box>
				</Card>
			)
		default:
			return null
	}
}
