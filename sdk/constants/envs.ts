const NEXT_PUBLIC_APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'STAGE'

const enum ENV_Types {
	DEV = 'DEV',
	PROD = 'PROD',
	STAGE = 'STAGE',
}
const AppEnvConfig: {
	[key in ENV_Types]: { SERVER_URL: string; SEGMENT_KEY: string }
} = {
	DEV: {
		SERVER_URL: 'http://dev-api.projecthero.in',
		SEGMENT_KEY: 'vgfJ6TLq447xB45FZU3IQTtdeHSIQGvE',
	},
	STAGE: {
		SERVER_URL: 'https://staging-api.projecthero.in',
		SEGMENT_KEY: 'vgfJ6TLq447xB45FZU3IQTtdeHSIQGvE',
	},
	PROD: {
		SERVER_URL: 'https://api.projecthero.in',
		SEGMENT_KEY: 'THQyDjO2eB8m23i0XERwybAABIYsRNvw',
	},
}
export const envs = AppEnvConfig[NEXT_PUBLIC_APP_ENV as ENV_Types]
