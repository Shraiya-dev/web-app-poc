import React, { useState } from 'react'
import { useRouter } from 'next/router'

// Material UI
import { Dialog, DialogContent, Button, Typography, Stack, Box, Grid, Card, Paper } from '@mui/material'
import { primary } from 'sdk'

const ConfirmCancel = ({ ...props }) => {
	const { onCloseDialog, setOncloseDialog, header, buttonLabel } = props

	const router = useRouter()
	const handleCancel = () => {
		setOncloseDialog(false)
	}

	return (
		<Dialog style={{ zIndex: 1800 }} open={onCloseDialog} keepMounted onClose={handleCancel}>
			<Box component={Paper}>
				<DialogContent>
					<Typography variant='h5' color={primary.properDark}>
						{header}
					</Typography>
					<Typography color={'#4d4d4d'} style={{ marginBottom: 30, marginTop: 10, fontSize: 14 }}>
						Your changes will not be saved
					</Typography>
					<Stack direction={'row'} justifyContent={'flex-end'} style={{ width: '100%', paddingLeft: 20 }}>
						<Button variant='outlined' onClick={handleCancel} style={{ marginRight: 10 }}>
							{`Continue`}
						</Button>
						<Button onClick={() => router.back()}> Leave</Button>
					</Stack>
				</DialogContent>
			</Box>
		</Dialog>
	)
}

export default ConfirmCancel
