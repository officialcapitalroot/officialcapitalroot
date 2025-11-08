import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VideoPlayerWrapper from "../../components/VideoPlayerWrapper";
import SocialShare from "../../components/SocialShare";
import RelatedVideoCard from "../../components/RelatedVideoCard";
import videoData from "../../data/data.json";
import { getDisplayDuration } from "../../utils/duration";

export default function VideoPage({ video, relatedVideos }) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!video) {
    return <NotFoundState />;
  }

  const canonicalUrl = `https://capitalroot.vercel.app/video/${video.slug}`;
  const displayDuration = getDisplayDuration(video.duration);
  
  const getThumbnailUrl = () => {
    if (!video.thumbnail) return "https://capitalroot.vercel.app/default-thumbnail.jpg";
    if (video.thumbnail.startsWith('http')) return video.thumbnail;
    return `https://capitalroot.vercel.app${video.thumbnail}`;
  };

  const thumbnailUrl = getThumbnailUrl();

  // CORRECTED SCHEMA - FOR PAGE RANKING, NOT VIDEO RANKING
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${video.title} - Watch Online | Capital Root`,
    "description": video.description,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "Movie",
      "name": video.title,
      "description": video.description,
      "image": thumbnailUrl,
      "thumbnailUrl": thumbnailUrl,
      "dateCreated": video.releaseYear ? `${video.releaseYear}` : undefined,
      "genre": video.genre || video.category || "Entertainment",
      "duration": video.duration,
      "actor": video.cast ? video.cast.map(actor => ({ "@type": "Person", "name": actor })) : undefined,
      "director": video.director ? { "@type": "Person", "name": video.director } : undefined,
      "countryOfOrigin": video.country ? { "@type": "Country", "name": video.country } : undefined
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital Root",
      "url": "https://capitalroot.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://capitalroot.vercel.app/icon-512.png"
      }
    },
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": typeof video.viewCount === 'string' 
        ? parseInt(video.viewCount.replace(/[^0-9]/g, '')) || 1000 
        : video.viewCount
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
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
        "name": "Movies",
        "item": "https://capitalroot.vercel.app/videos"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": video.title,
        "item": canonicalUrl
      }
    ]
  };

  // ADDITIONAL VIDEOOBJECT SCHEMA FOR THE EMBEDDED VIDEO
  const videoObjectSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "contentUrl": canonicalUrl, // YOUR PAGE URL, NOT EXTERNAL SERVICE
    "embedUrl": canonicalUrl, // YOUR PAGE URL, NOT EXTERNAL SERVICE
    "publisher": {
      "@type": "Organization",
      "name": "Capital Root",
      "url": "https://capitalroot.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://capitalroot.vercel.app/icon-512.png"
      }
    }
  };

  return (
    <>
      <Head>
        <title>{video.title} - Watch Online | Capital Root</title>
        <meta name="description" content={`Watch ${video.title} online in HD quality. ${video.description}`} />
        <meta name="keywords" content={`${video.title}, watch online, stream, ${video.tags?.join(', ') || ''}, ${video.category}, movies`} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={`${video.title} - Watch Online | Capital Root`} />
        <meta property="og:description" content={video.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content={video.title} />
        <meta property="og:site_name" content="Capital Root" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@capitalroot" />
        <meta name="twitter:title" content={video.title} />
        <meta name="twitter:description" content={video.description} />
        <meta name="twitter:image" content={thumbnailUrl} />
        <meta name="twitter:image:alt" content={video.title} />
        
        {/* CORRECTED STRUCTURED DATA - FOR PAGE RANKING */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
          key="webpage-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
          key="breadcrumb-schema"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjectSchema) }}
          key="videoobject-schema"
        />
      </Head>
      
      <Header />
      <main className="video-page-main">
        <div className="container">
          <div className="page-navigation">
            <button
              onClick={() => router.push("/videos")}
              className="back-button"
              aria-label="Go back to all videos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Back to All Movies
            </button>
          </div>

          <div className="video-page-content">
            <section className="video-player-section">
              <VideoPlayerWrapper
                videoId={video.videoId}
                videoSource={video.videoSource}
                title={video.title}
                autoplay={false}
              />
            </section>

            <section className="video-info-section">
              <div className="video-info-header">
                <h1>{video.title} </h1>
                   {/* <h1>{video.title} ({video.releaseYear})</h1> */}

              </div>

              <div className="video-content-grid">
                <div className="movie-poster">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    width={400}
                    height={600}
                    quality={100}
                    priority
                    className="poster-image"
                  />
                </div>

                <div className="movie-details">
                  <div className="details-grid">
                    {video.director && (
                      <div className="info-item">
                        <strong>Director:</strong> {video.director}
                      </div>
                    )}
                    {video.cast && video.cast.length > 0 && (
                      <div className="info-item">
                        <strong>Cast:</strong> {video.cast.join(', ')}
                      </div>
                    )}
                    {video.genre && (
                      <div className="info-item">
                        <strong>Genre:</strong> {video.genre}
                      </div>
                    )}
                    {video.releaseYear && (
                      <div className="info-item">
                        <strong>Release Year:</strong> {video.releaseYear}
                      </div>
                    )}
                    {video.country && (
                      <div className="info-item">
                        <strong>Country:</strong> {video.country}
                      </div>
                    )}
                    {video.language && (
                      <div className="info-item">
                        <strong>Language:</strong> {video.language}
                      </div>
                    )}
                    {video.quality && (
                      <div className="info-item">
                        <strong>Quality:</strong> {video.quality}
                      </div>
                    )}
                    {video.duration && (
                      <div className="info-item">
                        <strong>Duration:</strong> {video.duration.replace('PT', '').replace('H', 'h ').replace('M', 'm')}
                      </div>
                    )}
                    {video.rating && (
                      <div className="info-item">
                        <strong>Rating:</strong> <span className="rating">{video.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
<div className="page-navigation">
            <button
              onClick={() => router.push("/videos")}
              className="back-button"
              aria-label="Go back to all videos"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Back to All Movies
            </button>
          </div>
              {video.description && (
                <div className="movie-storyline">
                  <h2>Storyline</h2>
                  <p>{video.description}</p>
                </div>
              )}

              {/* <div className="video-description">
                <h2>About This Movie</h2>
                <p>{video.description}</p>
              </div> */}

              {video.tags && video.tags.length > 0 && (
                <div className="video-tags">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="tag">#{tag}</span>
                  ))}
                </div>
              )}

              <div className="technical-specs">
                <h3>Technical Specifications</h3>
                <div className="specs-grid">
                  {video.quality && (
                    <div className="spec-item">
                      <strong>Video Quality:</strong> {video.quality}
                    </div>
                  )}
                  {video.size && (
                    <div className="spec-item">
                      <strong>File Size:</strong> {video.size}
                    </div>
                  )}
                  {video.subtitles && (
                    <div className="spec-item">
                      <strong>Subtitles:</strong> {video.subtitles}
                    </div>
                  )}
                  <div className="spec-item">
                    <strong>Format:</strong> MP4 HD
                  </div>
                </div>
              </div>

              {/* <div className="video-meta">
                <span className="views">
                  👁️ {typeof video.viewCount === 'number' 
                    ? video.viewCount.toLocaleString() 
                    : video.viewCount} views
                </span>
                <span className="date">
                  📅 {new Date(video.uploadDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span className="duration">⏱️ {displayDuration}</span>
                {video.category && <span className="category">🎬 {video.category}</span>}
              </div> */}

              <SocialShare
                title={video.title}
                description={video.description}
                slug={video.slug}
              />
            </section>

            {relatedVideos && relatedVideos.length > 0 && (
              <section className="related-videos">
                <h2>More Movies You Might Like</h2>
                <div className="related-videos-grid">
                  {relatedVideos.map((relatedVideo) => (
                    <RelatedVideoCard key={relatedVideo.id} video={relatedVideo} />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .video-page-main {
          padding: 2rem 0;
          background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%);
          min-height: 100vh;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .page-navigation {
          margin-bottom: 2rem;
        }

        .back-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          text-decoration: none;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .video-page-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .video-player-section {
          width: 100%;
          background: #000;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        .video-info-section {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .video-info-header h1 {
          color: white;
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
        }

        .video-content-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 768px) {
          .video-content-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        .movie-poster {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7);
          transition: transform 0.3s ease;
        }

        .movie-poster:hover {
          transform: scale(1.05);
        }

        .poster-image {
          width: 100%;
          height: auto;
          object-fit: cover;
          border-radius: 12px;
        }

        .movie-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }

        .info-item {
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border-left: 4px solid #e50914;
        }

        .info-item strong {
          color: #e50914;
          font-weight: 600;
          display: block;
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .info-item:not(:has(strong)) {
          color: #ccc;
          font-size: 1rem;
          line-height: 1.5;
        }

        .rating {
          color: #ffd700;
          font-weight: bold;
          font-size: 1.1rem;
        }

        .movie-storyline, .video-description {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border-left: 4px solid #00a8ff;
        }

        .movie-storyline h2, .video-description h2 {
          color: #00a8ff;
          font-size: 1.5rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .movie-storyline p, .video-description p {
          color: #ccc;
          line-height: 1.7;
          font-size: 1.1rem;
        }

        .video-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .tag {
          background: linear-gradient(135deg, #e50914, #ff4757);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.875rem;
          color: white;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .tag:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(229, 9, 20, 0.4);
        }

        .technical-specs {
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border-left: 4px solid #00d2d3;
        }

        .technical-specs h3 {
          color: #00d2d3;
          font-size: 1.25rem;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .spec-item {
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          color: #ccc;
        }

        .spec-item strong {
          color: #00d2d3;
        }

        .video-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .video-meta span {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: #ccc;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
        }

        .related-videos {
          margin-top: 2rem;
        }

        .related-videos h2 {
          color: white;
          font-size: 2rem;
          margin-bottom: 1.5rem;
          font-weight: 700;
          text-align: center;
        }

        .related-videos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .video-info-header h1 {
            font-size: 2rem;
          }
          
          .video-content-grid {
            grid-template-columns: 1fr;
          }
          
          .movie-poster {
            max-width: 300px;
            margin: 0 auto;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
          
          .video-meta {
            flex-direction: column;
            align-items: center;
          }
          
          .technical-specs .specs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

// Loading State Component
function LoadingState() {
  return (
    <>
      <Head>
        <title>Loading... - Capital Root</title>
      </Head>
      <Header />
      <main className="page-main">
        <div className="container">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading video...</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Not Found State Component
function NotFoundState() {
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Video Not Found - Capital Root</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Header />
      <main className="page-main">
        <div className="container">
          <div className="error-message">
            <h1>404 - Video Not Found</h1>
            <p>The video you're looking for doesn't exist or has been removed.</p>
            <div className="navigation-buttons">
              <button onClick={() => router.back()} className="cta-button secondary">
                Go Back
              </button>
              <a href="/videos" className="cta-button primary">
                Browse All Videos
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const videos = videoData.videos;
  const paths = videos.map((video) => ({
    params: { slug: video.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}



export async function getStaticProps({ params }) {
  const video = videoData.videos.find((v) => v.slug === params.slug);

  if (!video) {
    return {
      notFound: true,
    };
  }

   // Get all videos except current one
  const otherVideos = videoData.videos.filter((v) => v.slug !== video.slug);
  
  // Shuffle array randomly
  const shuffledVideos = [...otherVideos].sort(() => Math.random() - 0.5);

  // const relatedVideos = videoData.videos
  //   .filter((v) => v.slug !== video.slug && v.category === video.category)
  //   .slice(0, 6);

  // if (relatedVideos.length < 6) {
  //   const additionalVideos = videoData.videos
  //     .filter((v) => v.slug !== video.slug && !relatedVideos.includes(v))
  //     .slice(0, 6 - relatedVideos.length);
  //   relatedVideos.push(...additionalVideos);
  // }
  // Take first 6 random videos
  const relatedVideos = shuffledVideos.slice(0, 6);


  return {
    props: {
      video,
      relatedVideos,
    },
    revalidate: 3600,
  };
}