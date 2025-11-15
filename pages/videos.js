// // pages/videos.js
// import Head from "next/head";
// import Header from "../components/Header";
// import VideoGrid from "../components/VideoGrid";
// import Footer from "../components/Footer";
// import { getPopular, getTrending } from "../lib/tmdb";
// import videoData from "../data/data.json";

// export default function Videos({ movies, tvShows, jsonVideos }) {
//   const canonicalUrl = "https://capitalroot.vercel.app/videos";
//   const pageTitle = "All Movies & TV Shows - Complete Collection | Capital Root Movies";
  
//   // Separate JSON videos by type
//   const jsonMovies = jsonVideos.filter(video => 
//     !video.title?.toLowerCase().includes('season') && 
//     !video.title?.toLowerCase().includes('episode') &&
//     !video.description?.toLowerCase().includes('tv') &&
//     !video.category?.toLowerCase().includes('series')
//   );

//   const jsonTVShows = jsonVideos.filter(video => 
//     video.title?.toLowerCase().includes('season') || 
//     video.title?.toLowerCase().includes('episode') ||
//     video.description?.toLowerCase().includes('tv') ||
//     video.category?.toLowerCase().includes('series')
//   );

//   const totalMovies = movies.length + jsonMovies.length;
//   const totalTVShows = tvShows.length + jsonTVShows.length;
//   const totalTitles = totalMovies + totalTVShows;

//   const pageDescription = `Browse our complete collection of ${totalTitles}+ movies and TV shows. Watch Hollywood, Bollywood, and regional cinema online in HD quality.`;

//   const collectionSchema = {
//     "@context": "https://schema.org",
//     "@type": "CollectionPage",
//     name: "All Movies & TV Shows - Capital Root",
//     description: pageDescription,
//     url: canonicalUrl,
//     mainEntity: {
//       "@type": "ItemList",
//       numberOfItems: totalTitles,
//       itemListElement: [
//         ...movies.slice(0, 25).map((item, index) => ({
//           "@type": "ListItem",
//           position: index + 1,
//           url: `https://capitalroot.vercel.app/video/movie/${item.id}`,
//           name: item.title,
//           image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
//           description: item.overview,
//           dateCreated: item.release_date,
//           "@type": "Movie",
//           duration: `PT${Math.floor(Math.random() * 180) + 90}M`
//         })),
//         ...jsonMovies.slice(0, 25).map((item, index) => ({
//           "@type": "ListItem",
//           position: movies.length + index + 1,
//           url: `https://capitalroot.vercel.app/video/${item.slug}`,
//           name: item.title,
//           image: item.thumbnail,
//           description: item.description,
//           dateCreated: item.uploadDate,
//           "@type": "Movie",
//           director: item.director
//         }))
//       ],
//     },
//     breadcrumb: {
//       "@type": "BreadcrumbList",
//       itemListElement: [
//         {
//           "@type": "ListItem",
//           position: 1,
//           name: "Home",
//           item: "https://capitalroot.vercel.app",
//         },
//         {
//           "@type": "ListItem",
//           position: 2,
//           name: "All Movies & TV Shows",
//           item: canonicalUrl,
//         },
//       ],
//     },
//   };

//   return (
//     <>
//       <Head>
//         <title>{pageTitle}</title>
//         <meta name="description" content={pageDescription} />
//         <meta
//           name="keywords"
//           content="all movies, movie collection, watch movies, streaming movies, Hollywood, Bollywood, TV shows, series, action movies, drama movies, thriller movies, comedy movies"
//         />
//         <link rel="canonical" href={canonicalUrl} />

//         <meta property="og:title" content={pageTitle} />
//         <meta property="og:description" content={pageDescription} />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta
//           property="og:image"
//           content="https://capitalroot.vercel.app/og-image.jpg"
//         />
//         <meta property="og:image:width" content="1200" />
//         <meta property="og:image:height" content="630" />

//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={pageTitle} />
//         <meta name="twitter:description" content={pageDescription} />
//         <meta
//           name="twitter:image"
//           content="https://capitalroot.vercel.app/og-image.jpg"
//         />

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
//             <h1>🎬 Complete Movies & TV Shows Collection</h1>
//             <p className="page-subtitle">
//               Browse our complete collection of {totalTitles}+ movies and TV shows. 
//               Watch online in HD quality with multiple streaming options.
//             </p>
            
//             {/* Quick Stats */}
//             <div className="stats-grid">
//               <div className="stat-item">
//                 <span className="stat-number">{totalMovies}+</span>
//                 <span className="stat-label">Movies</span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-number">{totalTVShows}+</span>
//                 <span className="stat-label">TV Shows</span>
//               </div>
//               <div className="stat-item">
//                 <span className="stat-number">{totalTitles}+</span>
//                 <span className="stat-label">Total Titles</span>
//               </div>
//             </div>
//           </div>

