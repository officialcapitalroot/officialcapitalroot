// components/VideoCard.js
import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '../lib/tmdb';

export default function VideoCard({ video, mediaType = 'movie' }) {
  const title = video.title || video.name;
  const releaseDate = video.release_date || video.first_air_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : (video.releaseYear || 'N/A');
  
  // Handle different media types for image URLs
  const getImageSrc = () => {
    if (mediaType === 'json') {
      // For JSON videos, use the thumbnail URL directly
      if (video.thumbnail && video.thumbnail !== "") {
        return video.thumbnail;
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

  const getRating = () => {
    if (mediaType === 'json') {
      return video.rating || 'N/A';
    } else {
      return video.vote_average?.toFixed(1) || 'N/A';
    }
  };

  const getDescription = () => {
    if (mediaType === 'json') {
      return video.description || video.overview || '';
    } else {
      return video.overview || '';
    }
  };

  return (
    <Link href={getVideoUrl()} className="video-card">
      <div className="card-image">
        <Image
          src={getImageSrc()}
          alt={title}
          width={300}
          height={450}
          quality={100}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
          onError={(e) => {
            // Fallback if image fails to load
            e.target.src = "/default-thumbnail.jpg";
          }}
        />
        <div className="card-overlay">
          <div className="play-icon">▶</div>
        </div>
        {mediaType === 'json' && (
          <div className="json-badge">Our Collection</div>
        )}
        {mediaType === 'tv' && (
          <div className="tv-badge">TV Show</div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <div className="card-meta">
          <span className="year">{year}</span>
          <span className="rating">⭐ {getRating()}</span>
        </div>
        <p className="card-overview">
          {getDescription().substring(0, 80)}...
        </p>
      </div>

      <style jsx>{`
        .video-card {
          display: block;
          text-decoration: none;
          color: inherit;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
          position: relative;
        }
        
        .video-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        }
        
        .card-image {
          position: relative;
          overflow: hidden;
          aspect-ratio: 2/3;
        }
        
        .json-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #e50914;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: bold;
          z-index: 2;
        }
        
        .tv-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #01b4e4;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: bold;
          z-index: 2;
        }
        
        .card-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .video-card:hover .card-overlay {
          opacity: 1;
        }
        
        .play-icon {
          font-size: 2rem;
          color: white;
        }
        
        .card-content {
          padding: 1rem;
        }
        
        .card-title {
          font-size: 1rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          height: 2.4rem;
        }
        
        .card-meta {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #666;
          margin-bottom: 0.5rem;
        }
        
        .card-overview {
          font-size: 0.8rem;
          color: #666;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </Link>
  );
}