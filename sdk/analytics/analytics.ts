import Analytics from 'analytics'
import segmentPlugin from '@analytics/segment'
import { envs } from '../constants'

export const Analytic = Analytics({
	app: 'hero-contractor-app',
	version: '1.0',
	debug: true,
	plugins: [
		segmentPlugin({
			writeKey: envs.SEGMENT_KEY,
		}),
	],
})
