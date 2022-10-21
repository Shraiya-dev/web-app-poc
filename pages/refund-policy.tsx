import { Typography } from '@mui/material'
import { GetStaticProps, NextPage } from 'next'
import { LandingLayout, Section } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const RefundPolicy: NextPage = () => {
	return (
		<>
			<LandingLayout>
				<Section>
					<Typography variant='h4' fontWeight={700}>
						Replacement &amp; Refund Policy
					</Typography>
					<ul>
						<li>
							<Typography>
								If any projectheroes gets churned with in 7 days of deployment, Project Hero will do free of cost
								replacement, or will give discount/refund
							</Typography>
						</li>
						<li>
							<Typography>
								In case of no replacement from 7 days of churn, Project Hero will do, No Questions
								Asked&apos; Refund
							</Typography>
						</li>
					</ul>
					<Typography variant='h5'>Refunds (if applicable)</Typography>
					<Typography>
						In order to raise a refund request, please email us at refunds@projecthero.in with the problem
						you are facing with our services.. Once you have raised this request , we will send you an email
						to notify you that we have received your refund request. We will also notify you of the approval
						or rejection of your refund.
					</Typography>
					<br />
					<Typography>
						If you are approved, then your refund will be processed, and a credit will automatically be
						applied to your credit card or original method of payment, within a certain amount of days.{' '}
					</Typography>
					<Typography variant='h5'>Late or missing refunds (if applicable)</Typography>
					<Typography>
						If you haven&apos;t received a refund yet, first check your bank account again. Then contact
						your credit card company, it may take some time before your refund is officially posted.
					</Typography>
					<Typography>
						Next contact your bank. There is often some processing time before a refund is posted. If
						you&apos;ve done all of this and you still have not received your refund yet, please contact us
						at
					</Typography>
					<Typography fontWeight='700'>
						<a target='_blank' rel='noopener noreferrer' href='mailto:refunds@projecthero.in'>
							refunds@projecthero.in
						</a>
					</Typography>
				</Section>
			</LandingLayout>
		</>
	)
}

export default RefundPolicy

const pageUrl = '/refund-policy'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
