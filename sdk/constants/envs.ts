import { FirebaseOptions } from 'firebase/app'

const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'STAGE'

const enum ENV_Types {
	DEV = 'DEV',
	PROD = 'PROD',
	STAGE = 'STAGE',
}
const AppEnvConfig: {
	[key in ENV_Types]: {
		SERVER_URL: string
		SEGMENT_KEY: string
		RAZOR_PAY_KEY?: string
		firebaseConfig?: FirebaseOptions
	}
} = {
	DEV: {
		SERVER_URL: 'https://dev-api.projecthero.in',
		SEGMENT_KEY: 'vgfJ6TLq447xB45FZU3IQTtdeHSIQGvE',
	},
	STAGE: {
		SERVER_URL: 'https://stage-api.projecthero.in',

		SEGMENT_KEY: 'vgfJ6TLq447xB45FZU3IQTtdeHSIQGvE',
		RAZOR_PAY_KEY: 'rzp_test_5Cq7IvEn1S6ykT',
		firebaseConfig: {
			apiKey: 'AIzaSyAkvn8ca8PeLqU-ptHtTKAsEdqenw1f1fM',
			authDomain: 'stage-web-app-b92ec.firebaseapp.com',
			projectId: 'stage-web-app-b92ec',
			storageBucket: 'stage-web-app-b92ec.appspot.com',
			messagingSenderId: '34064197069',
			appId: '1:34064197069:web:1df140c52abc1b2818d084',
		},
	},
	PROD: {
		SERVER_URL: 'https://api.projecthero.in',
		SEGMENT_KEY: 'THQyDjO2eB8m23i0XERwybAABIYsRNvw',
		RAZOR_PAY_KEY: 'rzp_live_EjKSlAc9GcAw7S',
	},
}
export const envs = AppEnvConfig[NEXT_PUBLIC_APP_ENV as ENV_Types]
