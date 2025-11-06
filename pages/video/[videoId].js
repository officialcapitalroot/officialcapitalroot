// // import Head from "next/head";
// // import { useRouter } from "next/router";
// // import Header from "../../components/Header";
// // import Footer from "../../components/Footer";
// // import VideoPlayerWrapper from "../../components/VideoPlayerWrapper";
// // import SocialShare from "../../components/SocialShare";
// // import RelatedVideoCard from "../../components/RelatedVideoCard";
// // import videoData from "../../data/data.json";
// // import { getDisplayDuration } from "../../utils/duration";

// // export default function VideoPage({ video, relatedVideos }) {
// //   const router = useRouter();

// //   if (router.isFallback) {
// //     return (
// //       <>
// //         <Head>
// //           <title>Loading... - Capital Root</title>
// //         </Head>
// //         <Header />
// //         <main className="page-main">
// //           <div className="container">
// //             <div className="loading">
// //               <div className="loading-spinner"></div>
// //               <p>Loading video...</p>
// //             </div>
// //           </div>
// //         </main>
// //         <Footer />
// //       </>
// //     );
// //   }

// //   if (!video) {
// //     return (
// //       <>
// //         <Head>
// //           <title>Video Not Found - Capital Root</title>
// //         </Head>
// //         <Header />
// //         <main className="page-main">
// //           <div className="container">
// //             <div className="error-message">
// //               <h1>Video Not Found</h1>
// //               <p>
// //                 The video you're looking for doesn't exist or has been removed.
// //               </p>
// //               <div className="navigation-buttons">
// //                 <button
// //                   onClick={() => router.back()}
// //                   className="cta-button secondary"
// //                 >
// //                   Go Back
// //                 </button>
// //                 <a href="/videos" className="cta-button primary">
// //                   Browse All Videos
// //                 </a>
// //               </div>
// //             </div>
// //           </div>
// //         </main>
// //         <Footer />
// //       </>
// //     );
// //   }

// //   const canonicalUrl = `https://capitalroot.vercel.app/video/${video.videoId}`;
  
// //   // Helper function to get proper video URLs
// //   const getVideoUrls = (video) => {
// //     if (video.videoSource === 'youtube') {
// //       return {
// //         contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
// //         embedUrl: `https://www.youtube.com/embed/${video.videoId}`
// //       }
// //     } else {
// //       return {
// //         contentUrl: `https://short.icu/${video.videoId}`,
// //         embedUrl: `https://short.icu/embed/${video.videoId}`
// //       }
// //     }
// //   }

// //   const urls = getVideoUrls(video);
// //   const displayDuration = getDisplayDuration(video.duration);

// //   // Convert duration to seconds for schema
// //   const convertDurationToSeconds = (duration) => {
// //     if (duration.includes('PT')) {
// //       // ISO 8601 format
// //       const time = duration.replace('PT', '');
// //       let seconds = 0;
      
// //       const hoursMatch = time.match(/(\d+)H/);
// //       const minutesMatch = time.match(/(\d+)M/);
// //       const secondsMatch = time.match(/(\d+)S/);
      
// //       if (hoursMatch) seconds += parseInt(hoursMatch[1]) * 3600;
// //       if (minutesMatch) seconds += parseInt(minutesMatch[1]) * 60;
// //       if (secondsMatch) seconds += parseInt(secondsMatch[1]);
      
// //       return seconds;
// //     }
// //     return 300; // default 5 minutes
// //   }

// //   // VideoObject Schema for this specific video - ONLY on watch page
// //   const videoSchema = {
// //     "@context": "https://schema.org",
// //     "@type": "VideoObject",
// //     "name": video.title,
// //     "description": video.description,
// //     "thumbnailUrl": video.thumbnail.startsWith('http') ? video.thumbnail : `https://capitalroot.vercel.app${video.thumbnail}`,
// //     "uploadDate": video.uploadDate,
// //     "duration": `PT${convertDurationToSeconds(video.duration)}S`,
// //     "contentUrl": urls.contentUrl,
// //     "embedUrl": urls.embedUrl,
// //     "url": canonicalUrl,
// //     "interactionStatistic": {
// //       "@type": "InteractionCounter",
// //       "interactionType": { "@type": "WatchAction" },
// //       "userInteractionCount": typeof video.viewCount === 'string' ? parseInt(video.viewCount.replace(/[^0-9]/g, '')) || 1000 : video.viewCount
// //     },
// //     "publisher": {
// //       "@type": "Organization",
// //       "name": "Capital Root",
// //       "url": "https://capitalroot.vercel.app",
// //       "logo": {
// //         "@type": "ImageObject",
// //         "url": "https://capitalroot.vercel.app/icon-512.png",
// //         "width": 512,
// //         "height": 512
// //       }
// //     },
// //     "genre": video.category || "Entertainment",
// //     "isFamilyFriendly": video.familyFriendly !== undefined ? video.familyFriendly : true
// //   }

