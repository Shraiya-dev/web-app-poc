import { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { LandingLayout, Section } from 'sdk'
import { staticRenderingProvider } from 'sdk/utils/nextHelper'

const PrivacyPolicy: NextPage = () => {
	return (
		<>
			<LandingLayout>
				<Section>
					<h1 className='page-title'>Privacy Policy</h1>
					<p>
						Project Hero app is a commercial app by HardHat Technologies Private Limited. This page is used
						to inform visitors regarding our policies with the collection, use, and disclosure of Personal
						Information for anyone using the app and website of ProjectHero.
					</p>
					<h3>Personal Identification Information</h3>
					<p>
						When you interact with our services, we collect the information that you choose to share with
						us.
					</p>
					<h3>Non-personal Identification Information</h3>
					<p>
						We may collect non-personal identification information about users whenever they interact with
						our site. Non-personal identification information may include the type of mobile phone and
						technical information about users, such as the operating system and the Internet service
						providers utilized including IP address and other similar information.
					</p>
					<h3>Usage and Technical Information</h3>
					<p>
						We collect the information about how you interact with our Service, This information may include
						your IP address, geographical location, browser type, referral source, length of visit, pages
						viewed and items clicked.
					</p>
					<h3>Information Collection</h3>
					<p>
						For a better experience, while using our Service, you are required to provide us with certain
						personally identifiable information for your Public Profile, including but not limited to:
					</p>
					<h3>Identity information</h3>
					<p>Such as your first name, last name, gender, username and/or similar</p>
					<h3>Contact information</h3>
					<p>Such as your mobile number, postal address, email address and telephone number</p>
					<h3>Professional information</h3>
					<p>
						Such as your education, work experience, skills, photo, city or area. Professional information
						helps you to get more from our Services, including helping employers find you.
					</p>
					<h3>Feedback and correspondence</h3>
					<p>
						Such as information you provide when you respond to surveys, participate in market research
						activities, report a problem with Service, receive customer support or otherwise correspond with
						us
					</p>
					<h3>Usage information</h3>
					<p>Such as information about how you use the Service and interact with us, and</p>
					<h3>Marketing information</h3>
					<p>
						Such as your preferences for receiving marketing communications and details about how you engage
						with them.
					</p>
					<p>
						Project Hero&apos;s mission is to provide the youth of India with quality construction jobs. We
						are committed to be transparent about the data we collect about you, how it is used and with
						whom it is shared.
					</p>
					<p>
						To effectively provide and introduce any new Services to you, we collect and use certain
						information, including, but not limited to, such as: -
					</p>
					<ul>
						<li>
							<p> We log your visits and use of our Services.</p>
						</li>
						<li>
							<p> We receive data from your devices and networks, including location data.</p>
						</li>
						<li>
							<p> We may further request and store additional information.</p>
						</li>
						<li>
							<p>
								To monitor usage or traffic patterns (including to track users&apos; movements around
								the Services) and gather demographic information.
							</p>
						</li>
						<li>
							<p>
								To communicate directly with you, including by sending you information about new
								products and services.
							</p>
						</li>
						<li>
							<p>
								To deliver you a personalized experience. May come in the form of messages, delivering
								tailor-made ads based on your interest and browsing history.
							</p>
						</li>
					</ul>
					<h3>How we protect your information?</h3>
					<p>
						We adopt appropriate data collection, storage and processing practices and security measures to
						protect against unauthorized access, alteration, disclosure or destruction of your personal
						information, username, password, transaction information and data stored on our App/Site.
					</p>
					<h3>Sharing your personal information</h3>
					<p>
						We do not sell, trade, or rent Users personal identification information to any 3rd party. We
						may share generic aggregated demographic information not linked to any personal identification
						information regarding visitors and users with our business partners, trusted affiliates and
						advertisers for the purposes outlined above.
					</p>
					<p>The app does use third-party services that may collect information used to identify you.</p>

					<p>Link to privacy policy of third-party service providers used by the app</p>
					<ul>
						<li>
							<p>
								<a target='_blank' rel='noopener noreferrer' href='https://policies.google.com/privacy'>
									Google Play Services
								</a>
							</p>
						</li>
						<li>
							<p>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://mixpanel.com/legal/privacy-policy/'>
									Mix Panel
								</a>
							</p>
						</li>
						<li>
							<p>
								<a target='_blank' rel='noopener noreferrer' href='https://segment.com/legal/privacy/'>
									Segment
								</a>
							</p>
						</li>
						<li>
							<p>
								<a target='_blank' rel='noopener noreferrer' href='https://policies.google.com/privacy'>
									Firebase
								</a>
							</p>
						</li>
						<li>
							<p>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://help.smartlook.com/en/articles/3244452-privacy-policy?_gl=1*fwuq1p*_ga*NjU1MjA5OTg4LjE2NDYzMDM2OTg.*_ga_MJPFXC5F1G*MTY0NzA3NjE2NC4yLjAuMTY0NzA3NjE2Ni41OA..'>
									Smartlook
								</a>
							</p>
						</li>
						<li>
							<p>
								<a target='_blank' rel='noopener noreferrer' href='https://www.truecaller.com/privacy'>
									Truecaller
								</a>
							</p>
						</li>
						<li>
							<p>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://www.twilio.com/legal/privacy'>
									Twilio
								</a>
							</p>
						</li>
						<li>
							<p>
								<a
									target='_blank'
									rel='noopener noreferrer'
									href='https://www.kochava.com/website-visitor-privacy-policy/'>
									Kochava
								</a>
							</p>
						</li>
					</ul>
					<p>
						We may share your personal information with our parent companies, subsidiaries and affiliates.
					</p>
					<ul>
						<li>
							<p>
								We may share your personal information with partners to assist us with marketing,
								advertising our Services, or providing, maintaining and improving the features and
								functionality of the Services.
							</p>
						</li>
					</ul>

					<h3>Cookies</h3>
					<p>
						Cookies are files with a small amount of data that are commonly used as anonymous unique
						identifiers. These are sent to your browser from the websites that you visit and are stored on
						your device&#x27;s internal memory.
					</p>
					<p>
						This Service does not use these &quot;cookies&quot; explicitly. However, the app may use third
						party code and libraries that use &quot;cookies&quot; to collect information and improve their
						services. You have the option to either accept or refuse these cookies and know when a cookie is
						being sent to your device. If you choose to refuse our cookies, you may not be able to use some
						portions of this Service.
					</p>
					<h3>Service Providers</h3>
					<p>We may employ third-party companies and individuals due to the following reasons:</p>
					<p>
						To facilitate our Service, To provide the Service on our behalf, To perform Service-related
						services, or To assist us in analyzing how our Service is used. We want to inform users of this
						Service that these third parties have access to your Personal Information. The reason is to
						perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or
						use the information for any other purpose.
					</p>

					<h3>Security</h3>
					<p>
						We value your trust in providing us your Personal Information, thus we are striving to use
						commercially acceptable means of protecting it. But remember that no method of transmission over
						the internet, or method of electronic storage is 100% secure and reliable, and we cannot
						guarantee its absolute security.
					</p>
					<h3>No Impersonation or False Information to be Provided</h3>
					<p>
						You have to use your actual name on the Platform, you are required to input your correct phone
						number to use our Services. You will be getting a job based on your Project Hero account. You
						will not falsely represent yourself as another person or representative of another person to use
						our Services. You will not lie about your details, for any reason.
					</p>
					<h3>Changes to this Privacy policy</h3>
					<p>
						Project Hero has the discretion to update this privacy policy at any time. We encourage Users to
						frequently check this page for any changes to stay informed about how we are helping to protect
						the personal information we collect. You acknowledge and agree that it is your responsibility to
						review this privacy policy periodically and become aware of modifications.
					</p>
					<h3>YOUR ACCEPTANCE OF THESE TERMS</h3>
					<p>
						By using the Site or our mobile app, you signify your acceptance of this policy. If you do not
						agree to this policy, please do not use our Site. Your continued use of the Site following the
						posting of changes to this policy will be deemed your acceptance of those changes.
					</p>
					<h3>CONTACTING US</h3>
					<p>
						If you have any questions about this Privacy Policy, the practices of this site, or your
						dealings with this site, please contact us at :&nbsp;
						<a href='mailto:help@projecthero.in' target='_blank' rel='noopener noreferrer'>
							help@projecthero.in
						</a>
					</p>
				</Section>
			</LandingLayout>
		</>
	)
}

export default PrivacyPolicy

const pageUrl = '/privacy-policy'
export const getStaticProps: GetStaticProps = staticRenderingProvider(pageUrl).getStaticProps
