import { Button, Grid, Paper, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { primary, theme } from '../../constants'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import employeeIcon from '../../../public/assets/icons/employee.svg'
import bookingIcon from '../../../public/assets/icons/bookingIcon.svg'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Analytic } from '../../analytics'
import { ButtonClicked, CardClicked } from '../../analytics/analyticsWrapper'

// export interface ProjectPreview {
// 	bookingId: string
// 	jobType: JOB_TYPES
// 	peopleRequired: {
// 		[key in WORKER_TYPES]?: number
// 	}
// 	state: string
// 	city: string
// 	schedule: {
// 		bookingDuration: string
// 		startDate: Date
// 		shiftTime: string
// 	}
// 	jobCardDetails?: {
// 		[key in JobCardState]?: number
// 	}
// 	createdAt: Date
// 	status?: BOOKING_STATES
// }
// interface ProjectSummary {
// 	booking: ProjectPreview
// }

const CustomPaper = styled(Paper)(({ theme }) => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'hidden',
	paddingBottom: theme.spacing(4),
	padding: 16,
	borderRadius: 8,
	cursor: 'pointer',
	'.cta': {
		borderRadius: 32,
		color: primary.main,
		background: 'rgba(238, 250, 255, 0.6)',
		boxShadow: 'none',
		fontSize: 14,
		fontWeight: 700,
		padding: 8,
		//backgroundOpacity: 0.6,
		height: 32,
	},
	'.info': {
		fontSize: 28,
		textAlign: 'center',
		color: theme.palette.secondary.main,
	},
	'.subInfo': {
		fontSize: 11,
		textAlign: 'center',
		color: theme.palette.secondary.main,
	},
	'.projectName': {
		fontSize: 20,
		fontWeight: 700,
		clear: 'both',
		display: 'inline-block',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
	},
	'.location': {
		fontSize: 12,
		color: theme.palette.secondary.main,
		clear: 'both',
		display: 'inline-block',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		textTransform: 'capitalize',
	},
	button: {
		'&:hover': {
			background: 'rgba(238, 250, 255, 1)',

			boxShadow: 'none',
		},
	},
}))
export const ProjectCard = ({ ...props }) => {
	const { project } = props

	const router = useRouter()

	return (
		<CustomPaper elevation={1}>
			<Stack
				onClick={() => {
					router.push(`/projects/${project?.projectId}/bookings`)
					CardClicked({
						action: 'Open Project',
						page: 'Dashboard',
						projectId: project?.projectId,
						url: router.asPath,
					})
				}}
			>
				<Typography className='projectName'>{project?.name || ''}</Typography>
				<Typography className='location'>
					{' '}
					<LocationOnOutlinedIcon style={{ verticalAlign: 'middle', fontSize: 12, marginBottom: 4 }} />{' '}
					{`${project?.city}, ${project?.state}`}
				</Typography>

				<Grid container spacing={2} pt={3}>
					<Grid item xs={6} md={6} justifyContent={'center'}>
						<Stack justifyContent={'center'}>
							<Image src={employeeIcon} />
							<Typography fontSize={28} textAlign={'center'}>
								{project?.employee || 0}
							</Typography>
							<Typography className='subInfo'>Employees</Typography>
						</Stack>
					</Grid>
					<Grid item xs={6} md={6} justifyContent={'center'}>
						<Stack justifyContent={'center'}>
							<Image src={bookingIcon} />
							<Typography fontSize={28} textAlign={'center'}>
								{project?.bookingCount || 0}
							</Typography>
							<Typography className='subInfo'>Bookings</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Stack>

			<Stack rowGap={1} mt={2}>
				<Button
					fullWidth
					className='cta'
					onClick={() => {
						router.push(`/projects/${project.projectId}/bookings/create`)

						ButtonClicked({
							action: 'Book Workers',
							page: 'Dashboard',
							projectId: project?.projectId,
							url: router.asPath,
						})
					}}
					style={{
						background: theme.palette.primary.light,
						color: '#000',
					}}
				>
					Book Workers
				</Button>
				{/* <Button fullWidth className='cta'>
					Manage Attendance
				</Button> */}
			</Stack>
		</CustomPaper>
	)
}
