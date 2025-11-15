// components/VidsrcPlayer.js
export default function VidsrcPlayer({ videoId, title, mediaType = "movie", seasonNumber, episodeNumber }) {
  
  const getVidsrcUrl = () => {
    if (mediaType === "movie") {
      return `https://vidsrc.cc/v2/embed/movie/${videoId}`
    } else if (mediaType === "tv" && seasonNumber && episodeNumber) {
      return `https://vidsrc.cc/v2/embed/tv/${videoId}/${seasonNumber}/${episodeNumber}`
    }
    return `https://vidsrc.cc/v2/embed/movie/${videoId}`
  }

  return (
    <div className="vidsrc-player-container">
      <div style={{
        width: '100%',
        height: '0',
        paddingBottom: '56.25%',
        position: 'relative',
        backgroundColor: '#000',
        borderRadius: '8px',
        overflow: 'hidden',
      }}>
        <iframe
          src={getVidsrcUrl()}
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: 'none',
            filter: 'url(#ultraSharp) brightness(1.25) contrast(1.15) saturate(1.5) hue-rotate(5deg)',
            transform: 'translateZ(0)',
          }}
          frameBorder="0"
          scrolling="no"
          allowFullScreen
          title={`Vidsrc video player for ${title}`}
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>
    </div>
  )
}