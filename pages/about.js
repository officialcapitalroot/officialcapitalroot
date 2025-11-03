import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Official Capital Root | Financial Education Channel</title>
        <meta name="description" content="Learn about Official Capital Root - Your trusted source for financial education, stock market investing, and wealth building strategies." />
        <meta name="keywords" content="about capital root, financial education, stock market channel, investment strategies" />
        <link rel="canonical" href="https://capitalroot.vercel.app/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About - Official Capital Root" />
        <meta property="og:description" content="Learn about Official Capital Root - Your trusted source for financial education and investment strategies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://capitalroot.vercel.app/about" />
      </Head>
      <Header />
      <main className="page-main">
        <div className="container">
          <div className="page-header">
            <h1>About Official Capital Root</h1>
            <p className="page-subtitle">Official Capital Root - Holly,Bolly & Stockwood Market</p>
          </div>
          
          <div className="about-content">
            <section className="about-section">
              <h2>Our Mission</h2>
              <p>
                Capital Root blends storytelling with every video reveals the drama behind both screens—Holly,Bolly & Stockwood Market
              </p>
            </section>
            
            <section className="about-section">
              <h2>What We Offer</h2>
              <ul>
                <li>News Room.</li>
                <li>Financial Stories.</li>
                <li>Movie Breakdowns.</li>
                <li>Film vs Finances.</li>
                <li>Profit & Loss Explained.</li>
                <li>Web Series Reviews.</li>
                <li>Business Documentaries.</li>
                
              </ul>
            </section>

            
            <section className="about-section">
              <h2>Why Choose Us</h2>
              <div className="features-grid">
                <div className="feature">
                  <h3>Expert Knowledge</h3>
                  <p>Years of experience in financial markets</p>
                </div>
                <div className="feature">
                  <h3>Practical Approach</h3>
                  <p>Real-world strategies that actually work</p>
                </div>
                <div className="feature">
                  <h3>Community Focus</h3>
                  <p>Supportive community of like-minded investors</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}