// pages/movies.js
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import VideoCard from '../components/VideoCard'
import videoData from '../data/data.json'

export default function Movies({ movies }) {
  const canonicalUrl = 'https://capitalroot.vercel.app/movies'
  const pageDescription = `Browse complete collection of ${movies.length} movies online. Watch Hollywood, Bollywood and regional movies in HD quality. Free streaming.`

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "All Movies - Capital Root",
    "description": pageDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": movies.length,
      "itemListElement": movies.map((movie, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "url": `https://capitalroot.vercel.app/movie/${movie.slug}`,
        "name": movie.title
      }))
    }
  }

  return (
    <>
      <Head>
        <title>All Movies - Watch {movies.length}+ Movies Online Free | Capital Root</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="all movies, movie collection, watch movies online, free movies, hd movies, hollywood, bollywood, latest movies" />
        <link rel="canonical" href={canonicalUrl} />
        
        <meta property="og:title" content={`All Movies - ${movies.length}+ Movies Online`} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="All Movies Collection" />
        <meta name="twitter:description" content={pageDescription} />
        
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      </Head>
      
      <Header />
      
      <main className="container">
        <div className="page-header">
          <h1>All Movies Collection</h1>
          <p className="page-subtitle">
            Browse our complete library of {movies.length}+ movies. 
            All available in HD quality for free streaming.
          </p>
        </div>
        
        <div className="video-grid">
          {movies.map(movie => (
            <VideoCard key={movie.id} video={movie} />
          ))}
        </div>
      </main>
      
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const movies = videoData.videos

  return {
    props: {
      movies
    },
    revalidate: 3600
  }
}