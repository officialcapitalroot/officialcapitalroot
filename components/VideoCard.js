// import SocialShare from "./SocialShare";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function VideoCard({ video }) {
//   const [isClient, setIsClient] = useState(false);
//   const [imgError, setImgError] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Get proper thumbnail URL - FIX FOR SHORTICU
//   const getThumbnailUrl = () => {
//     if (video.thumbnail && video.thumbnail !== "") {
//       return video.thumbnail;
//     }

//     // Fallback thumbnails based on video source
//     if (video.videoSource === "youtube") {
//       return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
//     } else if (video.videoSource === "shorticu") {
//       // ShortICU fallback thumbnail - use a default image
//       return "/default-thumbnail.jpg"; // Create this in your public folder
//     }

//     return "/default-thumbnail.jpg";
//   };

//   const thumbnailUrl = getThumbnailUrl();

//   return (
//     <article
//       className="video-card"
//       itemScope
//       itemType="https://schema.org/VideoObject"
//     >
//       <Link href={`/video/${video.videoId}`} legacyBehavior>
//         <a itemProp="url">
//           <div className="video-thumbnail">
//             <img
//               src={imgError ? "/default-thumbnail.jpg" : thumbnailUrl}
//               alt={video.title}
//               loading="lazy"
//               width={480}
//               height={360}
//               quality="100"
//               itemProp="thumbnailUrl"
//               onError={() => setImgError(true)}
//               style={{
//                 backgroundColor: imgError ? "#f0f0f0" : "transparent",
//               }}
//             />
//             <div className="play-overlay">
//               <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
//                 <path d="M8 5v14l11-7z" />
//               </svg>
//             </div>
//             <span className="duration-badge" itemProp="duration">
//               {video.duration}
//             </span>
//             <span className="source-badge">{video.videoSource}</span>
//           </div>
//         </a>
//       </Link>

//       <div className="video-content">
//         <Link href={`/video/${video.videoId}`} legacyBehavior>
//           <a itemProp="url">
//             <h3 itemProp="name">{video.title}</h3>
//           </a>
//         </Link>
//         <p className="video-description" itemProp="description">
//           {video.description}
//         </p>

//         <div className="video-meta">
//           <span className="views" itemProp="interactionCount">
//             {video.viewCount} views
//           </span>
//           <span className="date">
//             {isClient
//               ? formatDate(video.uploadDate)
//               : formatDate(video.uploadDate)}
//           </span>
//         </div>

//         <SocialShare
//           title={video.title}
//           description={video.description}
//           videoSource={video.videoSource}
//           videoId={video.videoId}
//           thumbnail={video.thumbnail}
//         />
//       </div>
//     </article>
//   );
// }






import SocialShare from "./SocialShare";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getDisplayDuration } from "../utils/duration";

export default function VideoCard({ video }) {
  const [isClient, setIsClient] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get proper thumbnail URL
  const getThumbnailUrl = () => {
    if (video.thumbnail && video.thumbnail !== "") {
      return video.thumbnail;
    }

    // Fallback thumbnails based on video source
    if (video.videoSource === "youtube") {
      return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
    } else if (video.videoSource === "shorticu") {
      return "/default-thumbnail.jpg";
    }

    return "/default-thumbnail.jpg";
  };

  const thumbnailUrl = getThumbnailUrl();
  const displayDuration = getDisplayDuration(video.duration);

  return (
    <article className="video-card">
      <Link href={`/video/${video.videoId}`} legacyBehavior>
        <a>
          <div className="video-thumbnail">
            <img
              src={imgError ? "/default-thumbnail.jpg" : thumbnailUrl}
              alt={video.title}
              loading="lazy"
              width={480}
              height={360}
              onError={() => setImgError(true)}
              style={{
                backgroundColor: imgError ? "#f0f0f0" : "transparent",
              }}
            />
            <div className="play-overlay">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="duration-badge">{displayDuration}</span>
            <span className="source-badge">{video.videoSource}</span>
          </div>
        </a>
      </Link>

      <div className="video-content">
        <Link href={`/video/${video.videoId}`} legacyBehavior>
          <a>
            <h3>{video.title}</h3>
          </a>
        </Link>
        <p className="video-description">
          {video.description}
        </p>

        <div className="video-meta">
          <span className="views">
            {typeof video.viewCount === 'number' 
              ? video.viewCount.toLocaleString() 
              : video.viewCount} views
          </span>
          <span className="date">
            {isClient
              ? formatDate(video.uploadDate)
              : formatDate(video.uploadDate)}
          </span>
        </div>

        <SocialShare
          title={video.title}
          description={video.description}
          videoSource={video.videoSource}
          videoId={video.videoId}
          thumbnail={video.thumbnail}
        />
      </div>
    </article>
  );
}