// //   // Breadcrumb Schema
// //   const breadcrumbSchema = {
// //     "@context": "https://schema.org",
// //     "@type": "BreadcrumbList",
// //     "itemListElement": [
// //       {
// //         "@type": "ListItem",
// //         "position": 1,
// //         "name": "Home",
// //         "item": "https://capitalroot.vercel.app"
// //       },
// //       {
// //         "@type": "ListItem",
// //         "position": 2,
// //         "name": "Videos",
// //         "item": "https://capitalroot.vercel.app/videos"
// //       },
// //       {
// //         "@type": "ListItem",
// //         "position": 3,
// //         "name": video.title,
// //         "item": canonicalUrl
// //       }
// //     ]
// //   }

// //   return (
// //     <>
// //       <Head>
// //         <title>{video.title} - Capital Root</title>
// //         <meta name="description" content={video.description} />
// //         <meta name="keywords" content={video.tags.join(', ')} />
// //         <link rel="canonical" href={canonicalUrl} />
        
// //         {/* Open Graph */}
// //         <meta property="og:title" content={video.title} />
// //         <meta property="og:description" content={video.description} />
// //         <meta property="og:type" content="video.movie" />
// //         <meta property="og:url" content={canonicalUrl} />
// //         <meta property="og:image" content={video.thumbnail.startsWith('http') ? video.thumbnail : `https://capitalroot.vercel.app${video.thumbnail}`} />
// //         <meta property="og:image:width" content="1280" />
// //         <meta property="og:image:height" content="720" />
// //         <meta property="og:image:alt" content={video.title} />
// //         <meta property="og:video" content={urls.embedUrl} />
// //         <meta property="og:video:type" content="text/html" />
// //         <meta property="og:video:width" content="1280" />
// //         <meta property="og:video:height" content="720" />
        
// //         {/* Twitter Card */}
// //         <meta name="twitter:card" content="player" />
// //         <meta name="twitter:site" content="@capitalroot" />
// //         <meta name="twitter:title" content={video.title} />
// //         <meta name="twitter:description" content={video.description} />
// //         <meta name="twitter:image" content={video.thumbnail.startsWith('http') ? video.thumbnail : `https://capitalroot.vercel.app${video.thumbnail}`} />
// //         <meta name="twitter:player" content={urls.embedUrl} />
// //         <meta name="twitter:player:width" content="1280" />
// //         <meta name="twitter:player:height" content="720" />
        
// //         {/* Video Schema */}
// //         <script
// //           type="application/ld+json"
// //           dangerouslySetInnerHTML={{
// //             __html: JSON.stringify(videoSchema)
// //           }}
// //         />
        
// //         {/* Breadcrumb Schema */}
// //         <script
// //           type="application/ld+json"
// //           dangerouslySetInnerHTML={{
// //             __html: JSON.stringify(breadcrumbSchema)
// //           }}
// //         />
// //       </Head>
      
// //       <Header />
// //       <main className="video-page-main">
// //         <div className="container">
// //           {/* Back to Videos Button */}
// //           <div className="page-navigation">
// //             <button
// //               onClick={() => router.push("/videos")}
// //               className="back-button"
// //               aria-label="Go back to all videos"
// //             >
// //               <svg
// //                 width="20"
// //                 height="20"
// //                 viewBox="0 0 24 24"
// //                 fill="currentColor"
// //               >
// //                 <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
// //               </svg>
// //               Back to All Videos
// //             </button>
// //           </div>

// //           <div className="video-page-content">
// //             {/* Video Player Section */}
// //             <section className="video-player-section">
// //               <VideoPlayerWrapper
// //                 videoId={video.videoId}
// //                 videoSource={video.videoSource}
// //                 title={video.title}
// //               />

// //               <div className="video-info">
// //                 <h1 className="video-title">{video.title}</h1>

// //                 <div className="video-meta">
// //                   <span className="views">
// //                     {typeof video.viewCount === 'number' 
// //                       ? video.viewCount.toLocaleString() 
// //                       : video.viewCount} views
// //                   </span>
// //                   <span className="date">
// //                     {new Date(video.uploadDate).toLocaleDateString("en-US", {
// //                       year: "numeric",
// //                       month: "long",
// //                       day: "numeric",
// //                     })}
// //                   </span>
// //                   <span className="duration">{displayDuration}</span>
// //                   <span className="source-badge">{video.videoSource}</span>
// //                   {video.category && (
// //                     <span className="category">{video.category}</span>
// //                   )}
// //                 </div>

