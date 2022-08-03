import { Card, Stack, Typography, Box } from '@mui/material'
import { FC } from 'react'
import { Worker } from 'sdkv2/types'
interface Props {
	worker?: Worker
}
export const WorkerCard: FC<Props> = ({ worker }) => {
	return (
		<Card sx={{ flex: 1, overflow: 'hidden' }}>
			<Stack direction='row' p={2}>
				<Stack>
					<svg
						width='57'
						height='67'
						viewBox='0 0 57 67'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink='http://www.w3.org/1999/xlink'>
						<path
							d='M43.3803 32.2769V51.2256C43.3803 51.854 43.1222 52.3927 42.6116 52.8472L36.8826 58.5761C36.4225 59.0306 35.8502 59.2607 35.1657 59.2607H21.6093C20.9247 59.2607 20.3524 59.053 19.8922 58.6322L14.1634 52.9033C13.6864 52.4488 13.4507 51.9045 13.4507 51.2705V32.2714H5.58398V52.331C5.58398 54.3285 6.26856 56.0062 7.63766 57.3753L14.7357 64.4733C16.1553 65.8424 17.833 66.527 19.7688 66.527H37.006C38.9419 66.527 40.6196 65.8256 42.0392 64.4172L49.1373 57.3192C50.54 55.9557 51.247 54.278 51.247 52.2861V32.2657H43.3803V32.2769Z'
							fill='black'
						/>
						<path
							d='M36.9956 21.6927H53.0264V13.9494C53.0264 11.9743 52.1735 10.0834 50.6361 8.84333C46.7701 5.72357 40.5643 2.77214 36.9956 2.66553V21.6927Z'
							fill='#EFC41A'
						/>
						<path d='M34.5062 0H29.5404V7.32246H27.0547V0H22.0889V21.6924H34.5062V0Z' fill='#EFC41A' />
						<path
							d='M55.3309 24.1874H53.0247V24.1818H3.83796V24.1874H1.48695C0.521844 24.1874 0 24.7878 0 25.91V30.556C0 31.6726 0.521844 32.2785 1.48695 32.2785H55.3253C56.2904 32.2785 56.8122 31.6782 56.8122 30.556V25.91C56.8178 24.7878 56.296 24.1874 55.3309 24.1874Z'
							fill='#EFC41A'
						/>
						<path
							d='M19.6104 21.6899V2.6571C16.1147 2.73566 11.1489 5.45704 7.27162 8.46458C5.27407 10.0188 4.07335 11.4104 4.02847 13.9466C3.97797 16.6287 3.89939 19.0022 3.86572 21.6899H19.6104Z'
							fill='#EFC41A'
						/>
						<path
							d='M47.3812 32H8V51.9269C8 52.603 8.26519 53.2522 8.7386 53.735L16.9246 62.0826C17.4103 62.5778 18.0747 62.8569 18.7684 62.8569H36.268C36.9746 62.8569 37.6504 62.5673 38.1377 62.0557L46.9747 52.779C47.4421 52.2884 47.6979 51.6337 47.687 50.9562L47.3812 32Z'
							fill='url(#pattern0)'
						/>
						<defs>
							<pattern id='pattern0' patternContentUnits='objectBoundingBox' width='1' height='1'>
								<use
									xlinkHref='#image0_9_5741'
									transform='translate(0 -0.143357) scale(0.00446429 0.00574426)'
								/>
							</pattern>
							<image id='image0_9_5741' width='224' height='224' xlinkHref={worker?.profileImage} />
						</defs>
					</svg>
				</Stack>
				<Stack flex={1}></Stack>
			</Stack>
			<Stack sx={{ backgroundColor: 'grey.A700' }} p={2} direction='row' justifyContent='space-between'>
				<Typography display='flex' alignItems='center' variant='h5' color='common.white'>
					Rating
					<Typography variant='h3' letterSpacing={3} display='inline' ml={2}>
						{worker?.rating ?? 0}/5
					</Typography>
				</Typography>
				<Stack direction='row' spacing={1}>
					{Array(5)
						.fill('/assets/landingv2/icons/rate0.svg')
						.fill('/assets/landingv2/icons/rate1.svg', 0, worker?.rating ?? 0)
						.map((item, index) => (
							<Box key={index}>
								<img src={item} />
							</Box>
						))}
				</Stack>
			</Stack>
		</Card>
	)
}
