import { Stack, Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StepConnector, { stepConnectorClasses, StepConnectorProps } from '@mui/material/StepConnector'
import { styled } from '@mui/material/styles'
import { StepIconProps } from '@mui/material/StepIcon'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { useRouter } from 'next/router'
import { ThemeContext } from '@emotion/react'
import { useMobile } from 'sdk/hooks'

interface StyledProps extends StepConnectorProps {
	isLogin: boolean
	isMobile: boolean
}

const QontoConnector = styled(StepConnector, { shouldForwardProp: ({ isLogin, isMobile }: any) => true })<StyledProps>(
	({ theme, isLogin = false, isMobile = false }: any) => ({
		[`&.${stepConnectorClasses.alternativeLabel}`]: {
			top: 10,
			left: !isMobile
				? !isLogin
					? 'calc(-83% + 8px)'
					: 'calc(-80% + 8px)'
				: !isLogin
				? 'calc(-89% + 8px)'
				: 'calc(-89% + 8px)',
			right: !isMobile
				? !isLogin
					? 'calc(81% + 8px)'
					: 'calc(79% + 8px)'
				: !isLogin
				? 'calc(86% + 8px)'
				: 'calc(86% + 8px)',
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
	})
)

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

interface Props {
	isLogin: boolean
}

const BookingStepper = ({ isLogin }: Props) => {
	const router = useRouter()
	const isMobile = useMobile()
	const login = isLogin
	return (
		<div>
			<Stack my={2}>
				<Stepper
					alternativeLabel
					activeStep={Number(router?.query?.bookingFromStep ?? 0)}
					connector={<QontoConnector isLogin={login} isMobile={isMobile} />}>
					{stepsName.map((label) => (
						<Step
							key={label}
							sx={{
								px: { xs: '0px', md: '8px' },
							}}>
							<StepLabel
								StepIconComponent={QontoStepIcon}
								sx={{
									alignItems: 'flex-start',
									fontSize: '10px !important',
									span: {
										textAlign: 'left !important',
									},
									'& .MuiStepLabel-label': {
										mt: '0 !important',
										color: '#000',
										fontSize: '10px',
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
		</div>
	)
}

export default BookingStepper