// //                 <div className="video-description">
// //                   <p>{video.description}</p>
// //                 </div>

// //                 <div className="video-tags">
// //                   {video.tags.map((tag, index) => (
// //                     <span key={index} className="tag">
// //                       #{tag}
// //                     </span>
// //                   ))}
// //                 </div>

// //                 <SocialShare
// //                   title={video.title}
// //                   description={video.description}
// //                   videoSource={video.videoSource}
// //                   videoId={video.videoId}
// //                   thumbnail={video.thumbnail}
// //                 />
                
// //                 <div className="video-navigation">
// //                   <button
// //                     onClick={() => router.push("/videos")}
// //                     className="cta-button secondary"
// //                   >
// //                     ← Back to All Videos
// //                   </button>
// //                 </div>
// //               </div>
// //             </section>

// //             {/* Related Videos Section */}
// //             {relatedVideos && relatedVideos.length > 0 && (
// //               <section className="related-videos">
// //                 <h2>More Videos You Might Like</h2>
// //                 <div className="related-videos-grid">
// //                   {relatedVideos.map((relatedVideo) => (
// //                     <RelatedVideoCard
// //                       key={relatedVideo.id}
// //                       video={relatedVideo}
// //                     />
// //                   ))}
// //                 </div>
// //               </section>
// //             )}
// //           </div>
// //         </div>
// //       </main>
// //       <Footer />
// //     </>
// //   );
// // }

// // export async function getStaticPaths() {
// //   const videos = videoData.videos;

// //   const paths = videos.map((video) => ({
// //     params: { videoId: video.videoId.toString() },
// //   }));

// //   return {
// //     paths,
// //     fallback: false,
// //   };
// // }

// // export async function getStaticProps({ params }) {
// //   const video = videoData.videos.find((v) => v.videoId === params.videoId);

// //   if (!video) {
// //     return {
// //       notFound: true,
// //     };
// //   }

// //   // Get related videos (excluding current video)
// //   const relatedVideos = videoData.videos
// //     .filter((v) => v.videoId !== video.videoId)
// //     .slice(0, 6);

// //   return {
// //     props: {
// //       video,
// //       relatedVideos,
// //     },
// //     revalidate: 3600,
// //   };
// // }













// import Head from "next/head";
// import { useRouter } from "next/router";
// import Header from "../../components/Header";
// import Footer from "../../components/Footer";
// import VideoPlayerWrapper from "../../components/VideoPlayerWrapper";
// import SocialShare from "../../components/SocialShare";
// import RelatedVideoCard from "../../components/RelatedVideoCard";
// import videoData from "../../data/data.json";
// import { getDisplayDuration } from "../../utils/duration";

// export default function VideoPage({ video, relatedVideos }) {
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

//   const canonicalUrl = `https://capitalroot.vercel.app/video/${video.videoId}`;
  
//   // Helper function to get proper video URLs
//   const getVideoUrls = (video) => {
//     if (video.videoSource === 'youtube') {
//       return {
//         contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
//         embedUrl: `https://www.youtube.com/embed/${video.videoId}`
//       }
//     } else {
//       return {
//         contentUrl: `https://short.icu/${video.videoId}`,
//         embedUrl: `https://short.icu/embed/${video.videoId}`
//       }
//     }
//   }

//   const urls = getVideoUrls(video);
//   const displayDuration = getDisplayDuration(video.duration);

//   // Convert duration to seconds for schema
//   const convertDurationToSeconds = (duration) => {
//     if (duration.includes('PT')) {
//       // ISO 8601 format
//       const time = duration.replace('PT', '');
//       let seconds = 0;
      
//       const hoursMatch = time.match(/(\d+)H/);
//       const minutesMatch = time.match(/(\d+)M/);
//       const secondsMatch = time.match(/(\d+)S/);
      
//       if (hoursMatch) seconds += parseInt(hoursMatch[1]) * 3600;
//       if (minutesMatch) seconds += parseInt(minutesMatch[1]) * 60;
//       if (secondsMatch) seconds += parseInt(secondsMatch[1]);
      
//       return seconds;
//     }
//     return 300; // default 5 minutes
//   }

//   // Get proper thumbnail URL
//   const getThumbnailUrl = () => {
//     if (video.thumbnail.startsWith('http')) {
//       return video.thumbnail;
//     } else {
//       return `https://capitalroot.vercel.app${video.thumbnail}`;
//     }
//   }