//           {/* TMDB Movies Section */}
//           <section className="content-section">
//             <h2 className="section-title">🎥 Popular Movies (TMDB)</h2>
//             <VideoGrid videos={movies} mediaType="movie" showViewAll={false} />
//           </section>

//           {/* Our Movie Collection */}
//           {jsonMovies.length > 0 && (
//             <section className="content-section">
//               <h2 className="section-title">🌟 Our Movie Collection</h2>
//               <VideoGrid videos={jsonMovies} mediaType="json" showViewAll={false} />
//             </section>
//           )}

//           {/* TMDB TV Shows Section */}
//           <section className="content-section">
//             <h2 className="section-title">📺 Popular TV Shows (TMDB)</h2>
//             <VideoGrid videos={tvShows} mediaType="tv" showViewAll={false} />
//           </section>

//           {/* Our TV Show Collection */}
//           {jsonTVShows.length > 0 && (
//             <section className="content-section">
//               <h2 className="section-title">🌟 Our TV Show Collection</h2>
//               <VideoGrid videos={jsonTVShows} mediaType="json" showViewAll={false} />
//             </section>
//           )}
//         </div>
//       </main>
//       <Footer />

//       <style jsx>{`
//         .page-main {
//           padding: 2rem 0;
//         }

//         .container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 0 1rem;
//         }

//         .page-header {
//           text-align: center;
//           margin-bottom: 3rem;
//         }
        
//         .page-subtitle {
//           font-size: 1.2rem;
//           color: #666;
//           margin-bottom: 2rem;
//         }
        
//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//           gap: 1rem;
//           margin: 2rem 0;
//           max-width: 600px;
//           margin-left: auto;
//           margin-right: auto;
//         }
        
//         .stat-item {
//           text-align: center;
//           padding: 1rem;
//           background: #f8f9fa;
//           border-radius: 8px;
//           border: 1px solid #e9ecef;
//         }
        
//         .stat-number {
//           display: block;
//           font-size: 1.8rem;
//           font-weight: bold;
//           color: #e50914;
//         }
        
//         .stat-label {
//           font-size: 0.8rem;
//           color: #666;
//           text-transform: uppercase;
//           font-weight: 600;
//         }
        
//         .content-section {
//           margin-bottom: 4rem;
//         }
        
//         .section-title {
//           font-size: 1.8rem;
//           margin-bottom: 1.5rem;
//           color: #333;
//           border-left: 4px solid #e50914;
//           padding-left: 1rem;
//         }

//         @media (max-width: 768px) {
//           .stats-grid {
//             grid-template-columns: repeat(2, 1fr);
//           }
          
//           .section-title {
//             font-size: 1.5rem;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// export async function getStaticProps() {
//   try {
//     const [moviesData, tvShowsData] = await Promise.all([
//       getPopular('movie'),
//       getPopular('tv')
//     ]);

//     // Get JSON videos from your data.json file
//     const jsonVideos = videoData.videos || [];

//     return {
//       props: {
//         movies: moviesData.results || [],
//         tvShows: tvShowsData.results || [],
//         jsonVideos
//       },
//       revalidate: 3600 // 1 hour
//     };
//   } catch (error) {
//     console.error('Error fetching videos data:', error);
    
//     // Fallback to only JSON data if TMDB fails
//     const jsonVideos = videoData.videos || [];

//     return {
//       props: {
//         movies: [],
//         tvShows: [],
//         jsonVideos
//       },
//       revalidate: 300 // 5 minutes on error
//     };
//   }
// }












// pages/videos.js
import Head from "next/head";
import Header from "../components/Header";
import VideoGrid from "../components/VideoGrid";
import Footer from "../components/Footer";
import { getPopular, getTrending } from "../lib/tmdb";
import videoData from "../data/data.json";

