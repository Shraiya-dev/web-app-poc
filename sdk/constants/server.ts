// get server url based on the NODE_ENV
const getSeverUrl = () => {
	if (process.env.NODE_ENV === 'development' || !process.env.NODE_ENV) {
		return process.env.NEXT_PUBLIC_SERVER_URL_STAGING
	}
	return process.env.NEXT_PUBLIC_SERVER_URL
}

const SERVER_URL = getSeverUrl()

export { SERVER_URL }