//   const thumbnailUrl = getThumbnailUrl();
//   const durationSeconds = convertDurationToSeconds(video.duration);

//   // VideoObject Schema for this specific video - FIXED STRUCTURE
//   const videoSchema = {
//     "@context": "https://schema.org",
//     "@type": "VideoObject",
//     "name": video.title,
//     "description": video.description,
//     "thumbnailUrl": thumbnailUrl,
//     "uploadDate": video.uploadDate,
//     "duration": `PT${durationSeconds}S`,
//     "contentUrl": urls.contentUrl,
//     "embedUrl": urls.embedUrl,
//     "interactionStatistic": {
//       "@type": "InteractionCounter",
//       "interactionType": { 
//         "@type": "WatchAction" 
//       },
//       "userInteractionCount": typeof video.viewCount === 'string' ? parseInt(video.viewCount.replace(/[^0-9]/g, '')) || 1000 : video.viewCount
//     },
//     "publisher": {
//       "@type": "Organization",
//       "name": "Capital Root",
//       "url": "https://capitalroot.vercel.app",
//       "logo": {
//         "@type": "ImageObject",
//         "url": "https://capitalroot.vercel.app/icon-512.png",
//         "width": 512,
//         "height": 512
//       }
//     }
//   }

//   // Breadcrumb Schema
//   const breadcrumbSchema = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": [
//       {
//         "@type": "ListItem",
//         "position": 1,
//         "name": "Home",
//         "item": "https://capitalroot.vercel.app"
//       },
//       {
//         "@type": "ListItem",
//         "position": 2,
//         "name": "Videos",
//         "item": "https://capitalroot.vercel.app/videos"
//       },
//       {
//         "@type": "ListItem",
//         "position": 3,
//         "name": video.title,
//         "item": canonicalUrl
//       }
//     ]
//   }

//   return (
//     <>
//       <Head>
//         <title>{video.title} - Capital Root</title>
//         <meta name="description" content={video.description} />
//         <meta name="keywords" content={video.tags.join(', ')} />
//         <link rel="canonical" href={canonicalUrl} />
        
//         {/* Open Graph */}
//         <meta property="og:title" content={video.title} />
//         <meta property="og:description" content={video.description} />
//         <meta property="og:type" content="video.movie" />
//         <meta property="og:url" content={canonicalUrl} />
//         <meta property="og:image" content={thumbnailUrl} />
//         <meta property="og:image:width" content="1280" />
//         <meta property="og:image:height" content="720" />
//         <meta property="og:image:alt" content={video.title} />
//         <meta property="og:video" content={urls.embedUrl} />
//         <meta property="og:video:type" content="text/html" />
//         <meta property="og:video:width" content="1280" />
//         <meta property="og:video:height" content="720" />
        
//         {/* Twitter Card */}
//         <meta name="twitter:card" content="player" />
//         <meta name="twitter:site" content="@capitalroot" />
//         <meta name="twitter:title" content={video.title} />
//         <meta name="twitter:description" content={video.description} />
//         <meta name="twitter:image" content={thumbnailUrl} />
//         <meta name="twitter:player" content={urls.embedUrl} />
//         <meta name="twitter:player:width" content="1280" />
//         <meta name="twitter:player:height" content="720" />
        
//         {/* Video Schema */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(videoSchema)
//           }}
//           key="video-schema"
//         />
        
//         {/* Breadcrumb Schema */}
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(breadcrumbSchema)
//           }}
//           key="breadcrumb-schema"
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
//                   <span className="views">
//                     {typeof video.viewCount === 'number' 
//                       ? video.viewCount.toLocaleString() 
//                       : video.viewCount} views
//                   </span>
//                   <span className="date">
//                     {new Date(video.uploadDate).toLocaleDateString("en-US", {
//                       year: "numeric",
//                       month: "long",
//                       day: "numeric",
//                     })}
//                   </span>
//                   <span className="duration">{displayDuration}</span>
//                   <span className="source-badge">{video.videoSource}</span>
//                   {video.category && (
//                     <span className="category">{video.category}</span>
//                   )}
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
//                   thumbnail={thumbnailUrl}
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
//             {relatedVideos && relatedVideos.length > 0 && (
//               <section className="related-videos">
//                 <h2>More Videos You Might Like</h2>
//                 <div className="related-videos-grid">
//                   {relatedVideos.map((relatedVideo) => (
//                     <RelatedVideoCard
//                       key={relatedVideo.id}
//                       video={relatedVideo}
//                     />
//                   ))}
//                 </div>
//               </section>
//             )}
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

