import { Box, Button, Container, FilledInput, Grid, InputAdornment, OutlinedInput, Paper, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import DashboardLayout from '../../sdk/layouts/DashbardLayout'
import calender from '../../public/assets/icons/calender.svg'
import watch from '../../public/assets/icons/watch.svg'
import award from '../../public/assets/icons/award.svg'
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const boxData = [
    {
        src: calender,
        value: '-',
        bgColor: '#244CB30D',
        color: '#244CB3',
        text: 'Total Bookings',
    },
    {
        src: watch,
        value: '-',
        bgColor: '#FF74000D',
        color: '#FF7400',
        text: 'In Progress Bookings',
    },
    {
        src: award,
        value: '-',
        bgColor: '#30B12E0D',
        color: '#30B12E',
        text: 'Heros Hired',
    },
]

const Dashboard = () => {
    return (
        <DashboardLayout>
            <Grid container spacing={2}>
                {boxData.map((stat, index) => {
                    return (
                        <Grid item sm={6} md={4} key={index}  >
                            <Paper elevation={4}>
                                <Stack spacing={2} p={2} direction={'row'}>
                                    <Box sx={{ background: stat.bgColor, padding: '15px', borderRadius: '6px' }}>
                                        <Image src={stat.src} alt='' />
                                    </Box>
                                    <Stack direction='column'>
                                        <Typography variant='h6' fontWeight={900} color={stat.color}>
                                            {stat.value}
                                        </Typography>
                                        <Typography variant='h6' color={stat.color}>
                                            {stat.text}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
            <Stack direction="row" mt={10} justifyContent={"space-between"}>
                <Typography variant='h4'>Your Bookings</Typography>
                <Stack direction={"row"} spacing={4}>
                    <Typography variant='subtitle1'>Default Project</Typography>
                    <OutlinedInput size='small' endAdornment={<InputAdornment position="end"><SearchIcon /></InputAdornment>} />
                    <Typography variant="subtitle2">Filter &nbsp; <FilterAltIcon /> </Typography>
                </Stack>
            </Stack>
            <Container sx={{p: 8 , mt: 8 }} >
                <Stack direction={"column"} spacing={4} alignItems="center" >
                    <Typography variant='h3' >You don&apos;t have any bookings</Typography>
                    <Typography variant='h5'>Press on Book worker to create bookings</Typography>
                    <Button variant='contained' >Book Workers</Button>
                </Stack>
            </Container>
        </DashboardLayout>
    )
}

export default Dashboard