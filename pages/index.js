import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import VideoGrid from '../components/VideoGrid'
import Footer from '../components/Footer'
import videoData from '../data/data.json'

export default function Home({ videos, channelData }) {
  const canonicalUrl = 'https://capitalroot.vercel.app'
  const siteName = 'Capital Root'
  const siteDescription = channelData.description

  // Website Schema only - no VideoObject on homepage
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "description": siteDescription,
    "url": canonicalUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${canonicalUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  }

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "description": siteDescription,
    "url": canonicalUrl,
    "logo": `${canonicalUrl}/icon-512.png`,
    "sameAs": Object.values(channelData.social)
  }

  return (
    <>
      <Head>
        <title>Capital Root - Watch Movies On Demand</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={channelData.keywords.join(', ')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Capital Root - Watch Movies On Demand" />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${canonicalUrl}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Capital Root - Watch Movies On Demand" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@capitalroot" />
        <meta name="twitter:creator" content="@capitalroot" />
        <meta name="twitter:title" content="Capital Root - Watch Movies On Demand" />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${canonicalUrl}/og-image.jpg`} />
        <meta name="twitter:image:alt" content="Capital Root - Watch Movies On Demand" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="Capital Root" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="publisher" href="https://www.youtube.com/channel/UCS7Ahfb_tr9uUz_XuiNJtGg" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </Head>
      
      <Header />
      <Hero channelData={channelData} />
      <VideoGrid videos={videos} />
      <Footer channelData={channelData} />
    </>
  )
}

export async function getStaticProps() {
  const videos = videoData.videos
  const channelData = videoData.channel

  return {
    props: {
      videos,
      channelData
    },
    revalidate: 3600
  }
}