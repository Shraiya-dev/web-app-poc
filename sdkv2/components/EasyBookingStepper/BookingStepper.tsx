import { Stack, Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import { StepIconProps } from '@mui/material/StepIcon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useRouter } from 'next/router'

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.alternativeLabel}`]: {
		top: 10,
		left: 'calc(-50% + 8px)',
		right: 'calc(50% + 8px)',
	},
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#4db07f',
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: '#4db07f',
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#4db07f',
		borderTopWidth: 3,
		borderRadius: 1,
	},
}))

const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
	color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#4db07f',
	display: 'flex',
	height: 22,
	alignItems: 'center',
	...(ownerState.active && {
		color: '#4db07f',
	}),
	'& .QontoStepIcon-completedIcon': {
		color: '#4db07f',
		zIndex: 1,
		fontSize: 20,
	},
}))

function QontoStepIcon(props: StepIconProps) {
	const { active, completed, className } = props

	return (
		<QontoStepIconRoot ownerState={{ active }} className={className}>
			{completed ? (
				<CheckCircleIcon className='QontoStepIcon-completedIcon' />
			) : active ? (
				<AdjustOutlinedIcon className='QontoStepIcon-completedIcon' />
			) : (
				<RadioButtonUncheckedIcon className='QontoStepIcon-completedIcon' />
			)}
		</QontoStepIconRoot>
	)
}

const stepsName = ['Booking Details', 'Wage Details', 'Contact', 'Order Placed']

const BookingStepper = () => {
	const router = useRouter()
	const [activeStepValue, setActiveStepValue] = useState<number>(0)
	return (
		<div>
			<Stack my={2}>
				<Stepper
					alternativeLabel
					activeStep={Number(router?.query?.bookingFromStep ?? 0)}
					connector={<QontoConnector />}>
					{stepsName.map((label) => (
						<Step key={label}>
							<StepLabel
								StepIconComponent={QontoStepIcon}
								sx={{
									fontSize: '10px !important',
									'& .MuiStepLabel-label': {
										mt: '0 !important',
										color: '#000',
										fontSize: '10px',
										fontWeight: 400,
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
		</div>
	)
}

export default BookingStepper
