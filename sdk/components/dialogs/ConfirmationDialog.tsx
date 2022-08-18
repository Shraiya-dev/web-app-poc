import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import { primary } from 'sdk/constants'
export interface ConfirmationDialogProps {
	title?: string
	caption?: string
	open: boolean
	confirm: Function
	cancel: Function
	confirmationLabel?: string
}
export const ConfirmationDialog = ({
	title,
	caption,
	open,
	confirm,
	cancel,
	confirmationLabel = 'Leave',
}: ConfirmationDialogProps) => {
	return (
		<Dialog maxWidth={'xs'} fullWidth open={open} PaperProps={{ sx: { borderRadius: 3 } }}>
			<Stack p={2} spacing={2}>
				<Stack>
					<Stack spacing={2}>
						{title && (
							<Typography variant='h5' color={primary.properDark}>
								{' '}
								{title}
							</Typography>
						)}
						{caption && (
							<Typography variant='body2' color={primary.darkGrey}>
								{' '}
								{caption}
							</Typography>
						)}{' '}
					</Stack>
				</Stack>
				<Stack direction='row-reverse' spacing={2}>
					<Button variant='contained' onClick={() => confirm()}>
						{confirmationLabel}
					</Button>
					<Button
						variant='outlined'
						onClick={() => cancel()}
						sx={{
							color: primary.properDark,
							border: '1px solid #000',
							'&:hover': {
								border: '1px solid #000',
							},
						}}>
						Cancel
					</Button>
				</Stack>
			</Stack>
		</Dialog>
	)
}

export default ConfirmationDialog
