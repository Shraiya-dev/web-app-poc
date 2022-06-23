import { logOutService } from '../apis'

export const LogoutAndRedirect = () => {
	logOutService()
	window.location.replace('https://www.projecthero.in/')
}
