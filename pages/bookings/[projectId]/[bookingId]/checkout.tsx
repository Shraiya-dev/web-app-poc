import { Typography } from '@mui/material'
import { NextPage } from 'next'
import React from 'react'
import { OnboardingLayout } from 'sdk'
import { CheckoutCard } from 'sdkv2/components/cards/CheckoutCard'

const Checkout = () =>{
    return (
        <>
        <OnboardingLayout helmet={false}>
            <CheckoutCard />
        </OnboardingLayout>
        </>
    )
}

export default Checkout

const pageUrl = '/bookings/[projectId]/[bookingId]/checkout'
export const getStaticPaths: GetStaticPaths = staticRenderingProvider(pageUrl).getStaticPaths
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
