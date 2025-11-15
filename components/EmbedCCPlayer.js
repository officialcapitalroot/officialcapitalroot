// components/EmbedCCPlayer.js
export default function EmbedCCPlayer({ videoId, title, mediaType = "movie", seasonNumber, episodeNumber }) {
  
  const getEmbedUrl = () => {
    if (mediaType === "movie") {
      return `https://www.2embed.cc/embed/${videoId}`
    } else if (mediaType === "tv" && seasonNumber && episodeNumber) {
      return `https://www.2embed.cc/embedtv/${videoId}&s=${seasonNumber}&e=${episodeNumber}`
    }
    return `https://www.2embed.cc/embed/${videoId}`
  }

  return (
    <div className="embedcc-player-container">
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
          src={getEmbedUrl()}
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
          title={`2Embed video player for ${title}`}
          allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>
    </div>
  )
}