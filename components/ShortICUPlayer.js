export default function ShortICUPlayer({ videoId, title }) {
  return (
        <div 
      className="shorticu-player-container"
      itemScope
      itemType="https://schema.org/VideoObject"
    >

    <div style={{
      width: '100%',
      height: '0',
      paddingBottom: '56.25%',
      position: 'relative',
      backgroundColor: '#000',
      borderRadius: '8px',
      overflow: 'hidden',
      // ULTRA SHARP CINEMATIC FILTERS
        filter: 'url(#ultraSharp) brightness(1.25) contrast(1.15) saturate(1.5) hue-rotate(5deg)',
        transform: 'translateZ(0)',
        // imageRendering: 'pixelated'
    }}>
      <iframe
        src={`https://short.icu/${videoId}`}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          border: 'none', // ADDED COMMA HERE
          
        }}
        frameBorder="0"
        scrolling="no"
        allowFullScreen
        title={`ShortICU video player for ${title}`}
      ></iframe>
    </div>
    </div>
  )
}