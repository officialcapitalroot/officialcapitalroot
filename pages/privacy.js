import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Privacy() {
  const [currentDate, setCurrentDate] = useState('')

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }))
  }, [])

  return (
    <>
      <Head>
        <title>Privacy Policy - Media Processor Pro</title>
        <meta name="description" content="Privacy Policy for Media Processor Pro - Your data security and privacy matters" />
        <meta name="keywords" content="privacy policy, data protection, media processor privacy, image processing privacy" />
      </Head>
      
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main style={{minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', paddingTop: '80px'}}>
        <div className="container" style={{padding: '40px 20px'}}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Back to Home Button */}
            <div style={{marginBottom: '30px'}}>
              <a 
                href="/" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#667eea',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px'
                }}
              >
                <span style={{marginRight: '8px'}}>←</span>
                Back to Home
              </a>
            </div>

            {/* Page Header */}
            <div style={{textAlign: 'center', marginBottom: '40px'}}>
              <h1 style={{
                fontSize: '2.5rem',
                color: '#333',
                marginBottom: '10px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Privacy Policy
              </h1>
              <p style={{color: '#666', fontSize: '1.1rem'}}>
                Last updated: {currentDate || 'Loading...'}
              </p>
            </div>

            {/* Ad Space */}
            <div className="ad-container" style={{margin: '30px 0'}}>
              <ins className="adsbygoogle"
                style={{display: 'block'}}
                data-ad-client="ca-pub-4001840989688456"
                data-ad-slot="1234567890"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
            </div>

            {/* Privacy Content */}
            <div style={{lineHeight: '1.8', color: '#444'}}>
              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>🔒 Information We Collect</h2>
                <p>We are committed to protecting your privacy. Media Processor Pro does not collect, store, or share any personal data from users. All media processing occurs either locally in your browser or through secure third-party services.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>🌐 Third-Party Services</h2>
                <p>We use Google AdSense to display relevant advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>💾 Data Processing</h2>
                <p>All media files you upload are processed temporarily during your session and are not stored on our servers. The processing happens either:</p>
                <ul style={{paddingLeft: '20px', margin: '15px 0'}}>
                  <li>Locally in your browser for image processing</li>
                  <li>Through secure Hugging Face integration for advanced processing</li>
                </ul>
                <p>Files are automatically deleted after processing completion.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>🍪 Cookies</h2>
                <p>We use minimal cookies for:</p>
                <ul style={{paddingLeft: '20px', margin: '15px 0'}}>
                  <li>Essential website functionality</li>
                  <li>Google AdSense advertising</li>
                  <li>User preference storage</li>
                </ul>
                <p>You can disable cookies in your browser settings, though some features may not work properly.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>🛡️ Security</h2>
                <p>We implement security measures to protect your information during transmission using SSL encryption. However, no method of transmission over the Internet is 100% secure.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>📧 Contact</h2>
                <p>If you have any questions about this Privacy Policy, please contact us through our website.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>📝 Changes to This Policy</h2>
                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.</p>
              </section>
            </div>
             </div>
              </div>

            {/* CTA Section */}
            {/* <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              marginTop: '40px'
            }}>
              <h3 style={{marginBottom: '15px', fontSize: '1.5rem'}}>Ready to Process Your Media?</h3>
              <p style={{marginBottom: '20px', opacity: '0.9'}}>Start enhancing your images and videos with our powerful AI tools</p>
              <a 
                href="/" 
                style={{
                  background: 'white',
                  color: '#f5576c',
                  padding: '12px 30px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                Try MagaicSpace Media Processor Pro Free
              </a>
            </div>
          </div>
        </div> */}
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}