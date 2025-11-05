// import Head from "next/head";
// import { useRouter } from "next/router";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import VideoPlayerWrapper from "../../components/VideoPlayerWrapper";
// import SocialShare from "../../components/SocialShare";
// import RelatedVideoCard from "../../components/RelatedVideoCard";
// import videoData from "../../data/data.json";

// export default function VideoPage({ video }) {
//   const router = useRouter();

//   if (router.isFallback) {
//     return (
//       <>
//         <Head>
//           <title>Loading... - Capital Root</title>
//         </Head>
//         <Header />
//         <main className="page-main">
//           <div className="container">
//             <div className="loading">
//               <div className="loading-spinner"></div>
//               <p>Loading video...</p>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   if (!video) {
//     return (
//       <>
//         <Head>
//           <title>Video Not Found - Capital Root</title>
//         </Head>
//         <Header />
//         <main className="page-main">
//           <div className="container">
//             <div className="error-message">
//               <h1>Video Not Found</h1>
//               <p>
//                 The video you're looking for doesn't exist or has been removed.
//               </p>
//               <div className="navigation-buttons">
//                 <button
//                   onClick={() => router.back()}
//                   className="cta-button secondary"
//                 >
//                   Go Back
//                 </button>
//                 <a href="/videos" className="cta-button primary">
//                   Browse All Videos
//                 </a>
//               </div>
//             </div>
//           </div>
//         </main>
//         <Footer />
//       </>
//     );
//   }

//   // Generate proper URLs based on video source
//   const getVideoUrls = () => {
//     if (video.videoSource === "youtube") {
//       return {
//         videoUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
//         embedUrl: `https://www.youtube.com/embed/${video.videoId}`,
//         thumbnail: video.thumbnail, // YouTube thumbnail
//       };
//     } else if (video.videoSource === "shorticu") {
//       return {
//         videoUrl: `https://short.icu/${video.videoId}`,
//         embedUrl: `https://short.icu/${video.videoId}`,
//         thumbnail: video.thumbnail, // ShortICU thumbnail from your data
//       };
//     }
//     // Fallback
//     return {
//       videoUrl: `https://capitalroot.vercel.app/video/${video.videoId}`,
//       embedUrl: `https://capitalroot.vercel.app/video/${video.videoId}`,
//       thumbnail: video.thumbnail,
//     };
//   };

//   const urls = getVideoUrls();
//   const canonicalUrl = `https://capitalroot.vercel.app/video/${video.videoId}`;

//   // Calculate duration in seconds for schema
//   const durationInSeconds = video.duration
//     .split(":")
//     .reduce((acc, time) => 60 * acc + +time);

//   // Enhanced Video Schema
//   const videoSchema = {
//     "@context": "https://schema.org",
//     "@type": "VideoObject",
//     name: video.title,
//     description: video.description,
//     thumbnailUrl: urls.thumbnail,
//     uploadDate: video.uploadDate,
//     duration: `PT${durationInSeconds}S`,
//     contentUrl: urls.videoUrl,
//     embedUrl: urls.embedUrl,
//     interactionCount: parseInt(video.viewCount.replace("K", "000")) || 1000,
//     author: {
//       "@type": "Organization",
//       name: "Capital Root",
//       url: "https://www.youtube.com/channel/UCS7Ahfb_tr9uUz_XuiNJtGg",
//     },
//     publisher: {
//       "@type": "Organization",
//       name: "Capital Root",
//       logo: {
//         "@type": "ImageObject",
//         url: "https://capitalroot.vercel.app/icon-512.png",
//         width: 512,
//         height: 512,
//       },
//     },
//     genre: video.tags.slice(0, 3).join(", "),
//     keywords: video.tags.join(", "),
//     thumbnail: {
//       "@type": "ImageObject",
//       url: urls.thumbnail,
//       width: 1280,
//       height: 720,
//     },
//     potentialAction: {
//       "@type": "WatchAction",
//       target: urls.videoUrl,
//     },
//   };

//   // Breadcrumb Schema
//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     itemListElement: [
//       {
//         "@type": "ListItem",
//         position: 1,
//         name: "Home",
//         item: "https://capitalroot.vercel.app",
//       },
//       {
//         "@type": "ListItem",
//         position: 2,
//         name: "Videos",
//         item: "https://capitalroot.vercel.app/videos",
//       },
//       {
//         "@type": "ListItem",
//         position: 3,
//         name: video.title,
//         item: canonicalUrl,
//       },
//     ],
//   };

//   return (
//     <>
//       <Head>
//         <title>{video.title} - Capital Root</title>
//         <meta
//           name="description"
//           content={video.description.substring(0, 160)}
//         />
//         <meta name="keywords" content={video.tags.join(", ")} />
//         <link rel="canonical" href={canonicalUrl} />

