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
        <meta name="description" content="Capital Root Watch Movies On Demand Only." />
        <meta name="keywords" content="capital root,movie analysis,film breakdown,hollywood movies,streaming,video, stream,streaming media,TV,online movie streaming services, video,streaming" />
        <meta name="author" content="Capital Root" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        
      
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="sitemap" type="application/xml" href="/video-sitemap.xml" />
        {/* Open Graph */}
        <meta property="og:site_name" content="Capital Root" />
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KGJEF0RJQF"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-KGJEF0RJQF', {
                page_title: document.title,
                page_location: window.location.href
              });
            `
          }}
        />
        
        {/* Google Adsense */}
        {/* <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4001840989688456"
          crossOrigin="anonymous"
        ></script> */}
        
        {/* Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Capital Root",
              "description": "About - Capital Root | Watch Movies On Demand",
              "url": "https://capitalroot.vercel.app",
              "logo": "https://capitalroot.vercel.app/icon-512.png",
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