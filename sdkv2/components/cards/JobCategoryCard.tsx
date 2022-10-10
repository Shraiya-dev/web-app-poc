import { Box, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { FC } from 'react'
import { useMobile } from 'sdk/hooks'

interface Props {
	active?: boolean
	src?: string
	label?: string
}
export const JobCategoryCard: FC<Props> = ({ src, active, label }) => {
	const isMobile = useMobile()
	return (
		<Stack alignItems='center' spacing={isMobile ? 2 : 1}>
			<Box
				sx={{ width: isMobile ? 60 : 80, height: isMobile ? 60 : 80, borderRadius: '50%', overflow: 'hidden' }}>
				<Image src={src as any} alt={src} width={isMobile ? 60 : 80} height={isMobile ? 60 : 80} />
			</Box>
			<Typography fontSize={isMobile ? '12px' : '14px'}>{label}</Typography>
		</Stack>
	)
}
