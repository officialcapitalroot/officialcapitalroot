// import Head from 'next/head'
// import Header from '../components/Header'
// import VideoGrid from '../components/VideoGrid'
// import Footer from '../components/Footer'
// import videoData from '../data/data.json'

// export default function Videos({ videos }) {
//   return (
//     <>
//       <Head>
//         <title>All Videos - Official Capital Root | - Holly,Bolly & Stockwood Market Content</title>
//         <meta name="description" content="Capital Root blends storytelling with every video reveals the drama behind both screens—Holly,Bolly & Stockwood Market'" />
//         <meta name="keywords" content="all videos, financial education, stock market videos, investment tutorials" />
//         <link rel="canonical" href="https://officialcapitalroot.vercel.app/videos" />
        
//         {/* Open Graph */}
//         <meta property="og:title" content="All Videos - Official Capital Root" />
//         <meta property="og:description" content="Browse all Holly,Bolly & Stockwood Market." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://officialcapitalroot.vercel.app/videos" />
//       </Head>
//       <Header />
//       <main className="page-main">
//         <div className="container">
//           <div className="page-header">
//             <h1>All Videos</h1>
//             <p className="page-subtitle">Complete collection of Holly,Bolly & Stockwood Market content.</p>
//           </div>
//           <VideoGrid videos={videos} showViewAll={false} />
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export async function getStaticProps() {
//   const videos = videoData.videos

//   return {
//     props: {
//       videos
//     },
//     revalidate: 3600
//   }
// }

















// import Head from 'next/head'
// import Header from '../components/Header'
// import VideoGrid from '../components/VideoGrid'
// import Footer from '../components/Footer'
// import videoData from '../data/data.json'

// export default function Videos({ videos }) {
//   return (
//     <>
//       <Head>
//         <title>All Videos - Official Capital Root | Holly,Bolly & Stockwood Market Content</title>
//         <meta name="description" content="Browse all videos from Official Capital Root. Complete collection of Holly,Bolly & Stockwood Market content including financial education, stock market analysis, and investment strategies." />
//         <meta name="keywords" content="all videos, financial education, stock market videos, investment tutorials, movie analysis, business documentaries" />
//         <link rel="canonical" href="https://officialcapitalroot.vercel.app/videos" />
        
//         {/* Open Graph */}
//         <meta property="og:title" content="All Videos - Official Capital Root" />
//         <meta property="og:description" content="Browse all Holly,Bolly & Stockwood Market content from Official Capital Root." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://officialcapitalroot.vercel.app/videos" />
        
//         {/* Structured Data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify({
//               "@context": "https://schema.org",
//               "@type": "ItemList",
//               "name": "All Videos - Official Capital Root",
//               "description": "Complete collection of videos from Official Capital Root",
//               "numberOfItems": videos.length,
//               "itemListElement": videos.map((video, index) => ({
//                 "@type": "ListItem",
//                 "position": index + 1,
//                 "item": {
//                   "@type": "VideoObject",
//                   "name": video.title,
//                   "description": video.description,
//                   "thumbnailUrl": video.thumbnail,
//                   "uploadDate": video.publishedAt,
//                   "duration": video.duration,
//                   "url": `https://officialcapitalroot.vercel.app/video/${video.videoId}`,
//                   "embedUrl": video.videoSource === 'youtube' 
//                     ? `https://www.youtube.com/embed/${video.videoId}`
//                     : `https://short.icu/${video.videoId}`
//                 }
//               }))
//             })
//           }}
//         />
//       </Head>
//       <Header />
//       <main className="page-main">
//         <div className="container">
//           <div className="page-header">
//             <h1>All Videos</h1>
//             <p className="page-subtitle">Complete collection of Holly,Bolly & Stockwood Market content.</p>
//           </div>
//           <VideoGrid videos={videos} showViewAll={false} />
//         </div>
//       </main>
//       <Footer />
//     </>
//   )
// }

// export async function getStaticProps() {
//   const videos = videoData.videos

//   return {
//     props: {
//       videos
//     },
//     revalidate: 3600
//   }
// }




















import Head from 'next/head'
import Header from '../components/Header'
import VideoGrid from '../components/VideoGrid'
import Footer from '../components/Footer'
import videoData from '../data/data.json'

export default function Videos({ videos }) {
  const canonicalUrl = 'https://officialcapitalroot.vercel.app/videos'

  // CollectionPage Schema
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Videos - Official Capital Root",
    "description": "Complete collection of Holly,Bolly & Stockwood Market content from Official Capital Root",
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": videos.length,
      "itemListElement": videos.map((video, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "VideoObject",
          "name": video.title,
          "description": video.description,
          "thumbnailUrl": video.thumbnail,
          "uploadDate": video.publishedAt,
          "duration": video.duration,
          "url": `https://officialcapitalroot.vercel.app/video/${video.videoId}`,
          "embedUrl": video.videoSource === 'youtube' 
            ? `https://www.youtube.com/embed/${video.videoId}`
            : `https://short.icu/${video.videoId}`
        }
      }))
    }
  }

  return (
    <>
      <Head>
        <title>All Videos - Official Capital Root | Holly,Bolly & Stockwood Market Content</title>
        <meta name="description" content="Browse all videos from Official Capital Root. Complete collection of Holly,Bolly & Stockwood Market content including financial education, stock market analysis, and investment strategies." />
        <meta name="keywords" content="all videos, financial education, stock market videos, investment tutorials, movie analysis, business documentaries" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content="All Videos - Official Capital Root" />
        <meta property="og:description" content="Browse all Holly,Bolly & Stockwood Market content from Official Capital Root." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://officialcapitalroot.vercel.app/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All Videos - Official Capital Root" />
        <meta name="twitter:description" content="Complete collection of Holly,Bolly & Stockwood Market content" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(collectionSchema)
          }}
        />
      </Head>
      <Header />
      <main className="page-main">
        <div className="container">
          <div className="page-header">
            <h1>All Videos</h1>
            <p className="page-subtitle">Complete collection of Holly,Bolly & Stockwood Market content.</p>
          </div>
          <VideoGrid videos={videos} showViewAll={false} />
        </div>
      </main>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const videos = videoData.videos

  return {
    props: {
      videos
    },
    revalidate: 3600
  }
}