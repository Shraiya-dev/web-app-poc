import React, { useState } from 'react'

// Material UI
import { Dialog, DialogContent, Button, Typography, Stack, Box, Grid } from '@mui/material'

const ConfirmCancel = ({ ...props }) => {
	const { onCloseDialog, setOncloseDialog, toggleBookingForm, bookingFormOpen, setBookingFormOpen } = props

	const handleCancel = () => {
		setOncloseDialog(false)
	}

	const handleConfirm = () => {
		setOncloseDialog(false)
		setBookingFormOpen(false)
	}
	return (
		<Dialog style={{ zIndex: 1800 }} open={onCloseDialog} keepMounted onClose={handleCancel}>
			<Box>
				<DialogContent>
					<Typography style={{ fontSize: 20 }}>Leave Booking Workers?</Typography>
					<Typography style={{ marginBottom: 30, marginTop: 10, fontSize: 14 }}>
						There’re unsaved changes
					</Typography>
					<Stack direction={'row'} justifyContent={'flex-end'} style={{ width: '100%', paddingLeft: 20 }}>
						<Button variant='outlined' onClick={handleCancel} style={{ marginRight: 10 }}>
							{' '}
							Continue Booking
						</Button>
						<Button onClick={handleConfirm}> Leave</Button>
					</Stack>
				</DialogContent>
			</Box>
		</Dialog>
	)
}

export default ConfirmCancel
