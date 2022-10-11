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
		FALGSMITH_API_KEY: string
		FALGSMITH_SERVER_URL: string
		firebaseConfig?: FirebaseOptions
	}
} = {
	DEV: {
		SERVER_URL: 'https://dev-api.projecthero.in',
		SEGMENT_KEY: 'vgfJ6TLq447xB45FZU3IQTtdeHSIQGvE',
		FALGSMITH_SERVER_URL: 'https://stage-config.projecthero.in/api/v1/',
		FALGSMITH_API_KEY: 'V92Udh6jBfJozUAbMmAKUt',
	},
	STAGE: {
		SERVER_URL: 'https://stage-api.projecthero.in',
		SEGMENT_KEY: 'vgfJ6TLq447xB45FZU3IQTtdeHSIQGvE',
		RAZOR_PAY_KEY: 'rzp_test_5Cq7IvEn1S6ykT',
		FALGSMITH_SERVER_URL: 'https://stage-config.projecthero.in/api/v1/',
		FALGSMITH_API_KEY: 'GkNx53mXcKzwpgkcgYJcvc',

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
		FALGSMITH_SERVER_URL: 'https://config.projecthero.in/api/v1/',
		FALGSMITH_API_KEY: '7Jq5ju22nzcBbn7sJqvB8R',
		firebaseConfig: {
			apiKey: 'AIzaSyBJ2WJb-Zv_vQrRVXNcGAumUwRtdLbvIbA',
			authDomain: 'project-hero-338817.firebaseapp.com',
			projectId: 'project-hero-338817',
			storageBucket: 'project-hero-338817.appspot.com',
			messagingSenderId: '48173728566',
			appId: '1:48173728566:web:357dd6c56e3931b2982997',
			measurementId: 'G-6NLJYR6FTC',
		},
	},
}
export const envs = AppEnvConfig[NEXT_PUBLIC_APP_ENV as ENV_Types]
