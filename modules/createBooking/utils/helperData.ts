import Mason from '../../../public/assets/icons/mason.svg'
import Barbender from '../../../public/assets/icons/barbender.svg'
import Plumber from '../../../public/assets/icons/plumber.svg'
import Electrician from '../../../public/assets/icons/electrical.svg'
import Carpenter from '../../../public/assets/icons/carpenter.svg'

import Gypsum from '../../../public/assets/icons/gypsum.svg'
import GeneralWorker from '../../../public/assets/icons/generalworker.svg'
import Painter from '../../../public/assets/icons/painter.svg'
import Stone from '../../../public/assets/icons/stone.svg'
import Hvac from '../../../public/assets/icons/hvac.svg'
import Welderfitter from '../../../public/assets/icons/welderfitter.svg'
import Shuttering from '../../../public/assets/icons/shuttering.svg'
import AluminiumFabricator from '../../../public/assets/icons/aluminiumfabricator.svg'
import { JOB_TYPES } from '../../../sdk'

export const jobTypeInfo = [
	{ icon: Painter, label: 'Painter', value: 'PAINTER' },
	{ icon: Electrician, label: 'Electrician', value: 'ELECTRICAL' },
	{ icon: Mason, label: 'Mason', value: 'MASON' },
	{ icon: Barbender, label: 'Barbender', value: 'BAR_BENDER' },
	{ icon: Carpenter, label: 'Carpenter', value: 'CARPENTER' },
	{ icon: Shuttering, label: 'Shuttering Carpenter', value: 'SHUTTERING_CARPENTER' },
]

export const moreJobType = [
	{ icon: Stone, label: 'Stone / Tile / Marble', value: 'STONE_TILE_MARBLE_LAYER' },
	{ icon: Plumber, label: 'Plumber', value: 'PLUMBING' },
	{ icon: Gypsum, label: 'Gypsum', value: 'GYPSUM' },
	{ icon: AluminiumFabricator, label: 'Aluminium fabricator', value: 'ALUMINIUM_FABRICATOR' },
	{ icon: GeneralWorker, label: 'General Worker', value: 'GENERAL_HELPER' },
	{ icon: Hvac, label: 'Hvac', value: 'HVAC' },
	{ icon: Welderfitter, label: 'Welder fitter', value: 'WELDER_FITTER' },
]

export const overTimefactor = [
	{ label: '1 x Normal Hourly Rate', value: 1 },
	{ label: '1.5 x Normal Hourly Rate', value: 1.5 },
	{ label: '2 x Normal Hourly Rate', value: 2 },
]

export const overTimeLabel: any = {
	1: '1 x Normal Hourly Rate',
	1.5: '1.5 x Normal Hourly Rate',
	2: '2 x Normal Hourly Rate',
}

export const BookingStatusOptions = [
	{
		label: 'All',
		value: 'none',
	},
	{
		label: 'Received',
		value: 'RECEIVED',
	},
	{
		label: 'Confirmed',
		value: 'CONFIRMED',
	},

	{
		label: 'Allocation In Progress',
		value: 'ALLOCATION_IN_PROGRESS,ALLOCATION_PENDING',
	},
	{
		label: 'Allocation Closed',
		value: 'ALLOCATION_CLOSED',
	},
	{
		label: 'RTD',
		value: 'READY_TO_DEPLOY',
	},
	{
		label: 'Deployed',
		value: 'DEPLOYED',
	},
	{
		label: 'Cancelled',
		value: 'CANCELLED',
	},
]

