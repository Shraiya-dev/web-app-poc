export const PathName: Partial<{
	[key in any]: string
}> = {
	'/account': 'Account',
	'/login': 'Login',
	'/onboarding': 'Onboarding',
	'/dashboard': 'Dashboard',
	'/projects/create': 'Create Project',
	'/projects/[projectId]/bookings/create': 'Create Booking',
	'/create-profile': 'Create Profile',
	'/verify-email': 'Verify Email',
	'/create-organisation': 'Create Organisation',
	'/onboarding/failed': 'Organisation Creation Failed',
	'/onboarding/success': 'Organisation Creation Success',
}
