import { JOB_TYPES } from '../types'

export const JobLabel: Partial<{
	[key in JOB_TYPES]: string
}> = {
	GYPSUM: 'Gypsum',
	PAINTER: 'Painter',
	CARPENTER: 'Carpenter',
	ELECTRICAL: 'Electrical',
	MASON: 'Mason',
	BAR_BENDER: 'Bar Bender',
	SHUTTERING_CARPENTER: 'Shuttering Carpenter',
	WELDER_FITTER: 'Welder Fitter',
	GENERAL_HELPER: 'General Helper',
	HVAC: 'HVAC',
	PLUMBING: 'Plumbing',
	ALUMINIUM_FABRICATOR: 'Aluminium Fabricator',
	STONE_TILE_MARBLE_LAYER: 'Stone/Tile/Marble Layer',
}