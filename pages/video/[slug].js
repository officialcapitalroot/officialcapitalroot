import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VideoPlayerWrapper from "../../components/VideoPlayerWrapper";
import SocialShare from "../../components/SocialShare";
import RelatedVideoCard from "../../components/RelatedVideoCard";
import videoData from "../../data/data.json";

export default function VideoPage({ video, relatedVideos }) {
  const router = useRouter();

  if (router.isFallback) {
    return <LoadingState />;
  }

  if (!video) {
    return <NotFoundState />;
  }

  const canonicalUrl = `https://capitalroot.vercel.app/video/${video.slug}`;
  
  // Get proper thumbnail URL with fallback
  const getThumbnailUrl = () => {
    if (!video.thumbnail) {
      return "https://capitalroot.vercel.app/og-image.jpg";
    }
    
    if (video.thumbnail.startsWith('http')) {
      return video.thumbnail;
    } else {
      return `https://capitalroot.vercel.app${video.thumbnail}`;
    }
  }

  const thumbnailUrl = getThumbnailUrl();

  // WebPage Schema for SEO
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${video.title} - Watch Online | Capital Root Movies`,
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
      "actor": video.cast
        ? video.cast.map((actor) => ({ "@type": "Person", name: actor }))
        : undefined,
      "director": video.director
        ? { "@type": "Person", name: video.director }
        : undefined,
      "countryOfOrigin": video.country
        ? { "@type": "Country", name: video.country }
        : undefined,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital Root Movies",
      "url": "https://capitalroot.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://capitalroot.vercel.app/icon-512.png",
      },
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
        "item": "https://capitalroot.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Movies",
        "item": "https://capitalroot.vercel.app/videos",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": video.title,
        "item": canonicalUrl,
      },
    ],
  };

  const videoObjectSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "contentUrl": canonicalUrl,
    "embedUrl": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Capital Root Movies",
      "url": "https://capitalroot.vercel.app",
      "logo": {
        "@type": "ImageObject",
        "url": "https://capitalroot.vercel.app/icon-512.png",
      },
    },
  };

  return (
    <>
      <Head>
        <title>{video.title} - Watch Online | Capital Root Movies</title>
        <meta
          name="description"
          content={`Watch ${video.title} online in HD quality. ${video.description}`}
        />
        <meta
          name="keywords"
          content={`${video.title}, watch online, stream, ${
            video.tags?.join(", ") || ""
          }, ${video.category}, movies`}
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content={`${video.title} - Watch Online | Capital Root Movies`}
        />
        <meta property="og:description" content={video.description} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content={video.title} />
        <meta property="og:site_name" content="Capital Root Movies" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@capitalroot" />
        <meta name="twitter:title" content={video.title} />
        <meta name="twitter:description" content={video.description} />
        <meta name="twitter:image" content={thumbnailUrl} />
        <meta name="twitter:image:alt" content={video.title} />

        {/* Structured Data */}
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
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoObjectSchema),
          }}
          key="videoobject-schema"
        />
      </Head>

      <Header />
      <main className="video-page-main">
        <div className="container">
          <nav aria-label="Breadcrumb" className="page-navigation">
            <button
              onClick={() => router.push("/videos")}
              className="back-button"
              aria-label="Go back to all videos"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Back to All Movies
            </button>
          </nav>

          <article className="video-page-content">
            <section className="video-player-section" style={{ marginTop: "60px" }}>
              <VideoPlayerWrapper
                videoId={video.videoId}
                videoSource={video.videoSource}
                title={video.title}
                autoplay={false}
              />
            </section>

            <section className="video-info-section">
              <header className="video-info-header">
                <h1>{video.title}</h1>
              </header>

              <div className="video-content-grid">
                <div className="movie-poster">
                  <Image
                    src={video.thumbnail}
                    alt={`${video.title} movie poster`}
                    width={400}
                    height={600}
                    quality={85}
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
                        <strong>Cast:</strong> {video.cast.join(", ")}
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
                        <strong>Duration:</strong>{" "}
                        {video.duration
                          .replace("PT", "")
                          .replace("H", "h ")
                          .replace("M", "m")}
                      </div>
                    )}
                    {video.rating && (
                      <div className="info-item">
                        <strong>Rating:</strong>{" "}
                        <span className="rating">{video.rating}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {video.description && (
                <div className="movie-storyline">
                  <h2>Storyline</h2>
                  <p>{video.description}</p>
                </div>
              )}

              {/* {video.tags && video.tags.length > 0 && (
                <div className="video-tags">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )} */}

<nav aria-label="Breadcrumb" className="page-navigation">
            <button
              onClick={() => router.push("/videos")}
              className="back-button"
              aria-label="Go back to all videos"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              Back to All Movies
            </button>
          </nav>

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

              <SocialShare
                title={video.title}
                description={video.description}
                slug={video.slug}
              />
            </section>

            {relatedVideos && relatedVideos.length > 0 && (
              <aside className="related-videos" aria-label="Recommended movies">
                <h2>More Movies You Might Like</h2>
                <div className="related-videos-grid">
                  {relatedVideos.map((relatedVideo) => (
                    <RelatedVideoCard
                      key={relatedVideo.id}
                      video={relatedVideo}
                    />
                  ))}
                </div>
              </aside>
            )}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

// Loading and Not Found components remain the same...
// [Include the existing LoadingState and NotFoundState components]

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

  // Take first 6 random videos
  const relatedVideos = shuffledVideos.slice(0, 8);

  return {
    props: {
      video,
      relatedVideos,
    },
    revalidate: 3600,
  };
}