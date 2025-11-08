// import SocialShare from "./SocialShare";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { getDisplayDuration } from "../utils/duration";

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

//   const getThumbnailUrl = () => {
//     if (video.thumbnail && video.thumbnail !== "") {
//       return video.thumbnail;
//     }

//     if (video.videoSource === "youtube") {
//       return `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`;
//     } else if (video.videoSource === "dailymotion") {
//       return `https://www.dailymotion.com/thumbnail/video/${video.videoId}`;
//     } else if (video.videoSource === "shorticu") {
//       return "/default-thumbnail.jpg";
//     }

//     return "/default-thumbnail.jpg";
//   };

//   const thumbnailUrl = getThumbnailUrl();
//   const displayDuration = getDisplayDuration(video.duration);
//   const videoUrl = `/video/${video.slug}`;

//   return (
//     <article 
//       className="video-card"
//       itemScope
//       itemType="https://schema.org/Movie"
//     >
//       <Link href={videoUrl} legacyBehavior>
//         <a itemProp="url">
//           <div className="video-thumbnail">
//             <img
//               src={imgError ? "/default-thumbnail.jpg" : thumbnailUrl}
//               alt={video.title}
//               loading="lazy"
//               width={480}
//               height={270}
//               onError={() => setImgError(true)}
//               itemProp="image"
//               style={{
//                 backgroundColor: imgError ? "#1a1a1a" : "transparent",
//               }}
//             />
//             <div className="play-overlay">
//               <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
//                 <path d="M8 5v14l11-7z" />
//               </svg>
//             </div>
//             <span className="duration-badge" itemProp="duration">{displayDuration}</span>
//             <span className="source-badge">{video.videoSource}</span>
//           </div>
//         </a>
//       </Link>

//       <div className="video-content">
//         <Link href={videoUrl} legacyBehavior>
//           <a itemProp="url">
//             <h3 itemProp="name">{video.title}</h3>
//           </a>
//         </Link>
        
//         <p className="video-description" itemProp="description">
//           {video.description}
//         </p>

//         <div className="video-meta">
//           <span className="views" itemProp="interactionCount">
//             👁️ {typeof video.viewCount === 'number' 
//               ? video.viewCount.toLocaleString() 
//               : video.viewCount} views
//           </span>
//           <span className="date">
//             📅 {isClient ? formatDate(video.uploadDate) : formatDate(video.uploadDate)}
//           </span>
//         </div>

//         <meta itemProp="genre" content={video.category || "Entertainment"} />
//         <meta itemProp="uploadDate" content={video.uploadDate} />
        
//         <SocialShare
//           title={video.title}
//           description={video.description}
//           videoSource={video.videoSource}
//           videoId={video.videoId}
//           thumbnail={thumbnailUrl}
//         />
//       </div>
//     </article>
//   );
// }


import SocialShare from "./SocialShare";
import Link from "next/link";
import Image from "next/image";
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

  const thumbnailUrl = video.thumbnail || "/default-thumbnail.jpg";
  const displayDuration = getDisplayDuration(video.duration);
  const videoUrl = `/video/${video.slug}`;

  return (
    <article 
      className="video-card"
      itemScope
      itemType="https://schema.org/Movie"
    >
      <Link href={videoUrl} legacyBehavior>
        <a itemProp="url">
          <div className="video-thumbnail">
            <img
              src={imgError ? "/default-thumbnail.jpg" : thumbnailUrl}
              alt={video.title}
              loading="lazy"
              width={480}
              height={270}
              quality={100}
              onError={() => setImgError(true)}
              itemProp="image"
              style={{
                backgroundColor: imgError ? "#1a1a1a" : "transparent",
              }}
            />
            <div className="play-overlay">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="duration-badge" itemProp="duration">{displayDuration}</span>
          </div>
        </a>
      </Link>

      <div className="video-content">
        <Link href={videoUrl} legacyBehavior>
          <a itemProp="url">
            <h3 itemProp="name">{video.title}</h3>
          </a>
        </Link>
        
        <p className="video-description" itemProp="description">
          {video.description}
        </p>

        {/* <div className="video-meta">
          <span className="views" itemProp="interactionCount">
            👁️ {typeof video.viewCount === 'number' 
              ? video.viewCount.toLocaleString() 
              : video.viewCount} views
          </span>
          <span className="date">
            📅 {isClient ? formatDate(video.uploadDate) : formatDate(video.uploadDate)}
          </span>
           <p className="video-description" itemProp="description">
                Language: {video.Language}
        </p>
        </div> */}

        <meta itemProp="genre" content={video.category || "Entertainment"} />
        <meta itemProp="uploadDate" content={video.uploadDate} />
        
        <SocialShare
          title={video.title}
          description={video.description}
          slug={video.slug}
        />
      </div>
    </article>
  );
}