// import { useEffect, useRef, useState } from 'react'

// export default function DailymotionPlayer({ videoId, title, autoplay = false }) {
//   const playerRef = useRef(null)
//   const playerInstanceRef = useRef(null)
//   const [playerReady, setPlayerReady] = useState(false)

//   useEffect(() => {
//     const initializePlayer = () => {
//       if (!videoId || !playerRef.current) return

//       // Destroy existing player instance
//       if (playerInstanceRef.current) {
//         playerInstanceRef.current.destroy()
//       }

//       // Load Dailymotion SDK if not loaded
//       if (!window.DM) {
//         const tag = document.createElement('script')
//         tag.src = "https://api.dmcdn.net/all.js"
//         tag.async = true
//         const firstScriptTag = document.getElementsByTagName('script')[0]
//         firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

//         window.dmAsyncInit = () => {
//           createDailymotionPlayer()
//         }
//       } else {
//         createDailymotionPlayer()
//       }
//     }

//     const createDailymotionPlayer = () => {
//       playerInstanceRef.current = DM.player(playerRef.current, {
//         video: videoId,
//         width: '100%',
//         height: '100%',
//         params: {
//           autoplay: autoplay ? 1 : 0,
//           mute: autoplay ? 1 : 0,
//           controls: 1,
//           'sharing-enable': 0,
//           'ui-logo': 0,
//           'ui-start-screen-info': 0,
//           'queue-enable': 0
//         }
//       })

//       playerInstanceRef.current.addEventListener('apiready', () => {
//         setPlayerReady(true)
//         console.log('Dailymotion Player Ready for video:', videoId)
//       })

//       playerInstanceRef.current.addEventListener('video_end', () => {
//         console.log('Dailymotion video ended')
//       })

//       playerInstanceRef.current.addEventListener('error', (error) => {
//         console.error('Dailymotion Player Error:', error)
//       })
//     }

//     initializePlayer()

//     return () => {
//       if (playerInstanceRef.current) {
//         playerInstanceRef.current.destroy()
//       }
//       window.dmAsyncInit = null
//     }
//   }, [videoId, autoplay])

//   // Fallback iframe implementation
//   const iframeFallback = (
//     <div style={{ 
//       position: 'relative', 
//       paddingBottom: '56.25%', 
//       height: 0, 
//       overflow: 'hidden',
//       width: '100%'
//     }}>
//       <iframe 
//         src={`https://geo.dailymotion.com/player.html?video=${videoId}&autoplay=${autoplay ? 1 : 0}`}
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'absolute',
//           left: '0px',
//           top: '0px',
//           overflow: 'hidden',
//           border: 'none'
//         }}
//         allowFullScreen
//         title={`Dailymotion video player for ${title}`}
//         allow="autoplay; fullscreen; picture-in-picture"
//         loading="lazy"
//       />
//     </div>
//   )

//   return (
//     <div className="video-player-container">
//       <div 
//         ref={playerRef}
//         className="dailymotion-player"
//         aria-label={`Dailymotion video player for ${title}`}
//         title={title}
//       ></div>
      
//       {!playerReady && (
//         <div className="player-loading">
//           <div className="loading-spinner"></div>
//           <p>Loading Dailymotion player...</p>
//         </div>
//       )}
      
//       {/* Fallback if player doesn't load */}
//       {!playerReady && (
//         <div style={{ display: 'none' }}>
//           {iframeFallback}
//         </div>
//       )}
//     </div>
//   )
// }




// import { useEffect, useRef, useState } from 'react'

// export default function DailymotionPlayer({ videoId, title, autoplay = false }) {
//   const playerContainerRef = useRef(null)
//   const [playerReady, setPlayerReady] = useState(false)

//   useEffect(() => {
//     if (!videoId) {
//       console.error('❌ No videoId provided to DailymotionPlayer')
//       return
//     }

//     console.log('🎬 Initializing Dailymotion player with videoId:', videoId)

//     // Use IFRAME method - IT JUST WORKS
//     const iframe = document.createElement('iframe')
//     iframe.src = `https://www.dailymotion.com/embed/video/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}&controls=1&queue-enable=0&sharing-enable=0&ui-logo=0`
//     iframe.style.width = '100%'
//     iframe.style.height = '100%'
//     iframe.style.border = 'none'
//     iframe.allowFullscreen = true
//     iframe.allow = 'autoplay; fullscreen; picture-in-picture'
//     iframe.title = `Dailymotion video player for ${title}`
    
//     iframe.onload = () => {
//       console.log('✅ Dailymotion iframe loaded successfully')
//       setPlayerReady(true)
//     }

//     iframe.onerror = () => {
//       console.error('❌ Failed to load Dailymotion iframe')
//       setPlayerReady(true) // Still mark as ready to avoid infinite loading
//     }

//     // Clear container and append iframe
//     if (playerContainerRef.current) {
//       playerContainerRef.current.innerHTML = ''
//       playerContainerRef.current.appendChild(iframe)
//     }

//     return () => {
//       // Cleanup
//       if (playerContainerRef.current) {
//         playerContainerRef.current.innerHTML = ''
//       }
//     }
//   }, [videoId, autoplay, title])

//   return (
//     <div className="video-player-container">
//       {/* Simple iframe container */}
//       <div 
//         ref={playerContainerRef}
//         className="dailymotion-player"
//         style={{
//           width: '100%',
//           height: '100%',
//           minHeight: '400px',
//           backgroundColor: '#000',
//           position: 'relative'
//         }}
//       />
      
