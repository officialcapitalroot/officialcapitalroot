import VideoPlayer from './VideoPlayer'
import ShortICUPlayer from './ShortICUPlayer'

export default function VideoPlayerWrapper({ videoId, videoSource, title }) {
  
  // Debug logging
  console.log('VideoPlayerWrapper - videoId:', videoId)
  console.log('VideoPlayerWrapper - videoSource:', videoSource)
  console.log('VideoPlayerWrapper - title:', title)

  if (!videoSource) {
    return (
      <div className="video-player-error">
        <h3>Error: No video source specified</h3>
        <p>Video ID: {videoId}</p>
        <p>Please check the data.json file for this video</p>
      </div>
    )
  }

  if (videoSource === 'youtube') {
    return <VideoPlayer videoId={videoId} title={title} />
  } else if (videoSource === 'shorticu') {
    return <ShortICUPlayer videoId={videoId} title={title} />
  } else {
    return (
      <div className="video-player-error">
        <h3>Error: Unknown video source</h3>
        <p>Source: {videoSource}</p>
        <p>Video ID: {videoId}</p>
        <p>Supported sources: youtube, shorticu</p>
      </div>
    )
  }
}