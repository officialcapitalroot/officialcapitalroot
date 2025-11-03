import VideoCard from './VideoCard'

export default function VideoGrid({ videos, showViewAll = true }) {
  return (
    <section id="videos" className="video-grid-section">
      <div className="container">
        {videos.length > 0 ? (
          <>
            <div className="video-grid">
              {videos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
            
            {showViewAll && (
              <div className="view-all">
                <a href="/videos" className="cta-button secondary">
                  View All Videos
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="no-videos">
            <p>No videos available at the moment. Please check back later.</p>
          </div>
        )}
      </div>
    </section>
  )
}