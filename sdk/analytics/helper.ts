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

export function getCookie(cname: any) {
	let name = cname + '='

	if (typeof window !== `undefined`) {
		let decodedCookie = decodeURIComponent(document.cookie)
		let ca = decodedCookie.split(';')
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i]
			while (c.charAt(0) == ' ') {
				c = c.substring(1)
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length)
			}
		}
	}
	return ''
}

export const createCookieInHour = (cookieName: any, cookieValue: any, daysToExpire?: any) => {
	let date = new Date()
	date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000)

	document.cookie = `${cookieName} = ${cookieValue}; Domain = projecthero.in; expires = ${date.toUTCString()};`
}

export const getUtmObject = () => {
	let queryObj
	if (typeof window !== `undefined`) {
		const utmParams = getCookie('utmParams')

		if (utmParams.length > 0) {
			const temp = new URLSearchParams(utmParams)
			// queryObj = JSON.parse('{"' + decodeURI(utmParams.replace(/&/g, '","').replace(/=/g, '":"')) + '"}')

			for (const [key, value] of Object.entries(temp)) {
				if (!key.includes('utm_')) {
					temp.delete(key)
				}
			}

			return queryObj
		}
	}

	return queryObj
}

export function clearCookie() {
	document.cookie.split(';').forEach(function (c) {
		document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
	})
}
