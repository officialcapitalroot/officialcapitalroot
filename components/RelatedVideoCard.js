import Link from 'next/link'
import Image from 'next/image'

export default function RelatedVideoCard({ video }) {
  return (
    <article className="related-video-card" itemScope itemType="https://schema.org/VideoObject">
      <Link href={`/video/${video.videoId}`} className="related-video-link">
        <div className="related-video-thumbnail">
          <img 
            src={video.thumbnail} 
            alt={video.title}
            loading="lazy"
            quality="100"
            width={320}
            height={180}
            itemProp="thumbnailUrl"
            onError={(e) => {
              e.target.src = '/fallback-thumbnail.jpg'
            }}
          />
          <span className="duration-badge">{video.duration}</span>
        </div>
        <div className="related-video-info">
          <h3 itemProp="name">{video.title}</h3>
          <div className="related-video-meta">
            <span className="views">{video.viewCount} views</span>
            <span className="date">
              {new Date(video.UploadDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}