//         {/* Open Graph */}
//         <meta property="og:title" content={video.title} />
//         <meta
//           property="og:description"
//           content={video.description.substring(0, 160)}
//         />
//         <meta property="og:type" content="video.other" />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:image" content={urls.thumbnail} />
//         <meta property="og:image:width" content="1280" />
//         <meta property="og:image:height" content="720" />
//         <meta property="og:video" content={urls.embedUrl} />
//         <meta property="og:video:type" content="text/html" />
//         <meta property="og:video:width" content="1280" />
//         <meta property="og:video:height" content="720" />
//         <meta property="og:video:secure_url" content={urls.embedUrl} />
//         <meta property="og:site_name" content="Capital Root" />
//         <meta property="og:locale" content="en_US" />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="player" />
//         <meta name="twitter:site" content="@capital_root" />
//         <meta name="twitter:creator" content="@capital_root" />
//         <meta name="twitter:title" content={video.title} />
//         <meta
//           name="twitter:description"
//           content={video.description.substring(0, 160)}
//         />
//         <meta name="twitter:image" content={urls.thumbnail} />
//         <meta name="twitter:player" content={urls.embedUrl} />
//         <meta name="twitter:player:width" content="1280" />
//         <meta name="twitter:player:height" content="720" />
//         <meta name="twitter:player:stream" content={urls.videoUrl} />

//         {/* Additional Meta Tags */}
//         <meta name="robots" content="index, follow" />
//         <meta name="author" content="Capital Root" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />

//         {/* Structured Data */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(videoSchema),
//           }}
//         />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(breadcrumbSchema),
//           }}
//         />
//       </Head>

//       <Header />
//       <main className="video-page-main">
//         <div className="container">
//           {/* Back to Videos Button */}
//           <div className="page-navigation">
//             <button
//               onClick={() => router.push("/videos")}
//               className="back-button"
//               aria-label="Go back to all videos"
//             >
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="currentColor"
//               >
//                 <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
//               </svg>
//               Back to All Videos
//             </button>
//           </div>

//           <div className="video-page-content">
//             {/* Video Player Section */}
//             <section className="video-player-section">
//               <VideoPlayerWrapper
//                 videoId={video.videoId}
//                 videoSource={video.videoSource}
//                 title={video.title}
//               />

//               <div className="video-info">
//                 <h1 className="video-title">{video.title}</h1>

//                 <div className="video-meta">
//                   <span className="views">{video.viewCount} views</span>
//                   <span className="date">
//                     {new Date(video.uploadDate).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </span>
//                   <span className="duration">{video.duration}</span>
//                   <span className="source-badge">{video.videoSource}</span>
//                 </div>

//                 <div className="video-description">
//                   <p>{video.description}</p>
//                 </div>

//                 <div className="video-tags">
//                   {video.tags.map((tag, index) => (
//                     <span key={index} className="tag">
//                       #{tag}
//                     </span>
//                   ))}
//                 </div>

//                 <SocialShare
//                   title={video.title}
//                   description={video.description}
//                   videoSource={video.videoSource}
//                   videoId={video.videoId}
//                   thumbnail={video.thumbnail}
//                 />
//                 <div className="video-navigation">
//                   <button
//                     onClick={() => router.push("/videos")}
//                     className="cta-button secondary"
//                   >
//                     ← Back to All Videos
//                   </button>
//                 </div>
//               </div>
//             </section>

//             {/* Related Videos Section */}
//             <section className="related-videos-section">
//               <h2 className="related-videos-title">
//                 More Videos You Might Like
//               </h2>
//               <div className="related-videos-grid">
//                 {videoData.videos
//                   .filter((v) => v.videoId !== video.videoId)
//                   .slice(0, 8)
//                   .map((relatedVideo) => (
//                     <RelatedVideoCard
//                       key={relatedVideo.id}
//                       video={relatedVideo}
//                     />
//                   ))}
//               </div>
//             </section>
//           </div>
//         </div>
//       </main>
//       <Footer />
//     </>
//   );
// }

// export async function getStaticPaths() {
//   const videos = videoData.videos;

//   const paths = videos.map((video) => ({
//     params: { videoId: video.videoId.toString() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const video = videoData.videos.find((v) => v.videoId === params.videoId);

//   if (!video) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       video,
//     },
//     revalidate: 3600,
//   };
// }









// import Head from 'next/head'
// import Header from '../../components/Header'
// import VideoPlayerWrapper from '../../components/VideoPlayerWrapper'
// import RelatedVideoCard from '../../components/RelatedVideoCard'
// import Footer from '../../components/Footer'
// import videoData from '../../data/data.json'

