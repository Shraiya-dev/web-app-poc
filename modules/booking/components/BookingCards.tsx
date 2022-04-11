import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import { Button, Grid, Typography } from '@mui/material'

export default function BookingCards() {
	return (
		<div style={{display:"flex", justifyContent:"center"}}>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					'& > :not(style)': {
						m: 2,
						width: 1080,
					},
				}}>
				<Paper elevation={3}>
                    <div>

                    <div
						style={{
							background: 'rgba(36, 76, 179, 0.15)',
							height: 94,
                            padding: 30
						}}>
						{/* <Button>View Details</Button> */}

						<Grid container spacing={4} >
                            
							<Grid item >
                                <div><Typography>Bar Bender (10)</Typography></div>
                                <div>{`Helper (5)  Technitian (5) `}</div>
                            </Grid>
                            <Grid item>Ball</Grid>
                            <Grid item>Cat</Grid>
                            <Grid item>Doll</Grid>
						</Grid>
					</div>
					<div style={{height:142}}>B</div>
                    </div>
					
				</Paper>
			</Box>
		</div>
	)
}
