import { Box, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { useMobile } from '../../hooks'
import CloseIcon from '@mui/icons-material/Close'
import { primary, theme } from '../../constants'
import { CustomStepper } from '../stepper'
import Link from 'next/link'

export const TopBanner = ({ ...props }) => {
	const isMobile = useMobile()
	const {
		header,
		subHeader,
		bannerSvg,
		onClick,
		visibleCloseIcon,
		stepperRequired,
		step,
		linkHeader,
		link,
		paddingLeft,
	} = props

	return (
		// TODO: Banner colour need to be moved to theme
		<Box style={{ background: primary.light }} display='flex'>
			<Container maxWidth={'sm'} style={{ display: 'flex', paddingLeft: isMobile ? 16 : paddingLeft || 80 }}>
				<Stack style={{ marginTop: isMobile ? 16 : 40, marginBottom: isMobile ? 16 : 40 }}>
					<Typography className='header' style={{ fontSize: isMobile ? 24 : 36 }}>
						{header}{' '}
					</Typography>

					<Typography className='subHeader' style={{ fontSize: isMobile ? 13 : 18 }}>
						{subHeader}{' '}
						<Link href={link || ''} passHref>
							<Typography
								className='subHeader'
								display={'inline'}
								style={{
									textDecoration: 'underline',
									textDecorationStyle: 'dotted',
									cursor: 'pointer',
									fontSize: isMobile ? 13 : 18,
								}}>
								{linkHeader || ''}
							</Typography>
						</Link>
					</Typography>

					{stepperRequired && <CustomStepper step={step} inputSteps={2} />}
				</Stack>
			</Container>
			<Stack direction={'row'} justifyContent={'flex-end'}>
				<Image src={bannerSvg} />
				{visibleCloseIcon && (
					<Box justifyContent={'flex-end'} style={{ marginTop: 24, marginRight: 24 }}>
						<CloseIcon
							style={{ fontSize: isMobile ? 24 : 32, cursor: 'pointer', color: primary.main }}
							onClick={onClick}
						/>
					</Box>
				)}
			</Stack>
		</Box>
	)
}
