import SocialShare from './SocialShare'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function VideoCard({ video }) {
  const videoUrl = `https://www.youtube.com/watch?v=${video.videoId}`
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <article className="video-card" itemScope itemType="https://schema.org/VideoObject">
      <Link href={`/video/${video.videoId}`} legacyBehavior>
        <a itemProp="url">
          <div className="video-thumbnail">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              loading="lazy"
              quality="100"
              width={480}
              height={360}
              itemProp="thumbnailUrl"
            />
            <div className="play-overlay">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span className="duration-badge" itemProp="duration">{video.duration}</span>
          </div>
        </a>
      </Link>
      
      <div className="video-content">
        <Link href={`/video/${video.videoId}`} legacyBehavior>
          <a itemProp="url">
            <h3 itemProp="name">{video.title}</h3>
          </a>
        </Link>
        <p className="video-description" itemProp="description">{video.description}</p>
        
        <div className="video-meta">
          <span className="views" itemProp="interactionCount">{video.viewCount} views</span>
          <span className="date">
            {isClient ? formatDate(video.uploadDate) : formatDate(video.uploadDate)}
          </span>
        </div>
        
        <SocialShare 
          url={videoUrl}
          title={video.title}
          description={video.description}
        />
      </div>
    </article>
  )
}