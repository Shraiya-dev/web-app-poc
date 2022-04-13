import styled from '@emotion/styled'
import { AppBar, Box, Button, Chip, Grid, Paper, Stack, Toolbar, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import logo from '../../public/assets/icons/BrandLogo.svg'


const CustomizeDashboard = styled(Box)(({ theme }) => ({
    minHeight: "calc(100vh - 100px)",
    backgroundColor:"yellow",
    '.AppBar':{
        backgroundColor:"gray",
        maxHeight:"100px",
    },
    '.AppStack':{
        padding: "25px 40px"
    },
    '.headerBox':{
        marginTop:"100px",
        // padding:"20px 40px", 
        border:"2px solid red"
    },
}))

const DashbardLayout = ({ children, ...props }: any) => {
    return (
        <CustomizeDashboard>
            <AppBar className='AppBar' elevation={0}>
                <Toolbar>
                    <Stack width={"100%"} p={4} direction="row" className='AppStack' >
                        <Box>
                            <Image src={logo} alt="" height={45} />
                        </Box>
                        <Stack width={"30%"} direction="row" justifyContent="space-evenly" ml={"auto"}>
                            <Button variant="text" sx={{fontWeight:800 , fontSize: "14px" }} >Dashboard</Button>
                            <Button variant="text" sx={{ fontWeight: 800, fontSize: "14px" }} >My Profile</Button>
                            <Button variant="contained" sx={{ fontWeight: 800, fontSize: "14px" }} >Book Worker</Button>
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>
           <Box className='headerBox' >
                <Grid container rowSpacing={2} columnSpacing={8} >
                    <Grid item xs={12} md={4} >
                        <Paper elevation={3} sx={{ backgroundColor: "red" }}>hi</Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>hi</Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3}>hi</Paper>
                    </Grid>
                </Grid>
           </Box>
        </CustomizeDashboard>
    )
}

export default DashbardLayout