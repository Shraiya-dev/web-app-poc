import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'

export default function BookingInfo() {
	
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					'& > :not(style)': {
						m: 2,
						width: 337,
						height: 90,
					},
				}}>
				<Paper elevation={3}>
					<div
						style={{
							float: 'left',
							width: 72,
							height: 72,
							background: 'grey',
							margin: 8,
							backgroundColor: '#244CB3',
							opacity: '0.05',
							borderRadius: '4px',
						}}>
						A
					</div>
					<div style={{ margin: 8 }}>
						<div style={{ height: 38, color: '#244CB3', fontSize: 30 }}>20</div>
						<div style={{ fontSize: 18, paddingTop: 8 }}>Total Bookings</div>
					</div>
				</Paper>
				<Paper elevation={3}>
					<div
						style={{
							float: 'left',
							width: 72,
							height: 72,
							background: 'grey',
							margin: 8,
							backgroundColor: '#FF7400',
							opacity: '0.05',
							borderRadius: '4px',
						}}>
						A
					</div>
					<div style={{ margin: 8 }}>
						<div style={{ height: 38, color: '#FF7400', fontSize: 30 }}>20</div>
						<div style={{ fontSize: 18, paddingTop: 8 }}>In Progress Bookings</div>
					</div>
				</Paper>
				<Paper elevation={3}>
					<div
						style={{
							float: 'left',
							width: 72,
							height: 72,
							background: 'grey',
							margin: 8,
							backgroundColor: '#30B12E',
							opacity: '0.05',
							borderRadius: '4px',
						}}>
						A
					</div>
					<div style={{ margin: 8 }}>
						<div style={{ height: 38, color: '#30B12E', fontSize: 30 }}>20</div>
						<div style={{ fontSize: 18, paddingTop: 8 }}>Heros Hired</div>
					</div>
				</Paper>
			</Box>
		</div>
	)
}
