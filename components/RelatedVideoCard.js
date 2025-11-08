// import Link from 'next/link';
// import Image from "next/image";
// import { getDisplayDuration } from '../utils/duration';

// export default function RelatedVideoCard({ video }) {
//   const displayDuration = getDisplayDuration(video.duration);
  
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
//   const videoUrl = `/video/${video.slug}`;

//   return (
//     <article className="related-video-card">
//       <Link href={videoUrl} className="related-video-link">
//         <div className="related-video-thumbnail">
//           <img 
//             src={thumbnailUrl} 
//             alt={video.title}
//             loading="lazy"
//             width={320}
//             height={180}
//             quality={100}
//             onError={(e) => {
//               e.target.src = '/default-thumbnail.jpg';
//             }}
//           />
//           <span className="duration-badge">{displayDuration}</span>
//         </div>
//         <div className="related-video-info">
//           <h3>{video.title}</h3>
//           <div className="related-video-meta">
//             <span className="views">
//               👁️ {typeof video.viewCount === 'number' 
//                 ? video.viewCount.toLocaleString() 
//                 : video.viewCount} views
//             </span>
//             <span className="date">
//               📅 {new Date(video.uploadDate).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'short',
//                 day: 'numeric'
//               })}
//             </span>
//           </div>
//         </div>
//       </Link>
//     </article>
//   );
// }







import Link from 'next/link';
import Image from "next/image";
import { getDisplayDuration } from '../utils/duration';

export default function RelatedVideoCard({ video }) {
  const displayDuration = getDisplayDuration(video.duration);
  
  const getThumbnailUrl = () => {
    if (video.thumbnail && video.thumbnail !== "") {
      return video.thumbnail;
    }

    if (video.videoSource === "dailymotion") {
      return `https://www.dailymotion.com/thumbnail/video/${video.videoId}`;
    } else if (video.videoSource === "shorticu") {
      return `https://short.icu/thumbnail/${video.videoId}`;
    }

    return "https://capitalroot.vercel.app/default-thumbnail.jpg";
  };

  const thumbnailUrl = getThumbnailUrl();
  const videoUrl = `/video/${video.slug}`;

  return (
    <article className="related-video-card">
      <Link href={videoUrl} className="related-video-link">
        <div className="related-video-thumbnail">
          <Image 
            src={thumbnailUrl} 
            alt={video.title}
            width={320}
            height={180}
            quality={100}
            className="thumbnail-image"
          />
          <span className="duration-badge">{displayDuration}</span>
        </div>
        <div className="related-video-info">
          <h3>{video.title}</h3>
          <div className="related-video-meta">
            <span className="views">
              👁️ {typeof video.viewCount === 'number' 
                ? video.viewCount.toLocaleString() 
                : video.viewCount} views
            </span>
            <span className="date">
              📅 {new Date(video.uploadDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}