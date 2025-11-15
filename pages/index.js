// pages/index.js
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import VideoGrid from '../components/VideoGrid'
import Footer from '../components/Footer'
import { getTrending, getPopular } from '../lib/tmdb'
import videoData from '../data/data.json'

export default function Home({ trendingMovies, popularMovies, trendingTV, jsonVideos, channelData }) {
  const canonicalUrl = 'https://capitalroot.vercel.app'
  const siteName = 'Capital Root Movies'
  const siteDescription = channelData?.description || 'Watch latest Hollywood, Bollywood and regional movies online in HD quality. Stream trending movies and TV shows for free.'

  // Separate JSON videos by type
  const jsonMovies = jsonVideos.filter(video => 
    !video.title?.toLowerCase().includes('season') && 
    !video.title?.toLowerCase().includes('episode') &&
    !video.description?.toLowerCase().includes('tv') &&
    !video.category?.toLowerCase().includes('series')
  );

  const jsonTVShows = jsonVideos.filter(video => 
    video.title?.toLowerCase().includes('season') || 
    video.title?.toLowerCase().includes('episode') ||
    video.description?.toLowerCase().includes('tv') ||
    video.category?.toLowerCase().includes('series')
  );

  // Website Schema
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

  // Organization Schema for Homepage
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "description": siteDescription,
    "url": canonicalUrl,
    "logo": `${canonicalUrl}/icon-512.png`,
    "sameAs": channelData?.social ? Object.values(channelData.social) : []
  }

  // ItemList Schema for trending content
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Trending Movies and TV Shows",
    "description": "Latest trending movies and TV shows available for streaming",
    "url": canonicalUrl,
    "numberOfItems": trendingMovies.length + trendingTV.length + jsonMovies.length,
    "itemListElement": [
      ...trendingMovies.slice(0, 10).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Movie",
          "name": item.title,
          "description": item.overview,
          "image": `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          "url": `${canonicalUrl}/video/movie/${item.id}`
        }
      })),
      ...jsonMovies.slice(0, 5).map((item, index) => ({
        "@type": "ListItem",
        "position": trendingMovies.length + index + 1,
        "item": {
          "@type": "Movie",
          "name": item.title,
          "description": item.description,
          "image": item.thumbnail,
          "url": `${canonicalUrl}/video/${item.slug}`
        }
      }))
    ]
  }

  return (
    <>
      <Head>
        <title>Capital Root Movies - Watch Latest Movies Online in HD Quality</title>
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content={channelData?.keywords?.join(', ') || "watch movies online, hollywood movies, bollywood movies, movie streaming, hd movies, latest movies, trending movies, tv shows"} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content="Capital Root Movies - Watch Latest Movies Online in HD Quality" />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${canonicalUrl}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Capital Root Movies - Watch Movies Online" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@capitalroot" />
        <meta name="twitter:creator" content="@capitalroot" />
        <meta name="twitter:title" content="Capital Root Movies - Watch Latest Movies Online" />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={`${canonicalUrl}/og-image.jpg`} />
        <meta name="twitter:image:alt" content="Capital Root Movies" />
        
        {/* Additional Meta Tags */}
        <meta name="author" content="Capital Root" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        {channelData?.social?.youtube && (
          <link rel="publisher" href={channelData.social.youtube} />
        )}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
          key="website-schema"
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
          key="organization-schema"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(itemListSchema)
          }}
          key="itemlist-schema"
        />
      </Head>
      
      <Header />
      
      {/* Hero Section with Trending Movies */}
      <Hero trendingMovies={trendingMovies} />
      
      {/* Trending Movies Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">🔥 Trending Movies (TMDB)</h2>
          <VideoGrid videos={trendingMovies} mediaType="movie" />
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">⭐ Popular Movies (TMDB)</h2>
          <VideoGrid videos={popularMovies} mediaType="movie" />
        </div>
      </section>

      {/* Trending TV Shows Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">📺 Trending TV Shows (TMDB)</h2>
          <VideoGrid videos={trendingTV} mediaType="tv" />
        </div>
      </section>

      {/* JSON Movies Section */}
      {jsonMovies.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">🎬 Our Movie Collection</h2>
            <VideoGrid videos={jsonMovies} mediaType="json" />
          </div>
        </section>
      )}

      {/* JSON TV Shows Section */}
      {jsonTVShows.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">📺 Our TV Show Collection</h2>
            <VideoGrid videos={jsonTVShows} mediaType="json" />
          </div>
        </section>
      )}
      
      <Footer />

      <style jsx>{`
        .section {
          padding: 3rem 0;
        }
        
        .section-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: #333;
          border-left: 4px solid #e50914;
          padding-left: 1rem;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }
      `}</style>
    </>
  )
}

export async function getStaticProps() {
  try {
    const [trendingData, popularMoviesData, trendingTVData] = await Promise.all([
      getTrending('movie', 'week'),
      getPopular('movie'),
      getTrending('tv', 'week')
    ])

    // Get JSON videos from your data.json file
    const jsonVideos = videoData.videos || [];
    const channelData = videoData.channel || {};

    return {
      props: {
        trendingMovies: trendingData.results || [],
        popularMovies: popularMoviesData.results || [],
        trendingTV: trendingTVData.results || [],
        jsonVideos,
        channelData
      },
      revalidate: 3600 // 1 hour
    }
  } catch (error) {
    console.error('Error fetching TMDB data:', error)
    
    // Fallback to only JSON data if TMDB fails
    const jsonVideos = videoData.videos || [];
    const channelData = videoData.channel || {};

    return {
      props: {
        trendingMovies: [],
        popularMovies: [],
        trendingTV: [],
        jsonVideos,
        channelData
      },
      revalidate: 300 // 5 minutes on error
    }
  }
}