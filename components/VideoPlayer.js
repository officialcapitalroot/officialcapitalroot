// import { useEffect, useRef, useState } from 'react'
// import ShortICUPlayer from './ShortICUPlayer'

// export default function VideoPlayer({ videoId, title, autoplay = false, videoSource = 'youtube' }) {
//   const playerRef = useRef(null)
//   const playerInstanceRef = useRef(null)
//   const [playerReady, setPlayerReady] = useState(false)

//   if (videoSource === 'shorticu') {
//     return <ShortICUPlayer videoId={videoId} title={title} autoplay={autoplay} />
//   }

//   // YouTube player implementation
//   useEffect(() => {
//     const initializePlayer = () => {
//       if (!videoId || !playerRef.current) return

//       if (playerInstanceRef.current) {
//         playerInstanceRef.current.destroy()
//       }

//       playerInstanceRef.current = new window.YT.Player(playerRef.current, {
//         height: '100%',
//         width: '100%',
//         videoId: videoId,
//         // ULTRA SHARP CINEMATIC FILTERS
//         filter: 'url(#ultraSharp) brightness(1.25) contrast(1.15) saturate(1.5) hue-rotate(5deg)',
//         transform: 'translateZ(0)',
//         imageRendering: 'pixelated',

//         playerVars: {
//           'playsinline': 1,
//           'rel': 0,
//           'modestbranding': 0,
//           'showinfo': 0,
//           'controls': 1,
//           'enablejsapi': 1,
//           'origin': typeof window !== 'undefined' ? window.location.origin : '',
//           'fs': 1,
//           'autoplay': autoplay ? 1 : 0,
          
//         },
//         events: {
//           'onReady': () => {
//             setPlayerReady(true)
//             console.log('YouTube Player Ready for video:', videoId)
//           },
//           'onStateChange': (event) => {
//             // Handle player state changes if needed
//           },
//           'onError': (event) => {
//             console.error('YouTube Player Error:', event.data)
//           }
//         }
//       })
//     }

//     // Check if YouTube API is ready
//     if (window.YT && window.YT.Player) {
//       initializePlayer()
//     } else {
//       // Load YouTube API if not already loaded
//       if (!window.YT) {
//         const tag = document.createElement('script')
//         tag.src = "https://www.youtube.com/iframe_api"
//         const firstScriptTag = document.getElementsByTagName('script')[0]
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

//         window.onYouTubeIframeAPIReady = initializePlayer
//       } else {
//         window.onYouTubeIframeAPIReady = initializePlayer
//       }
//     }

//     return () => {
//       if (playerInstanceRef.current) {
//         playerInstanceRef.current.destroy()
//       }
//       window.onYouTubeIframeAPIReady = null
//     }
//   }, [videoId, autoplay])

//   return (
//     <div className="video-player-container">
//       <div 
//         ref={playerRef}
//         className="youtube-player"
//         aria-label={`YouTube video player for ${title}`}
//         title={title}
//       ></div>
      
//       {!playerReady && (
//         <div className="player-loading">
//           <div className="loading-spinner"></div>
//           <p>Loading YouTube player...</p>
//         </div>
//       )}
//     </div>
//   )
// }





import { useEffect, useRef, useState } from 'react'
import ShortICUPlayer from './ShortICUPlayer'
import DailymotionPlayer from './DailymotionPlayer'

export default function VideoPlayer({ videoId, title, autoplay = false, videoSource = 'youtube' }) {
  const playerRef = useRef(null)
  const playerInstanceRef = useRef(null)
  const [playerReady, setPlayerReady] = useState(false)

  if (videoSource === 'shorticu') {
    return <ShortICUPlayer videoId={videoId} title={title} autoplay={autoplay} />
  }

  if (videoSource === 'dailymotion') {
    return <DailymotionPlayer videoId={videoId} title={title} autoplay={autoplay} />
  }

  // YouTube player implementation
  useEffect(() => {
    const initializePlayer = () => {
      if (!videoId || !playerRef.current) return

      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy()
      }

      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        // ULTRA SHARP CINEMATIC FILTERS
        filter: 'url(#ultraSharp) brightness(1.25) contrast(1.15) saturate(1.5) hue-rotate(5deg)',
        transform: 'translateZ(0)',
        imageRendering: 'pixelated',

        playerVars: {
          'playsinline': 1,
          'rel': 0,
          'modestbranding': 0,
          'showinfo': 0,
          'controls': 1,
          'enablejsapi': 1,
          'origin': typeof window !== 'undefined' ? window.location.origin : '',
          'fs': 1,
          'autoplay': autoplay ? 1 : 0,
        },
        events: {
          'onReady': () => {
            setPlayerReady(true)
            console.log('YouTube Player Ready for video:', videoId)
          },
          'onStateChange': (event) => {
            // Handle player state changes if needed
          },
          'onError': (event) => {
            console.error('YouTube Player Error:', event.data)
          }
        }
      })
    }

    // Check if YouTube API is ready
    if (window.YT && window.YT.Player) {
      initializePlayer()
    } else {
      // Load YouTube API if not already loaded
      if (!window.YT) {
        const tag = document.createElement('script')
        tag.src = "https://www.youtube.com/iframe_api"
        const firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

        window.onYouTubeIframeAPIReady = initializePlayer
      } else {
        window.onYouTubeIframeAPIReady = initializePlayer
      }
    }

    return () => {
      if (playerInstanceRef.current) {
        playerInstanceRef.current.destroy()
      }
      window.onYouTubeIframeAPIReady = null
    }
  }, [videoId, autoplay])

  return (
    <div className="video-player-container">
      <div 
        ref={playerRef}
        className="youtube-player"
        aria-label={`YouTube video player for ${title}`}
        title={title}
      ></div>
      
      {!playerReady && (
        <div className="player-loading">
          <div className="loading-spinner"></div>
          <p>Loading YouTube player...</p>
        </div>
      )}
    </div>
  )
}