//   // Get related videos (excluding current video)
//   const relatedVideos = videoData.videos
//     .filter((v) => v.videoId !== video.videoId)
//     .slice(0, 6);

//   return {
//     props: {
//       video,
//       relatedVideos,
//     },
//     revalidate: 3600,
//   };
// }








import Head from "next/head";
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

  const canonicalUrl = `https://capitalroot.vercel.app/video/${video.videoId}`;
  
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
        embedUrl: `https://short.icu/embed/${video.videoId}`
      }
    }
  }

  const urls = getVideoUrls(video);
  const displayDuration = getDisplayDuration(video.duration);

  // Convert duration to seconds for schema
  const convertDurationToSeconds = (duration) => {
    if (duration.includes('PT')) {
      // ISO 8601 format
      const time = duration.replace('PT', '');
      let seconds = 0;
      
      const hoursMatch = time.match(/(\d+)H/);
      const minutesMatch = time.match(/(\d+)M/);
      const secondsMatch = time.match(/(\d+)S/);
      
      if (hoursMatch) seconds += parseInt(hoursMatch[1]) * 3600;
      if (minutesMatch) seconds += parseInt(minutesMatch[1]) * 60;
      if (secondsMatch) seconds += parseInt(secondsMatch[1]);
      
      return seconds;
    }
    return 300; // default 5 minutes
  }

  // Get proper thumbnail URL
  const getThumbnailUrl = () => {
    if (video.thumbnail.startsWith('http')) {
      return video.thumbnail;
    } else {
      return `https://capitalroot.vercel.app${video.thumbnail}`;
    }
  }

  const thumbnailUrl = getThumbnailUrl();
  const durationSeconds = convertDurationToSeconds(video.duration);

  // VideoObject Schema for this specific video - COMPLETELY FIXED
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": video.uploadDate,
    "duration": `PT${durationSeconds}S`,
    "contentUrl": urls.contentUrl,
    "embedUrl": urls.embedUrl,
    "url": canonicalUrl, // THIS WAS MISSING - CRITICAL FIX
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { 
        "@type": "WatchAction" 
      },
      "userInteractionCount": typeof video.viewCount === 'string' ? parseInt(video.viewCount.replace(/[^0-9]/g, '')) || 1000 : video.viewCount
    },
    "publisher": {
      "@type": "Organization",
      "name": "Capital Root",
      "url": "https://capitalroot.vercel.app"
    }
  }

  // Breadcrumb Schema
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
        "name": "Videos",
        "item": "https://capitalroot.vercel.app/videos"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": video.title,
        "item": canonicalUrl
      }
    ]
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
        <meta property="og:image" content={thumbnailUrl} />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta property="og:image:alt" content={video.title} />
        <meta property="og:video" content={urls.embedUrl} />
        <meta property="og:video:type" content="text/html" />
        <meta property="og:video:width" content="1280" />
        <meta property="og:video:height" content="720" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="player" />
        <meta name="twitter:site" content="@capitalroot" />
        <meta name="twitter:title" content={video.title} />
        <meta name="twitter:description" content={video.description} />
        <meta name="twitter:image" content={thumbnailUrl} />
        <meta name="twitter:player" content={urls.embedUrl} />
        <meta name="twitter:player:width" content="1280" />
        <meta name="twitter:player:height" content="720" />
        
        {/* Video Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(videoSchema)
          }}
          key="video-schema"
        />
        
        {/* Breadcrumb Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbSchema)
          }}
          key="breadcrumb-schema"
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
                  <span className="views">
                    {typeof video.viewCount === 'number' 
                      ? video.viewCount.toLocaleString() 
                      : video.viewCount} views
                  </span>
                  <span className="date">
                    {new Date(video.uploadDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="duration">{displayDuration}</span>
                  <span className="source-badge">{video.videoSource}</span>
                  {video.category && (
                    <span className="category">{video.category}</span>
                  )}
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
                  thumbnail={thumbnailUrl}
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
            {relatedVideos && relatedVideos.length > 0 && (
              <section className="related-videos">
                <h2>More Videos You Might Like</h2>
                <div className="related-videos-grid">
                  {relatedVideos.map((relatedVideo) => (
                    <RelatedVideoCard
                      key={relatedVideo.id}
                      video={relatedVideo}
                    />
                  ))}
                </div>
              </section>
            )}
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

  // Get related videos (excluding current video)
  const relatedVideos = videoData.videos
    .filter((v) => v.videoId !== video.videoId)
    .slice(0, 6);

  return {
    props: {
      video,
      relatedVideos,
    },
    revalidate: 3600,
  };
}