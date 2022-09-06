import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { Stack, Step, StepLabel, Stepper } from '@mui/material'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import { styled } from '@mui/material/styles'
import { useRouter } from 'next/router'

const StepperConnectorLine = styled(StepConnector)(({ theme }: any) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-90% + 10px)',
		right: 'calc(90% + 4px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#F2CF47',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#F2CF47',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		background:
			'linear-gradient(90deg, rgba(242,207,71,1) 0%, rgba(242,207,71,1) 40%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 100%)',
		height: 3,
		border: '0px solid transparent',
	},
}))

const StepperIcon = styled('div')<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
	color: '#F2CF47',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#F2CF47',
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#F2CF47',
		zIndex: 1,
		fontSize: 20,
	},
}))

function QontoStepIcon(props: StepIconProps) {
	const { active, completed, className } = props

	return (
		<StepperIcon ownerState={{ active }} className={className}>
			{completed ? (
				<CheckCircleIcon className='QontoStepIcon-completedIcon' />
			) : active ? (
				<AdjustOutlinedIcon className='QontoStepIcon-completedIcon' />
			) : (
				<RadioButtonUncheckedIcon className='QontoStepIcon-completedIcon' />
			)}
		</StepperIcon>
	)
}

const stepsName = ['1. Job Details', '2. Contact Details']

const BookingStepper = ({ step }: { step: number }) => {
	const router = useRouter()
	return (
		<Stack maxWidth={300}>
			<Stepper alternativeLabel activeStep={step} connector={<StepperConnectorLine />}>
				{stepsName.map((label) => (
					<Step key={label}>
						<StepLabel
							StepIconComponent={QontoStepIcon}
							sx={{
								alignItems: 'flex-start',
								fontSize: '10px !important',
								'& span': {
									textAlign: 'left !important',
									color: '#ffffff !important',
								},
								'& .MuiStepLabel-label': {
									mt: '0 !important',
									color: '#ffffff',
									fontSize: '12px',
									fontWeight: 400,
									textAlign: 'left',
								},
								'& .MuiStep-root': {
									p: '0 !important',
								},
								'& .MuiStep-horizontal': {
									p: '0 !important',
								},
							}}>
							{label}
						</StepLabel>
					</Step>
				))}
			</Stepper>
		</Stack>
	)
}

export default BookingStepper
