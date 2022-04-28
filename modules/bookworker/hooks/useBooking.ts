import { useContractorAuth } from '../../../sdk'
import { useState } from 'react'

export const useBooking = () => {
	const [drawerOpen, setDrawerOpen] = useState<boolean>(false)

	const [bookingFormOpen, setBookingFormOpen] = useState<boolean>(false)

	const [onCloseDialog, setOncloseDialog] = useState<boolean>(false)

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen)
	}

	const toggleBookingForm = () => {
		setOncloseDialog((state) => !state)
	}

	const handleBookingForm = () => {
		setBookingFormOpen((state) => !state)
	}

	return {
		drawerOpen,
		setDrawerOpen,
		bookingFormOpen,
		setBookingFormOpen,
		onCloseDialog,
		setOncloseDialog,
		toggleDrawer,
		toggleBookingForm,
		handleBookingForm,
	}
}
