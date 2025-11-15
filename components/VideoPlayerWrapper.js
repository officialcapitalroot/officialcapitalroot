
// import VideoPlayer from './VideoPlayer'
// import ShortICUPlayer from './ShortICUPlayer'
// import DailymotionPlayer from './DailymotionPlayer'

// export default function VideoPlayerWrapper({ videoId, videoSource, title, autoplay = false }) {
  
//   console.log('🎬 VideoPlayerWrapper Debug:')
//   console.log('📹 Video ID:', videoId)
//   console.log('🔧 Video Source:', videoSource)
//   console.log('📺 Title:', title)
//   console.log('▶️ Autoplay:', autoplay)

//   if (!videoSource) {
//     return (
//       <div className="video-player-error">
//         <h3>❌ Error: No video source specified</h3>
//         <p>Video ID: {videoId}</p>
//         <p>Please check the data.json file for this video</p>
//       </div>
//     )
//   }

//   if (videoSource === 'youtube') {
//     return <VideoPlayer videoId={videoId} title={title} autoplay={autoplay} />
//   } else if (videoSource === 'shorticu') {
//     return <ShortICUPlayer videoId={videoId} title={title} autoplay={autoplay} />
//   } else if (videoSource === 'dailymotion') {
//     return <DailymotionPlayer videoId={videoId} title={title} autoplay={autoplay} />
//   } else {
//     return (
//       <div className="video-player-error">
//         <h3>❌ Error: Unknown video source</h3>
//         <p>Source: {videoSource}</p>
//         <p>Video ID: {videoId}</p>
//         <p>Supported sources: youtube, shorticu, dailymotion</p>
//       </div>
//     )
//   }
// }



// components/VideoPlayerWrapper.js
import VideoPlayer from './VideoPlayer'
import ShortICUPlayer from './ShortICUPlayer'
import DailymotionPlayer from './DailymotionPlayer'
import VidsrcPlayer from './VidsrcPlayer'
import EmbedCCPlayer from './EmbedCCPlayer'

export default function VideoPlayerWrapper({ 
  videoId, 
  videoSource, 
  title, 
  autoplay = false,
  mediaType = "movie",
  seasonNumber,
  episodeNumber 
}) {
  
  console.log('🎬 VideoPlayerWrapper Debug:')
  console.log('📹 Video ID:', videoId)
  console.log('🔧 Video Source:', videoSource)
  console.log('📺 Title:', title)
  console.log('🎞️ Media Type:', mediaType)
  console.log('▶️ Autoplay:', autoplay)

  if (!videoSource) {
    return (
      <div className="video-player-error">
        <h3>❌ Error: No video source specified</h3>
        <p>Video ID: {videoId}</p>
        <p>Please check the data source for this video</p>
      </div>
    )
  }

  // Map video sources to their respective players
  const playerComponents = {
    'youtube': () => <VideoPlayer videoId={videoId} title={title} autoplay={autoplay} />,
    'shorticu': () => <ShortICUPlayer videoId={videoId} title={title} autoplay={autoplay} />,
    'dailymotion': () => <DailymotionPlayer videoId={videoId} title={title} autoplay={autoplay} />,
    'vidsrc': () => <VidsrcPlayer 
      videoId={videoId} 
      title={title} 
      mediaType={mediaType}
      seasonNumber={seasonNumber}
      episodeNumber={episodeNumber}
    />,
    'embedcc': () => <EmbedCCPlayer 
      videoId={videoId} 
      title={title} 
      mediaType={mediaType}
      seasonNumber={seasonNumber}
      episodeNumber={episodeNumber}
    />
  }

  const PlayerComponent = playerComponents[videoSource]

  if (!PlayerComponent) {
    return (
      <div className="video-player-error">
        <h3>❌ Error: Unknown video source</h3>
        <p>Source: {videoSource}</p>
        <p>Video ID: {videoId}</p>
        <p>Supported sources: youtube, shorticu, dailymotion, vidsrc, embedcc</p>
      </div>
    )
  }

  return <PlayerComponent />
}