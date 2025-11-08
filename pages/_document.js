// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" itemScope itemType="https://schema.org/WebPage">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#e50914" />
        
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        
        <link rel="manifest" href="/manifest.json" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        
        <meta name="description" content="Watch latest Hollywood, Bollywood and regional movies online in HD quality. Stream newest movies on demand with Capital Root Movies." />
        <meta name="keywords" content="watch movies online, hollywood movies, bollywood movies, latest movies, hd movies, movie streaming, english movies, hindi movies, telugu movies, tamil movies" />
        <meta name="author" content="Capital Root" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
        
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        <meta property="og:site_name" content="Capital Root Movies" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@capitalroot" />
        
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
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Capital Root Movies",
              "description": "Watch latest movies online in HD quality",
              "url": "https://capitalroot.vercel.app",
              "logo": "https://capitalroot.vercel.app/icon-512.png",
              "sameAs": [
                "https://www.youtube.com/channel/UCS7Ahfb_tr9uUz_XuiNJtGg",
                "https://x.com/capital_root",
                "https://www.facebook.com/capitalroot",
                "https://www.instagram.com/officialcapitalroot/"
              ]
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