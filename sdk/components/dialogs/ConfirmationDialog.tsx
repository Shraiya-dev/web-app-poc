import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Button, Dialog, Stack, Typography } from '@mui/material'
import { primary } from 'sdk/constants'
export interface ConfirmationDialogProps {
	title?: string
	caption?: string
	open: boolean
	confirm: Function
	cancel: Function
}
export const ConfirmationDialog = ({ title, caption, open, confirm, cancel }: ConfirmationDialogProps) => {
	return (
		<Dialog maxWidth={'xs'} fullWidth open={open} PaperProps={{ sx: { borderRadius: 3 } }}>
			<Stack p={2} spacing={2}>
				<Stack>
					<Stack spacing={2}>
						{title && (
							<Typography variant='h6' color={primary.properDark}>
								{' '}
								{title}
							</Typography>
						)}
						{caption && (
							<Typography variant='caption' color={primary.properDark}>
								{' '}
								{caption}
							</Typography>
						)}{' '}
					</Stack>
				</Stack>
				<Stack direction='row-reverse' spacing={2}>
					<Button variant='contained' onClick={() => confirm()}>
						Leave
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
