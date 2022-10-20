import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Close } from '@mui/icons-material'
import { IconButton, Stack } from '@mui/material'
import { useState } from 'react'
import { ConfirmationDialog } from '../components'
import { LogoutAndRedirect } from '../utils/logoutHelper'

interface OnboardingCardProps {
	children?: any
	confirmation?: boolean
	confirmationContent?: ReactJSXElement
	title?: string
	caption?: string
}
export const OnboardingCard = ({
	children,
	confirmation = true,
	title = 'Leave without creating account?',
	caption = 'You’ll not be able to book ProjectHeros',
}: OnboardingCardProps) => {
	const [dialogProps, setDialogProps] = useState(false)
	return (
		<>
			{false && (
				<ConfirmationDialog
					title={title}
					caption={caption}
					open={dialogProps}
					cancel={() => {
						setDialogProps((p) => !p)
					}}
					confirm={() => {
						LogoutAndRedirect()
					}}
				/>
			)}
			<Stack>
				{false && (
					<Stack direction='row'>
						<IconButton color='primary' onClick={() => setDialogProps(true)}>
							<Close />
						</IconButton>
					</Stack>
				)}
				<Stack>{children}</Stack>
			</Stack>
		</>
	)
}