export const tags: any = {
	CARPENTER: ['Modular Furniture', 'Wooden Doors & Windows', 'Solid Wood Furniture', 'Plywood Furniture'],
	BAR_BENDER: ['Manual Barbending', 'Barbending Machine Operator'],
	GENERAL_HELPER: ['Housekeeping', 'Loading/Offloading'],
	ALUMINIUM_FABRICATOR: ['Windows & Doors', 'Partition Works'],
	WELDER_FITTER: ['Structural Fabrication', 'Pre-Engineered Building Structures'],
	PAINTER: [
		'Internal Painting - Plain',
		'External Painting - High Rise',
		'Stucco Painting',
		'Internal Decorative/Texture Painting',
		'Polish & Varnish',
		'Metal Painting',
		'PU/Duco Painting',
	],
	MASON: [
		'Slab/Column Casting',
		'Concreting/Foundation - PCC/RCC/RMC',
		'External Plastering - High Rise',
		'AAC Blockwork',
		'Brickwork',
		'Plastering',
	],
	STONE_TILE_MARBLE_LAYER: [
		'Floor & Wall Tiling',
		'Granite & Stone Works',
		'Marble Laying',
		'Intricate Flooring/Wall Stone Works',
	],
	ELECTRICAL: [
		'Internal Wiring & Terminations',
		'High Side - Panel Erection & Commissioning',
		'Transformer & Switchgear',
		'Low Voltage Works',
	],
	GYPSUM: ['Drywall Partition', 'False Ceiling', 'Gypsum Punning', 'Decorative Gypsum Works'],
	HVAC: [
		'VRV Works',
		'Duct Fabrication & Erection',
		'DX Works',
		'Ducting Insulation',
		'AHU Erection & Commissioning',
	],
	PLUMBING: [
		'Internal Plumbing',
		'External Plumbing - High Rise',
		'Fixtures Installation',
		'Pumps Erection & Commissioning',
	],
	SHUTTERING_CARPENTER: [
		'Aluminium Formwork',
		'Steel Formwork',
		'Plywood Formwork',
		'Fabric Formwork',
		'Timber Formwork',
		'Plastic Formwork',
	],
}

export const JobType = [
	{ label: 'Select Job Type', value: 'none' },
	{ label: 'Carpenter', value: 'CARPENTER' },
	{ label: 'Bar Bender', value: 'BAR_BENDER' },
	{ label: 'General Helper', value: 'GENERAL_HELPER' },
	{ label: 'Aluminium Fabricator', value: 'ALUMINIUM_FABRICATOR' },
	{ label: 'Welder - Fitter', value: 'WELDER_FITTER' },
	{ label: 'Painter', value: 'PAINTER' },
	{ label: 'Mason', value: 'MASON' },
	{ label: 'Stone/Tile/Marble Layer', value: 'STONE_TILE_MARBLE_LAYER' },
	{ label: 'Electrician', value: 'ELECTRICAL' },
	{ label: 'Gypsum', value: 'GYPSUM' },
	{ label: 'HVAC', value: 'HVAC' },
	{ label: 'Plumbing', value: 'PLUMBING' },
	{ label: 'Shuttering Carpenter', value: 'SHUTTERING_CARPENTER' },
]

export const JobTypeIcon: Partial<{
	[key in JOB_TYPES]: any
}> = {
	GYPSUM: Gypsum,
	PAINTER: Painter,
	CARPENTER: Carpenter,
	ELECTRICAL: Electrician,
	MASON: Mason,
	BAR_BENDER: Barbender,
	SHUTTERING_CARPENTER: Shuttering,
	WELDER_FITTER: Welderfitter,
	GENERAL_HELPER: GeneralWorker,
	HVAC: Hvac,
	PLUMBING: Plumber,
	ALUMINIUM_FABRICATOR: AluminiumFabricator,
	STONE_TILE_MARBLE_LAYER: Stone,
}

export const ShiftTime = [
	{
		label: 'Select Shift Time',
		value: 'none',
	},
	{
		label: '9am-6pm',
		value: '9am-6pm',
	},
	{
		label: '6pm-12am',
		value: '6pm-12am',
	},
	{
		label: 'Other',
		value: 'other',
	},
]

export const projectDuration = [
	{ label: 'Less than 30 days', value: 'LESS_THAN_THIRTY' },
	{ label: '30-45 days', value: 'THIRTY_TO_FORTY_FIVE' },
	{ label: '45-90 days', value: 'FORTY_FIVE_TO_NINETY' },
	{ label: '90-150 days', value: 'NINETY_TO_ONE_FIFTY' },
	{ label: '150+ days', value: 'MORE_THAN_ONE_FIFTY' },
]

export enum BookingDuration {
	LESS_THAN_THIRTY = 'LESS_THAN_THIRTY',
	THIRTY_TO_FORTY_FIVE = 'THIRTY_TO_FORTY_FIVE',
	FORTY_FIVE_TO_NINETY = 'FORTY_FIVE_TO_NINETY',
	NINETY_TO_ONE_FIFTY = 'NINETY_TO_ONE_FIFTY',
	MORE_THAN_ONE_FIFTY = 'MORE_THAN_ONE_FIFTY',

	/** @deprecated */
	LESS_THAN_SEVEN = 'less than 7 days',

	/** @deprecated */
	SEVEN_TO_FORTY_FIVE = '7 days to 45 days',

	/** @deprecated */
	FORTY_FIVE_TO_NINETY_OLD = '45 days to 90 days',

	/** @deprecated */
	MORE_THAN_NINETY = 'more than 90 days',
}
