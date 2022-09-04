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
	// let domain = 'projecthero.in'
	// if (process.env.NODE_ENV !== 'production') {
	// 	domain = 'localhost'
	// }
	document.cookie = `${cookieName} = ${cookieValue};expires = ${date.toUTCString()};`
}

export function clearCookie() {
	document.cookie.split(';').forEach(function (c) {
		document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
	})
}
export const deleteCookie = (name: string) => {
	// let domain = 'projecthero.in'
	// if (process.env.NODE_ENV !== 'production') {
	// 	domain = 'localhost'
	// }
	document.cookie = `${name}= ; expires=${new Date().toUTCString()}; path=/;`
	document.cookie = `${name}= ; domain =projecthero.in; expires=${new Date().toUTCString()}; path=/;`
}

export const getUtmObject = (): any | undefined => {
	let queryObj = undefined
	try {
		if (typeof window !== `undefined`) {
			const utmParams = getCookie('utmParams')

			if (utmParams.length > 0) {
				queryObj = JSON.parse('{"' + decodeURI(utmParams.replace(/&/g, '","').replace(/=/g, '":"')) + '"}')

				for (const [key, value] of Object.entries(queryObj)) {
					if (!key.includes('utm_')) {
						delete queryObj[key]
					}
				}

				return queryObj
			}
		}

		return queryObj
	} catch (error) {
		clearCookie()
		console.log(error)
	}
	return queryObj
}
