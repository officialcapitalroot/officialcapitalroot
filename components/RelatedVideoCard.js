// components/RelatedVideoCard.js
import Link from 'next/link';
import Image from "next/image";
import { getDisplayDuration } from '../utils/duration';
import { getImageUrl } from '../lib/tmdb';

export default function RelatedVideoCard({ video, mediaType = 'json' }) {
  const displayDuration = getDisplayDuration(video.duration);
  
  // Handle different media types for image URLs
  const getThumbnailUrl = () => {
    if (mediaType === 'json') {
      // For JSON videos, use the thumbnail URL directly
      if (video.thumbnail && video.thumbnail !== "") {
        return video.thumbnail;
      }

      if (video.videoSource === "dailymotion") {
        return `https://www.dailymotion.com/thumbnail/video/${video.videoId}`;
      } else if (video.videoSource === "shorticu") {
        return `https://short.icu/thumbnail/${video.videoId}`;
      }

      return "/default-thumbnail.jpg";
    } else {
      // For TMDB videos, use getImageUrl
      return getImageUrl(video.poster_path, 'w500');
    }
  };

  const getVideoUrl = () => {
    if (mediaType === 'json') {
      return `/video/${video.slug}`;
    } else {
      return `/video/${mediaType}-${video.id}`;
    }
  };

  const getTitle = () => {
    return video.title || video.name;
  };

  const getViewCount = () => {
    if (mediaType === 'json') {
      return typeof video.viewCount === 'number' 
        ? video.viewCount.toLocaleString() 
        : video.viewCount;
    } else {
      // For TMDB, use vote count as a proxy for popularity
      return video.vote_count ? video.vote_count.toLocaleString() : '0';
    }
  };

  const getUploadDate = () => {
    if (mediaType === 'json') {
      return video.uploadDate;
    } else {
      return video.release_date || video.first_air_date;
    }
  };

  const thumbnailUrl = getThumbnailUrl();
  const videoUrl = getVideoUrl();

  return (
    <article className="related-video-card">
      <Link href={videoUrl} className="related-video-link">
        <div className="related-video-thumbnail">
          <Image 
            src={thumbnailUrl} 
            alt={getTitle()}
            // width={320}
            // height={180}
            width={300}
            height={450}
            quality={100}
            loading="lazy"
            className="thumbnail-image"
            onError={(e) => {
              // Fallback if image fails to load
              e.target.src = "/default-thumbnail.jpg";
            }}
          />
          {mediaType === 'json' && displayDuration && (
            <span className="duration-badge">{displayDuration}</span>
          )}
          {mediaType !== 'json' && (
            <div className="tmdb-badge">TMDB</div>
          )}
        </div>
        <div className="related-video-info">
          <h3>{getTitle()}</h3>
          <div className="related-video-meta">
            <span className="views">
              👁️ {getViewCount()} {mediaType === 'json' ? 'views' : 'votes'}
            </span>
            <span className="date">
              📅 {new Date(getUploadDate()).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </Link>

      {/* <style jsx>{`
        .related-video-card {
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .related-video-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .related-video-link {
          display: block;
          text-decoration: none;
          color: inherit;
        }

        .related-video-thumbnail {
          position: relative;
          aspect-ratio: 16/9;
          overflow: hidden;
        }

        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .duration-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .tmdb-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #01b4e4;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: bold;
        }

        .related-video-info {
          padding: 12px;
        }

        .related-video-info h3 {
          margin: 0 0 8px 0;
          font-size: 0.95rem;
          font-weight: 600;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.6rem;
        }

        .related-video-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #666;
        }

        .views, .date {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        @media (max-width: 768px) {
          .related-video-info h3 {
            font-size: 0.9rem;
          }
          
          .related-video-meta {
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style> */}
    </article>
  );
}