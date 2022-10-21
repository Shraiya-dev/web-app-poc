import { KeyboardArrowRight, DoNotDisturb, CenterFocusStrong } from '@mui/icons-material'
import { Card, Stack, Typography, Button, Box, Popover, PopoverOrigin, alpha } from '@mui/material'
import next from 'next'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { TutorialSteps } from 'sdk/types'
interface Props {
	open?: boolean
	step?: TutorialSteps
	skip?: Function
	next?: Function
	anchor?: any
}
interface Position {
	content?: {
		heading: string
		description: string
		skip?: boolean
		mainCta?: string
	}
	anchorOrigin?: PopoverOrigin
	arrow?: 'top' | 'bottom'
}
const styles = ''
export const TutorialPopUp: FC<Props> = ({ open = false, step, skip, next, anchor }) => {
	const [oldStyle, setOldStyle] = useState('')
	const {
		anchorOrigin = {
			horizontal: 'center',
			vertical: 'bottom',
		},
		arrow = 'top',
		content,
	}: Position = useMemo((): Position => {
		switch (step) {
			case TutorialSteps.DASHBOARD:
				return {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'top',
					},
					arrow: 'bottom',
					content: {
						description: `All your job postings are here. Click on “View Applications” to see the phone numbers of
                        ProjectHeros who applied to your job.`,
						heading: `Dashboard`,
						mainCta: 'next',
					},
				}
			case TutorialSteps.PROJECT_DETAILS:
				return {
					anchorOrigin: {
						horizontal: 'center',
						vertical: 'bottom',
					},
					arrow: 'top',

					content: {
						description: `Site details wali job posting par 70% zyada projectheroes apply karte hain. Aapki site details abhi add karen aur zyada projectheroes se baat karen.`,
						heading: `Construction site ki details add karen`,
						mainCta: 'Add Details',
						skip: true,
					},
				}

			default:
				return {}
		}
	}, [step])

	const cardRef = useRef<any>()

	// useEffect(() => {
	// 	if (anchor) {
	// 		setOldStyle(anchor.style)
	// 		anchor.style = 'background-color:#000000;color:#ffffff;z-index:9999999;position:relative;border-radius:2px;'
	// 	}
	// 	return () => {
	// 		if (anchor) anchor.style = oldStyle + ';color:#ffffff;'
	// 	}
	// }, [open, anchor, oldStyle])

	return (
		<>
			<Popover
				marginThreshold={12}
				BackdropProps={{
					invisible: false,
					sx: {
						backgroundColor: `${alpha('#ffffff', 0.4)}`,
					},
				}}
				open={open}
				anchorEl={anchor}
				anchorOrigin={anchorOrigin}
				transformOrigin={{
					horizontal: 'center',
					vertical: anchorOrigin?.vertical === 'top' ? 'bottom' : 'top',
				}}
				PaperProps={{
					sx: {
						boxShadow: 'none',
						backgroundColor: 'transparent',
						width: 'calc(100% - 24px)',
						maxWidth: 500,
					},
				}}>
				<Card
					ref={cardRef}
					sx={{
						p: 2,
						mt: arrow !== 'top' ? undefined : '10px',
						mb: arrow !== 'top' ? '10px' : undefined,
						overflow: 'visible',
						borderRadius: 4,

						'&::before': {
							backgroundColor: '#000000',
							content: '""',
							display: 'block',
							position: 'absolute',
							width: 15,
							height: 12,
							transform: `translate(-50%,0) ${(arrow ?? 'top') !== 'top' ? 'rotate(180deg)' : ''}`,

							[arrow ?? 'top']: 0,
							clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
							left:
								anchor?.getBoundingClientRect()?.left -
								(cardRef?.current?.getBoundingClientRect()?.left ?? 12) +
								anchor?.getBoundingClientRect().width / 2 -
								0,
						},
					}}>
					<Stack spacing={1}>
						<Stack direction='row' justifyContent='space-between'>
							<Typography variant='h6' fontSize={10} color='primary.main'>
								{content?.heading}
							</Typography>
						</Stack>
						<Typography variant='subtitle2' color='common.white'>
							{content?.description}
						</Typography>
						<Stack direction='row-reverse' justifyContent='space-between'>
							{content?.mainCta && (
								<Button size='small' onClick={(e) => next && next()} sx={{ py: 0 }} color='primary'>
									{content?.mainCta}
								</Button>
							)}
							{content?.skip && (
								<Button
									startIcon={<DoNotDisturb fontSize='small' sx={{ height: 10 }} />}
									size='small'
									sx={{
										p: 0,
										fontSize: 10,
										color: '#E58A51',
										textDecoration: 'underline',
										'>*': { mr: 0 },
									}}
									variant='text'
									onClick={(e) => skip && skip()}>
									Skip for Now
								</Button>
							)}
						</Stack>
					</Stack>
				</Card>
			</Popover>
		</>
	)
}
