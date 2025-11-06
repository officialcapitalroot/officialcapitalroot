import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  return (
    <>
      <Head>
        <title>About - Capital Root | Watch Movies On Demand</title>
        <meta name="description" content="About - Capital Root | Watch Movies On Demand<" />
        <meta name="keywords" content="capital root, movie analysis, film breakdown, hollywood movies, financial storytelling, wall street, stock market, business documentaries, profit and loss, company analysis, investor stories, cinematic storytelling, corporate drama, global finance, movie reviews, web series,storytelling meets finance, film vs finance, market analysis, hollywood insights, data storytelling, cinematic finance,company reports, business news,global economy" />
        <link rel="canonical" href="https://capitalroot.vercel.app/about" />
        
        {/* Open Graph */}
        <meta property="og:title" content="About - Capital Root" />
        <meta property="og:description" content="Learn about Capital Root - Watch Movies On Demand Only." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://capitalroot.vercel.app/about" />
      </Head>
      <Header />
      <main className="page-main">
        <div className="container">
          <div className="page-header">
            <h1>About Capital Root</h1>
            <p className="page-subtitle">Capital Root - Watch Movies On Demand Only. </p>
          </div>
          
          <div className="about-content">
            <section className="about-section">
              <h2>Our Mission</h2>
              <p>
                Capital Root Watch Movies On Demand 
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