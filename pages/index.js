import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import VideoGrid from '../components/VideoGrid'
import Footer from '../components/Footer'
import videoData from '../data/data.json'

export default function Home({ videos, channelData }) {
  const canonicalUrl = 'https://capitalroot.vercel.app'
  const siteName = 'Capital Root'
  const siteDescription = 'Capital Root blends storytelling with every video reveals the drama behind both screens—Holly,Bolly & Stockwood Market'

  // VideoChannel Schema
  const videoChannelSchema = {
    "@context": "https://schema.org",
    "@type": "VideoChannel",
    "name": siteName,
    "description": siteDescription,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${canonicalUrl}/icon-512.png`,
        "width": 512,
        "height": 512
      }
    },
    "hasPart": videos.slice(0, 10).map(video => ({
      "@type": "VideoObject",
      "name": video.title,
      "description": video.description,
      "thumbnailUrl": video.thumbnail,
      "uploadDate": video.UploadDate,
      "duration": video.duration,
      "url": `${canonicalUrl}/video/${video.videoId}`,
      "embedUrl": video.videoSource === 'youtube' 
        ? `https://www.youtube.com/embed/${video.videoId}`
        : `https://short.icu/${video.videoId}`
    }))
  }

  return (
    <>
      <Head>
        <title>Capital Root - Holly,Bolly & Stockwood Market</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={channelData.keywords.join(', ')} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Capital Root - Holly,Bolly & Stockwood Market" />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${canonicalUrl}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Capital Root - Holly,Bolly & Stockwood Market" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@capitalroot" />
        <meta name="twitter:creator" content="@capitalroot" />
        <meta name="twitter:title" content="Capital Root - Holly,Bolly & Stockwood Market" />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${canonicalUrl}/og-image.jpg`} />
        <meta name="twitter:image:alt" content="Capital Root - Holly,Bolly & Stockwood Market" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="Capital Root" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="publisher" href="https://www.youtube.com/channel/UCS7Ahfb_tr9uUz_XuiNJtGg" />
        
        {/* Structured Data for Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
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
            })
          }}
        />
        
        {/* Structured Data for Video Channel */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoChannelSchema)
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