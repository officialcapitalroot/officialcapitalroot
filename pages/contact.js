import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Official Capital Root | Get in Touch</title>
        <meta name="description" content="Contact Official Capital Root for financial education inquiries, collaboration opportunities, and investment guidance." />
        <meta name="keywords" content="contact capital root, financial education contact, investment guidance" />
        <link rel="canonical" href="https://officialcapitalroot.vercel.app/contact" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contact - Official Capital Root" />
        <meta property="og:description" content="Get in touch with Official Capital Root for financial education and investment guidance." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://officialcapitalroot.vercel.app/contact" />
      </Head>
      <Header />
      <main className="page-main">
        <div className="container">
          <div className="page-header">
            <h1>Contact Us</h1>
            <p className="page-subtitle">Get in touch with Official Capital Root</p>
          </div>
          
          <div className="contact-content">
            <div className="contact-info">
              <h2>Connect With Us</h2>
              <p>
                Have questions about investing? Looking for collaboration opportunities? 
                Reach out to us through our YouTube channel or social media platforms.
              </p>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <h3>YouTube Channel</h3>
                  <p>Subscribe and engage with our content</p>
                  <a 
                    href="https://www.youtube.com/channel/UCS7Ahfb_tr9uUz_XuiNJtGg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    Visit YouTube Channel
                  </a>
                </div>
                 <div className="contact-method">
                  <h3>Face Book</h3>
                  <p>Subscribe and engage with our content</p>
                  <a 
                    href="https://www.facebook.com/profile.php?id=61582111152736" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    Visit Face Book 
                  </a>
                </div>
                 <div className="contact-method">
                  <h3>Twitter Profile</h3>
                  <p>Subscribe and engage with our content</p>
                  <a 
                    href="https://x.com/capital_root" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    Visit Twitter Profile 
                  </a>
                </div>
                <div className="contact-method">
                  <h3>Instagram Profile</h3>
                  <p>Subscribe and engage with our content</p>
                  <a 
                    href="https://www.instagram.com/officialcapitalroot/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-link"
                  >
                    Visit Instagram Profile 
                  </a>
                </div>
                
                
              </div>
                <div className="contact-method flex flex-col items-center text-center">
                  <h3>Business Inquiries</h3>
                  <p>For partnerships and collaborations</p>
                  <a 
                    href="mailto:officialcapitalroot@gmail.com"
                    className="contact-link"
                  >
                    officialcapitalroot@gmail.com
                  </a>
                </div>
            </div>
            
            <div className="contact-faq">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-item">
                <h3>How often do you upload new content?</h3>
                <p>We regularly upload new financial education content. Subscribe to our YouTube channel and turn on notifications to stay updated.</p>
              </div>
              
              <div className="faq-item">
                <h3>Do you provide personal investment advice?</h3>
                <p>We provide educational content and general strategies. For personalized investment advice, please consult with a licensed financial advisor.</p>
              </div>
              
              <div className="faq-item">
                <h3>Can I suggest video topics?</h3>
                <p>Absolutely! We welcome topic suggestions from our community. Leave your suggestions in the comments section of our videos.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}