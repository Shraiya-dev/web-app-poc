import { Button, Dialog, Stack, Typography } from '@mui/material'

export interface ApproveConfirmationDialogProps {
	open: boolean
	date?: string
	cancel?: () => void
	confirm?: () => void
}
export const ApproveConfirmationDialog = ({ cancel, confirm, date, open }: ApproveConfirmationDialogProps) => {
	return (
		<Dialog open={open} fullWidth maxWidth='xs'>
			<Stack p={2}>
				<Typography variant='h5'>Approve work report of {date}?</Typography>
				<Typography mt={1} color='grey.A700' variant='body2'>
					Workers bills will be generated based on approved work report
				</Typography>
				<Stack direction='row' spacing={1} justifyContent='flex-end' mt={3}>
					<Button variant='outlined' sx={{ backgroundColor: 'common.white' }} onClick={cancel}>
						Cancel
					</Button>
					<Button variant='contained' onClick={confirm}>
						Confirm
					</Button>
				</Stack>
			</Stack>
		</Dialog>
	)
}
