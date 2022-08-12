// import Analytics from 'analytics'
// import segmentPlugin from '@analytics/segment'

import { AnalyticsBrowser } from '@segment/analytics-next'
import { envs } from '../constants'

// export const Analytic = Analytics({
// 	app: 'hero-contractor-app',
// 	version: '1.0',
// 	debug: true,
// 	plugins: [
// 		segmentPlugin({
// 			writeKey: envs.SEGMENT_KEY,
// 		}),
// 	],
// })

export const Analytic = AnalyticsBrowser.load({ writeKey: envs.SEGMENT_KEY })
