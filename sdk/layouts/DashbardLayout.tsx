import { AppBar, Box, Button, Chip, Grid, Paper, Stack, Toolbar, Typography, Container, styled } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import logo from '../../public/assets/icons/BrandLogo.svg'




const CustomizeDashboard = styled(Box)(({ theme }) => ({
    minHeight: 'calc(100vh - 100px)',
    // backgroundColor: "yellow",
    '.AppBar': {
        backgroundColor: '#FFFFFF',
        maxHeight: '100px',
    },
    '.AppStack': {
        padding: '25px 80px',
    },
    '.headerBox': {
        marginTop: '100px',
    },
    
}))

const DashboardLayout = ({ children, ...props }: any) => {
    return (
        <CustomizeDashboard>
            <AppBar className='AppBar' elevation={0}>
                <Container>
                    <Toolbar sx={{
                        justifyContent: 'space-between'
                    }}>
                        <Image src={logo} alt='' height={52} width={162} />
                        <Stack direction='row' spacing={2} >
                            <Button variant='text' sx={{ fontWeight: 800, fontSize: '14px' }}>
                                Dashboard
                            </Button>
                            <Button variant='text' sx={{ fontWeight: 800, fontSize: '14px' }}>
                                My Profile
                            </Button>
                            <Button variant='contained' sx={{ fontWeight: 800, fontSize: '14px' }}>
                                Book Worker
                            </Button>
                        </Stack>
                    </Toolbar>
                </Container>

            </AppBar>
            <Container className='headerBox'>
                {children}
            </Container>
        </CustomizeDashboard>
    )
}

export default DashboardLayout
