import Head from 'next/head'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Terms() {
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
        <title>Terms of Service - Capital Root</title>
        <meta name="description" content="Terms of Service for Capital Root - Understand our terms and conditions" />
        <meta name="keywords" content="terms of service, capital root, movie analysis, film breakdown, hollywood movies, financial storytelling, wall street, stock market, business documentaries, profit and loss, company analysis, investor stories, cinematic storytelling, corporate drama, global finance, movie reviews, web series,storytelling meets finance, film vs finance, market analysis, hollywood insights, data storytelling, cinematic finance,company reports, business news, global economy, user agreement" />
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
                Terms of Service
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

            {/* Terms Content */}
            <div style={{lineHeight: '1.8', color: '#444'}}>
              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>📄 Acceptance of Terms</h2>
                <p>By accessing and using Capital Root, you accept and agree to be bound by the terms and provision of this agreement.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>📝 Use License</h2>
                <p>Permission is granted to temporarily use Capital Root for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>⚠️ Disclaimer</h2>
                <p>The materials on Capital Root are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>🚫 Limitations</h2>
                <p>In no event shall Capital Root or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Capital Root.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>✅ Accuracy of Materials</h2>
                <p>The materials appearing on Capital Root could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>🔗 Links</h2>
                <p>Capital Root has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>🔄 Modifications</h2>
                <p>We may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.</p>
              </section>

              <section style={{marginBottom: '30px'}}>
                <h2 style={{color: '#333', marginBottom: '15px', fontSize: '1.5rem'}}>📊 Service Availability</h2>
                <p>We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. We may perform maintenance that could temporarily interrupt service.</p>
              </section>
            </div>
            </div>
            </div>
            

            {/* CTA Section */}
            {/* <div style={{
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              color: 'white',
              padding: '30px',
              borderRadius: '10px',
              textAlign: 'center',
              marginTop: '40px'
            }}>
              <h3 style={{marginBottom: '15px', fontSize: '1.5rem'}}>Start Processing Your Media Today</h3>
              <p style={{marginBottom: '20px', opacity: '0.9'}}>Experience the power of AI-enhanced media processing</p>
              <a 
                href="/" 
                style={{
                  background: 'white',
                  color: '#4facfe',
                  padding: '12px 30px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                Get Started Now
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