//       {/* Loading State */}
//       {!playerReady && (
//         <div className="player-loading" style={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           transform: 'translate(-50%, -50%)',
//           textAlign: 'center',
//           color: 'white',
//           zIndex: 10
//         }}>
//           <div className="loading-spinner"></div>
//           <p>Loading Dailymotion: {title}</p>
//           <p><small>Video ID: {videoId}</small></p>
//         </div>
//       )}

//       {/* Fallback if everything fails */}
//       {playerReady && (
//         <div style={{ display: 'none' }}>
//           <iframe 
//             src={`https://www.dailymotion.com/embed/video/${videoId}`}
//             width="100%" 
//             height="100%"
//             frameBorder="0"
//             allowFullScreen
//             title={title}
            
//           />
//         </div>
//       )}
//     </div>
//   )
// }



























// import { useEffect, useRef, useState } from 'react'

// export default function DailymotionPlayer({ videoId, title, autoplay = false }) {
//   const [playerReady, setPlayerReady] = useState(false)

//   useEffect(() => {
//     console.log('🎬 DailymotionPlayer mounted with:', { videoId, title, autoplay })
//     setPlayerReady(true)
//   }, [videoId, title, autoplay])

//   if (!videoId) {
//     return (
//       <div className="video-player-error" style={{
//         padding: '20px',
//         background: '#ff0000',
//         color: 'white',
//         textAlign: 'center'
//       }}>
//         <h3>❌ MISSING VIDEO ID</h3>
//         <p>Dailymotion player requires a videoId</p>
//       </div>
//     )
//   }

//   return (
//     <div className="video-player-container" >
//       <div style={{
//         position: 'relative',
//         paddingBottom: '56.25%', // 16:9 aspect ratio
//         height: 0,
//         overflow: 'hidden',
//         width: '100%'
//       }}>
//         <iframe 
//           src={`https://www.dailymotion.com/embed/video/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}`}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             border: 'none'
//           }}
//           allowFullScreen
//           title={`Dailymotion video: ${title}`}
//           allow="autoplay; fullscreen; picture-in-picture"
//           onLoad={() => {
//             console.log('✅ Dailymotion iframe loaded - Video should be playing!')
//             setPlayerReady(true)
//           }}
//           onError={(e) => {
//             console.error('❌ Dailymotion iframe error:', e)
//             setPlayerReady(true)
//           }}
//         />
//       </div>
      
//       {!playerReady && (
//         <div style={{
        
//         }}>
//           <div className="loading-spinner"></div>
//           <p>Loading Dailymotion Player...</p>
//           <p><strong>Video:</strong> {title}</p>
//           <p><strong>ID:</strong> {videoId}</p>
//         </div>
//       )}
//     </div>
//   )
// }




























// import { useState } from 'react'

// export default function DailymotionPlayer({ videoId, title, autoplay = false }) {
//   const [playerReady, setPlayerReady] = useState(false)

//   if (!videoId) {
//     return (
//       <div className="video-player-error">
//         <h3>MISSING VIDEO ID</h3>
//         <p>Dailymotion player requires a videoId</p>
//       </div>
//     )
//   }

//   return (
//     <div className="video-player-container">
//       <div style={{
//         position: 'relative',
//         paddingBottom: '56.25%',
//         height: 0,
//         overflow: 'hidden',
//         width: '100%'
//       }}>
//         <iframe 
//           src={`https://www.dailymotion.com/embed/video/${videoId}?autoplay=${autoplay ? 1 : 0}&mute=${autoplay ? 1 : 0}&controls=1&queue-enable=0&sharing-enable=0&ui-logo=0&ui-start-screen-info=0`}
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             border: 'none'
//           }}
//           allowFullScreen
//           title={`Dailymotion video: ${title}`}
//           allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
//           onLoad={() => {
//             console.log('Dailymotion iframe loaded with fullscreen')
//             setPlayerReady(true)
//           }}
//           onError={(e) => {
//             console.error('Dailymotion iframe error:', e)
//             setPlayerReady(true)
//           }}
//         />
//       </div>
      
//       {!playerReady && (
//         <div className="player-loading">
//           <div className="loading-spinner"></div>
//           <p>Loading Dailymotion Player...</p>
//         </div>
//       )}
//     </div>
//   )
// }





import { useState } from 'react'

export default function DailymotionPlayer({ videoId, title, autoplay = false }) {
  const [playerReady, setPlayerReady] = useState(false)

  if (!videoId) {
    return (
      <div className="video-player-error">
        <h3>MISSING VIDEO ID</h3>
        <p>Dailymotion player requires a videoId</p>
      </div>
    )
  }

  return (
    <div className="video-player-container" >
      <div style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        width: '100%'
      }}>
        <iframe 
          src={`https://geo.dailymotion.com/player.html?video=${videoId}`}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            }}
          allowFullScreen
          title={`Dailymotion video: ${title}`}
          allow="autoplay; fullscreen; picture-in-picture"
          onLoad={() => {
            console.log('Dailymotion geo player loaded with fullscreen')
            setPlayerReady(true)
          }}
        />
      </div>
      
      {!playerReady && (
        <div className="player-loading">
          <div className="loading-spinner"></div>
          <p>Loading Dailymotion Player...</p>
        </div>
      )}
    </div>
  )
}