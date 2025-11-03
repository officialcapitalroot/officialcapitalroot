import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" itemScope itemType="https://schema.org/WebPage">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#dc2626" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Capital Root blends storytelling with every video reveals the drama behind both screens—Holly,Bolly & Stockwood Market" />
        <meta name="keywords" content="stock market, investing, trading, financial education, wealth building, capital growth, YouTube finance, investment strategies, personal finance" />
        <meta name="author" content="Official Capital Root" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Open Graph */}
        <meta property="og:site_name" content="Official Capital Root" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@capitalroot" />
        
        {/* Google Site Verification (Add your verification code) */}
        <meta name="google-site-verification" content="your-verification-code" />
        
        {/* Bing Site Verification */}
        <meta name="msvalidate.01" content="your-bing-verification" />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EQXVBX4R6M"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EQXVBX4R6M', {
                page_title: document.title,
                page_location: window.location.href
              });
            `
          }}
        />
        
        {/* Google Adsense */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4001840989688456"
          crossOrigin="anonymous"
        ></script>
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Official Capital Root",
              "description": "Financial Education & Investment Strategies YouTube Channel",
              "url": "https://officialcapitalroot.vercel.app",
              "logo": "https://officialcapitalroot.vercel.app/icon-512.png",
              "sameAs": [
                "https://www.youtube.com/channel/UCS7Ahfb_tr9uUz_XuiNJtGg",
                "https://x.com/capital_root",
                "https://www.facebook.com/profile.php?id=61582111152736",
                "https://www.instagram.com/officialcapitalroot/"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["English"]
              }
            })
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}