export default function Videos({ movies, tvShows, jsonVideos }) {
  const canonicalUrl = "https://capitalroot.vercel.app/videos";
  const pageTitle = "All Movies & TV Shows - Complete Collection | Capital Root Movies";
  
  // Direct count from JSON - no complex separation
  const totalJsonVideos = jsonVideos.length;
  const totalTMDBMovies = movies.length;
  const totalTMDBSeries = tvShows.length;
  const totalTitles = totalJsonVideos + totalTMDBMovies + totalTMDBSeries;

  const pageDescription = `Browse our complete collection of ${totalTitles}+ movies and TV shows. Watch Hollywood, Bollywood, and regional cinema online in HD quality.`;

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Movies & TV Shows - Capital Root",
    description: pageDescription,
    url: canonicalUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalTitles,
      itemListElement: [
        ...movies.slice(0, 10).map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://capitalroot.vercel.app/video/movie/${item.id}`,
          name: item.title,
          image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          description: item.overview,
          dateCreated: item.release_date,
          "@type": "Movie"
        })),
        ...jsonVideos.slice(0, 10).map((item, index) => ({
          "@type": "ListItem",
          position: movies.length + index + 1,
          url: `https://capitalroot.vercel.app/video/${item.slug}`,
          name: item.title,
          image: item.thumbnail,
          description: item.description,
          dateCreated: item.uploadDate,
          "@type": "Movie"
        }))
      ],
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://capitalroot.vercel.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "All Movies & TV Shows",
          item: canonicalUrl,
        },
      ],
    },
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="all movies, movie collection, watch movies, streaming movies, Hollywood, Bollywood, TV shows, series, action movies, drama movies, thriller movies, comedy movies"
        />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta
          property="og:image"
          content="https://capitalroot.vercel.app/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta
          name="twitter:image"
          content="https://capitalroot.vercel.app/og-image.jpg"
        />

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
            <h1>🎬 Complete Movies & TV Shows Collection</h1>
            <p className="page-subtitle">
              Browse our complete collection of {totalTitles}+ movies and TV shows. 
              Watch online in HD quality with multiple streaming options.
            </p>
            
            {/* Quick Stats - Simple and Accurate */}
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">{totalTMDBMovies}+</span>
                <span className="stat-label">Top TMDB Movies</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{totalTMDBSeries}+</span>
                <span className="stat-label">Top TMDB Series</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{totalJsonVideos}+</span>
                <span className="stat-label">Our Videos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{totalTitles}</span>
                <span className="stat-label">Total Titles</span>
              </div>
            </div>
          </div>

          {/* TMDB Movies Section */}
          {movies.length > 0 && (
            <section className="content-section">
              <h2 className="section-title">🎥 Popular Movies (TMDB)</h2>
              <VideoGrid videos={movies} mediaType="movie" showViewAll={false} />
            </section>
          )}

          {/* Our Complete Video Collection - ALL JSON VIDEOS */}
          {jsonVideos.length > 0 && (
            <section className="content-section">
              <div className="section-header">
                <h2 className="section-title">🌟 Our Complete Video Collection</h2>
                <div className="collection-count">
                  Total Videos: {jsonVideos.length}
                </div>
              </div>
              <p className="collection-description">
                All videos from our database - movies, TV shows, and more.
              </p>
              <VideoGrid videos={jsonVideos} mediaType="json" showViewAll={false} />
            </section>
          )}

          {/* TMDB TV Shows Section */}
          {tvShows.length > 0 && (
            <section className="content-section">
              <h2 className="section-title">📺 Popular TV Shows (TMDB)</h2>
              <VideoGrid videos={tvShows} mediaType="tv" showViewAll={false} />
            </section>
          )}
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .page-main {
          padding: 2rem 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .page-subtitle {
          font-size: 1.2rem;
          color: #666;
          margin-bottom: 2rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 1rem;
          margin: 2rem 0;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .stat-item {
          text-align: center;
          padding: 1rem;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }
        
        .stat-number {
          display: block;
          font-size: 1.8rem;
          font-weight: bold;
          color: #e50914;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #666;
          text-transform: uppercase;
          font-weight: 600;
        }
        
        .content-section {
          margin-bottom: 4rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .section-title {
          font-size: 1.8rem;
          margin-bottom: 0;
          color: #333;
          border-left: 4px solid #e50914;
          padding-left: 1rem;
        }

        .collection-count {
          background: #e50914;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: bold;
        }

        .collection-description {
          color: #666;
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .section-title {
            font-size: 1.5rem;
          }

          .section-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .collection-count {
            align-self: flex-start;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .page-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  try {
    const [moviesData, tvShowsData] = await Promise.all([
      getPopular('movie'),
      getPopular('tv')
    ]);

    // Get ALL JSON videos directly from the data.json file
    // This will include ALL 25 videos from your JSON file
    const jsonVideos = videoData.videos || [];

    console.log(`Loaded ${jsonVideos.length} videos from JSON file`);

    return {
      props: {
        movies: moviesData.results || [],
        tvShows: tvShowsData.results || [],
        jsonVideos // This now contains ALL 25 videos
      },
      revalidate: 3600
    };
  } catch (error) {
    console.error('Error fetching videos data:', error);
    
    // Fallback - still load ALL JSON videos
    const jsonVideos = videoData.videos || [];

    return {
      props: {
        movies: [],
        tvShows: [],
        jsonVideos
      },
      revalidate: 300
    };
  }
}