// import Head from 'next/head'
// import Header from '../components/Header'
// import VideoGrid from '../components/VideoGrid'
// import Footer from '../components/Footer'
// import videoData from '../data/data.json'

// export default function Videos({ videos }) {
//   const canonicalUrl = 'https://capitalroot.vercel.app/videos'

//   // CollectionPage Schema without VideoObject
//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "name": "All Videos - Capital Root",
//     "description": "Complete collection of Holly,Bolly & Stockwood Market content from Capital Root",
//     "url": canonicalUrl,
//     "mainEntity": {
//       "@type": "ItemList",
//       "numberOfItems": videos.length,
//       "itemListElement": videos.map((video, index) => ({
//         "@type": "ListItem",
//         "position": index + 1,
//         "url": `https://capitalroot.vercel.app/video/${video.videoId}`
//       }))
//     }
//   }

//   return (
//     <>
//       <Head>
//         <title>All Videos - Capital Root | Holly,Bolly & Stockwood Market Content</title>
//         <meta name="description" content="Browse all videos from Capital Root. Complete collection of Holly,Bolly & Stockwood Market content including financial education, stock market analysis, and investment strategies." />
//         <meta name="keywords" content="all videos, financial education, stock market videos, investment tutorials, movie analysis, business documentaries" />
//         <link rel="canonical" href={canonicalUrl} />
        
//         {/* Open Graph */}
//         <meta property="og:title" content="All Videos - Capital Root" />
//         <meta property="og:description" content="Browse all Holly,Bolly & Stockwood Market content from Capital Root." />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:image" content="https://capitalroot.vercel.app/og-image.jpg" />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content="All Videos - Capital Root" />
//         <meta name="twitter:description" content="Complete collection of Holly,Bolly & Stockwood Market content" />
        
//         {/* Structured Data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(collectionSchema)
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





// import Head from 'next/head';
// import Header from '../components/Header';
// import VideoGrid from '../components/VideoGrid';
// import Footer from '../components/Footer';
// import videoData from '../data/data.json';

// export default function Videos({ videos }) {
//   const canonicalUrl = 'https://capitalroot.vercel.app/videos';
//   const pageTitle = 'All Movies - Capital Root | Browse Complete Movie Collection';
//   const pageDescription = 'Browse our complete collection of movies. Watch Hollywood, Bollywood, and regional cinema online in HD quality. Discover action, drama, thriller, comedy, and more.';

//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     "name": "All Movies - Capital Root",
//     "description": pageDescription,
//     "url": canonicalUrl,
//     "mainEntity": {
//       "@type": "ItemList",
//       "numberOfItems": videos.length,
//       "itemListElement": videos.map((video, index) => ({
//         "@type": "ListItem",
//         "position": index + 1,
//         "url": `https://capitalroot.vercel.app/video/${video.slug}`,
//         "name": video.title,
//         "image": video.thumbnail,
//         "description": video.description
//       }))
//     },
//     "breadcrumb": {
//       "@type": "BreadcrumbList",
//       "itemListElement": [
//         {
//           "@type": "ListItem",
//           "position": 1,
//           "name": "Home",
//           "item": "https://capitalroot.vercel.app"
//         },
//         {
//           "@type": "ListItem",
//           "position": 2,
//           "name": "All Movies",
//           "item": canonicalUrl
//         }
//       ]
//     }
//   };

//   return (
//     <>
//       <Head>
//         <title>{pageTitle}</title>
//         <meta name="description" content={pageDescription} />
//         <meta name="keywords" content="all movies, movie collection, watch movies, streaming movies, Hollywood, Bollywood, action movies, drama movies, thriller movies, comedy movies" />
//         <link rel="canonical" href={canonicalUrl} />
        
//         <meta property="og:title" content={pageTitle} />
//         <meta property="og:description" content={pageDescription} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:image" content="https://capitalroot.vercel.app/og-image.jpg" />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />
        
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={pageTitle} />
//         <meta name="twitter:description" content={pageDescription} />
//         <meta name="twitter:image" content="https://capitalroot.vercel.app/og-image.jpg" />
        
//         <meta name="robots" content="index, follow" />
        
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
//           key="collection-schema"
//         />
//       </Head>
      
//       <Header />
//       <main className="page-main">
//         <div className="container">
//           <div className="page-header">
//             <h1>🎬 All Movies</h1>
//             <p className="page-subtitle">
//               Browse our complete collection of {videos.length}+ movies. Watch online in HD quality.
//             </p>
//           </div>
//           <VideoGrid videos={videos} showViewAll={false} />
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export async function getStaticProps() {
//   const videos = videoData.videos;

//   return {
//     props: {
//       videos
//     },
//     revalidate: 3600
//   };
// }







import Head from 'next/head';
import Header from '../components/Header';
import VideoGrid from '../components/VideoGrid';
import Footer from '../components/Footer';
import videoData from '../data/data.json';

export default function Videos({ videos }) {
  const canonicalUrl = 'https://capitalroot.vercel.app/videos';
  const pageTitle = 'All Movies - Capital Root | Browse Complete Movie Collection';
  const pageDescription = 'Browse our complete collection of movies. Watch Hollywood, Bollywood, and regional cinema online in HD quality. Discover action, drama, thriller, comedy, and more.';

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Movies - Capital Root",
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": videos.length,
      "itemListElement": videos.map((video, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://capitalroot.vercel.app/video/${video.slug}`,
        "name": video.title,
        "image": video.thumbnail,
        "description": video.description,
        "dateCreated": video.uploadDate,
        "director": video.director
      }))
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://capitalroot.vercel.app"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "All Movies",
          "item": canonicalUrl
        }
      ]
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="all movies, movie collection, watch movies, streaming movies, Hollywood, Bollywood, action movies, drama movies, thriller movies, comedy movies" />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://capitalroot.vercel.app/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://capitalroot.vercel.app/og-image.jpg" />
        
        <meta name="robots" content="index, follow" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
          key="collection-schema"
        />
      </Head>
      
      <Header />
      <main className="page-main">
        <div className="container">
          <div className="page-header">
            <h1>🎬 All Movies</h1>
            <p className="page-subtitle">
              Browse our complete collection of {videos.length}+ movies. Watch online in HD quality.
            </p>
          </div>
          <VideoGrid videos={videos} showViewAll={false} />
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const videos = videoData.videos;

  return {
    props: {
      videos
    },
    revalidate: 3600
  };
}