import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import VideoPlayerWrapper from "../../components/VideoPlayerWrapper";
import SocialShare from "../../components/SocialShare";
import RelatedVideoCard from "../../components/RelatedVideoCard";
import videoData from "../../data/data.json";

export default function VideoPage({ video, relatedVideos }) {
  if (!video) {
    return <div>Video not found</div>
  }

    const router = useRouter();

  if (router.isFallback) {
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

  if (!video) {
    return (
      <>
        <Head>
          <title>Video Not Found - Capital Root</title>
        </Head>
        <Header />
        <main className="page-main">
          <div className="container">
            <div className="error-message">
              <h1>Video Not Found</h1>
              <p>
                The video you're looking for doesn't exist or has been removed.
              </p>
              <div className="navigation-buttons">
                <button
                  onClick={() => router.back()}
                  className="cta-button secondary"
                >
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
  const canonicalUrl = `https://capitalroot.vercel.app/video/${video.videoId}`
  
  // Helper function to get proper video URLs
  const getVideoUrls = (video) => {
    if (video.videoSource === 'youtube') {
      return {
        contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
        embedUrl: `https://www.youtube.com/embed/${video.videoId}`
      }
    } else {
      return {
        contentUrl: `https://short.icu/${video.videoId}`,
        embedUrl: `https://short.icu/${video.videoId}`
      }
    }
  }

  const urls = getVideoUrls(video)

  // VideoObject Schema for this specific video
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": [
      video.thumbnail.startsWith('http') ? video.thumbnail : `https://capitalroot.vercel.app${video.thumbnail}`,
      video.thumbnail.startsWith('http') ? video.thumbnail : `https://capitalroot.vercel.app${video.thumbnail}`
    ],
    "uploadDate": video.uploadDate,
    "duration": video.duration,
    "contentUrl": urls.contentUrl,
    "embedUrl": urls.embedUrl,
    "url": canonicalUrl,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": video.viewCount
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital Root",
      "logo": {
        "@type": "ImageObject",
        "url": "https://capitalroot.vercel.app/icon-512.png",
        "width": 512,
        "height": 512
      }
    }
  }

  return (
    <>
      <Head>
        <title>{video.title} - Capital Root</title>
        <meta name="description" content={video.description} />
        <meta name="keywords" content={video.tags.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={video.description} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={video.thumbnail.startsWith('http') ? video.thumbnail : `https://capitalroot.vercel.app${video.thumbnail}`} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content={video.title} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@capitalroot" />
        <meta name="twitter:title" content={video.title} />
        <meta name="twitter:description" content={video.description} />
        <meta name="twitter:image" content={video.thumbnail.startsWith('http') ? video.thumbnail : `https://capitalroot.vercel.app${video.thumbnail}`} />
        <meta name="twitter:player" content={urls.embedUrl} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        
        {/* Video Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoSchema)
          }}
        />
      </Head>
      
      <Header />
            <main className="video-page-main">
        <div className="container">
          {/* Back to Videos Button */}
          <div className="page-navigation">
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
              Back to All Videos
            </button>
          </div>

          <div className="video-page-content">
            {/* Video Player Section */}
            <section className="video-player-section">
              <VideoPlayerWrapper
                videoId={video.videoId}
                videoSource={video.videoSource}
                title={video.title}
              />

              <div className="video-info">
                <h1 className="video-title">{video.title}</h1>

                <div className="video-meta">
                  <span className="views">{video.viewCount} views</span>
                  <span className="date">
                    {new Date(video.uploadDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="duration">{video.duration}</span>
                  <span className="source-badge">{video.videoSource}</span>
                </div>

                <div className="video-description">
                  <p>{video.description}</p>
                </div>

                <div className="video-tags">
                  {video.tags.map((tag, index) => (
                    <span key={index} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>

                <SocialShare
                  title={video.title}
                  description={video.description}
                  videoSource={video.videoSource}
                  videoId={video.videoId}
                  thumbnail={video.thumbnail}
                />
                <div className="video-navigation">
                  <button
                    onClick={() => router.push("/videos")}
                    className="cta-button secondary"
                  >
                    ← Back to All Videos
                  </button>
                </div>
              </div>
            </section>

            {/* Related Videos Section */}
            <section className="related-videos-section">
              <h2 className="related-videos-title">
                More Videos You Might Like
              </h2>
              <div className="related-videos-grid">
                {videoData.videos
                  .filter((v) => v.videoId !== video.videoId)
                  .slice(0, 8)
                  .map((relatedVideo) => (
                    <RelatedVideoCard
                      key={relatedVideo.id}
                      video={relatedVideo}
                    />
                  ))}
              </div>
            </section>
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
    params: { videoId: video.videoId.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const video = videoData.videos.find((v) => v.videoId === params.videoId);

  if (!video) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      video,
    },
    revalidate: 3600,
  };
}