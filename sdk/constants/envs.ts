const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'STAGE'

const enum ENV_Types {
	DEV = 'DEV',
	PROD = 'PROD',
	STAGE = 'STAGE',
}
const AppEnvConfig: {
	[key in ENV_Types]: { SERVER_URL: string; SEGMENT_KEY: string; RAZOR_PAY_KEY?: string }
} = {
	DEV: {
		SERVER_URL: 'https://dev-api.projecthero.in',
		SEGMENT_KEY: 'vgfJ6TLq447xB45FZU3IQTtdeHSIQGvE',
	},
	STAGE: {
		SERVER_URL: 'https://stage-api.projecthero.in',

		SEGMENT_KEY: 'vgfJ6TLq447xB45FZU3IQTtdeHSIQGvE',
		RAZOR_PAY_KEY: 'rzp_test_5Cq7IvEn1S6ykT',
	},
	PROD: {
		SERVER_URL: 'https://api.projecthero.in',
		SEGMENT_KEY: 'THQyDjO2eB8m23i0XERwybAABIYsRNvw',
		RAZOR_PAY_KEY: 'rzp_live_EjKSlAc9GcAw7S',
	},
}
export const envs = AppEnvConfig[NEXT_PUBLIC_APP_ENV as ENV_Types]
