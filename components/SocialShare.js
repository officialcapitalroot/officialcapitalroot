// // components/SocialShare.js
// import { FaTwitter, FaFacebook, FaLinkedin, FaLink, FaWhatsapp, FaTelegram } from 'react-icons/fa'
// import { useEffect, useState } from 'react'

// export default function SocialShare() {
//   const [pageUrl, setPageUrl] = useState('')

//   useEffect(() => {
//     // Get current page URL dynamically
//     if (typeof window !== 'undefined') {
//       setPageUrl(window.location.href)
//     }
//   }, [])

//   // Use the actual page title from the document
//   const pageTitle = typeof document !== 'undefined' ? document.title : 'Capital Root'
//   const shareText = `${pageTitle.replace(' - Capital Root Movies', '').replace(' | Capital Root Movies', '')} - Capital Root`

//   const shareLinks = {
//     twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
//     facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
//     linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
//     whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`,
//     telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`
//   }

//   const copyToClipboard = async () => {
//     try {
//       await navigator.clipboard.writeText(pageUrl)
//       alert('Link copied to clipboard!')
//     } catch (err) {
//       console.error('Failed to copy: ', err)
//     }
//   }

//   return (
//     <div className="social-share">
//       <span>Share this video:</span>
//       <div className="share-buttons">
//         <a 
//           href={shareLinks.twitter} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           aria-label="Share on Twitter"
//         >
//           <FaTwitter />
//         </a>
//         <a 
//           href={shareLinks.facebook} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           aria-label="Share on Facebook"
//         >
//           <FaFacebook />
//         </a>
//         <a 
//           href={shareLinks.linkedin} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           aria-label="Share on LinkedIn"
//         >
//           <FaLinkedin />
//         </a>
//         <a 
//           href={shareLinks.whatsapp} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           aria-label="Share on WhatsApp"
//         >
//           <FaWhatsapp />
//         </a>
//         <a 
//           href={shareLinks.telegram} 
//           target="_blank" 
//           rel="noopener noreferrer"
//           aria-label="Share on Telegram"
//         >
//           <FaTelegram />
//         </a>
//         <button 
//           onClick={copyToClipboard}
//           aria-label="Copy link"
//         >
//           <FaLink />
//         </button>
//       </div>

//           </div>
//   )
// }









// components/SocialShare.js
import { FaTwitter, FaFacebook, FaLinkedin, FaLink, FaWhatsapp, FaTelegram, FaPinterest } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function SocialShare({ 
  videoData = null, 
  mediaData = null, 
  mediaType = 'movie',
  customTitle = '',
  customImage = '',
  forceUrl = '',
  forceImage = ''
}) {
  const [pageUrl, setPageUrl] = useState('')
  const [shareData, setShareData] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Get current page URL dynamically - FORCE the actual page URL
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href
      console.log('🔄 SocialShare - Current URL:', currentUrl)
      setPageUrl(currentUrl)
      
      // Set share data immediately with current URL
      let finalUrl = forceUrl || currentUrl
      let finalImage = forceImage || ''
      let finalTitle = customTitle || ''
      let finalDescription = 'Watch now on Capital Root Movies'

      // Determine data source
      if (mediaData) {
        // TMDB Data - NO FALLBACK
        finalTitle = mediaData.title || mediaData.name
        finalDescription = mediaData.overview || finalDescription
        finalImage = getTMDBImageUrl(mediaData.poster_path || mediaData.backdrop_path)
      } else if (videoData) {
        // JSON Video Data - NO FALLBACK
        finalTitle = videoData.title
        finalDescription = videoData.description || finalDescription
        finalImage = getVideoThumbnailUrl(videoData.thumbnail)
      } else {
        // Use page title as last resort
        const pageTitle = typeof document !== 'undefined' ? document.title : 'Capital Root Movies'
        finalTitle = customTitle || pageTitle.replace(' - Capital Root Movies', '').replace(' | Capital Root Movies', '')
      }

      // ENSURE we have an image - use site logo only as absolute last resort
      if (!finalImage) {
        finalImage = getDefaultImage()
      }

      console.log('🎯 SocialShare - Final Share Data:', {
        title: finalTitle,
        image: finalImage,
        url: finalUrl
      })

      setShareData({
        title: finalTitle,
        description: finalDescription,
        image: finalImage,
        url: finalUrl
      })
      setIsReady(true)
    }
  }, [mediaData, videoData, customTitle, customImage, forceUrl, forceImage])

  const getTMDBImageUrl = (path, size = 'w500') => {
    if (!path) return null
    return `https://image.tmdb.org/t/p/${size}${path}`
  }

  const getVideoThumbnailUrl = (thumbnail) => {
    if (!thumbnail) return null
    if (thumbnail.startsWith('http')) return thumbnail
    // Ensure absolute URL for thumbnails
    if (thumbnail.startsWith('/')) {
      return `https://capitalroot.vercel.app${thumbnail}`
    }
    return thumbnail
  }

  const getDefaultImage = () => {
    // Only use as absolute last resort
    return 'https://capitalroot.vercel.app/icon-512.png'
  }

  // Don't render until we have data
  if (!isReady || !shareData) {
    return (
      <div className="social-share-loading">
        <style jsx>{`
          .social-share-loading {
            padding: 1.5rem;
            text-align: center;
            color: #666;
          }
        `}</style>
        Loading share options...
      </div>
    )
  }

  const shareText = `${shareData.title} - Watch on Capital Root Movies`
  const encodedText = encodeURIComponent(shareText)
  const encodedUrl = encodeURIComponent(shareData.url)
  const encodedImage = encodeURIComponent(shareData.image)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&picture=${encodedImage}&title=${encodedText}&description=${encodeURIComponent(shareData.description)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareData.url)}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${encodedImage}&description=${encodedText}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url)
      alert('✅ Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareData.url
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('✅ Link copied to clipboard!')
    }
  }

  const handleShare = (platform, url) => {
    if (typeof window !== 'undefined') {
      const width = 600
      const height = 400
      const left = (window.screen.width - width) / 2
      const top = (window.screen.height - height) / 2
      
      window.open(
        url,
        'share',
        `width=${width},height=${height},left=${left},top=${top},toolbar=0,status=0`
      )
    }
  }

  return (
    <div className="social-share">
      <style jsx>{`
        .social-share {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.5rem;
          background: #f8f9fa;
          border-radius: 8px;
          margin: 2rem 0;
          border: 1px solid #e9ecef;
        }

        .social-share span {
          font-weight: 600;
          color: #333;
          white-space: nowrap;
          font-size: 1rem;
        }

        .share-buttons {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .share-buttons a,
        .share-buttons button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid #e9ecef;
          background: #fff;
          color: #555;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-decoration: none;
          font-size: 1.1rem;
        }

        .share-buttons a:hover,
        .share-buttons button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        .share-buttons a.twitter:hover { background: #1da1f2; color: white; border-color: #1da1f2; }
        .share-buttons a.facebook:hover { background: #1877f2; color: white; border-color: #1877f2; }
        .share-buttons a.linkedin:hover { background: #0a66c2; color: white; border-color: #0a66c2; }
        .share-buttons a.whatsapp:hover { background: #25d366; color: white; border-color: #25d366; }
        .share-buttons a.telegram:hover { background: #0088cc; color: white; border-color: #0088cc; }
        .share-buttons a.pinterest:hover { background: #e60023; color: white; border-color: #e60023; }
        .share-buttons button.copy:hover { background: #6c757d; color: white; border-color: #6c757d; }

        .share-debug {
          display: none;
          font-size: 0.8rem;
          color: #666;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .social-share {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .share-buttons {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .share-buttons {
            gap: 0.4rem;
          }
          
          .share-buttons a,
          .share-buttons button {
            width: 38px;
            height: 38px;
            font-size: 1rem;
          }
        }
      `}</style>

      <span>Share this {mediaData ? (mediaType === 'tv' ? 'TV show' : 'movie') : 'video'}:</span>
      <div className="share-buttons">
        <a 
          href={shareLinks.twitter}
          onClick={(e) => {
            e.preventDefault()
            handleShare('twitter', shareLinks.twitter)
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className="twitter"
        >
          <FaTwitter />
        </a>
        <a 
          href={shareLinks.facebook}
          onClick={(e) => {
            e.preventDefault()
            handleShare('facebook', shareLinks.facebook)
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="facebook"
        >
          <FaFacebook />
        </a>
        <a 
          href={shareLinks.linkedin}
          onClick={(e) => {
            e.preventDefault()
            handleShare('linkedin', shareLinks.linkedin)
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="linkedin"
        >
          <FaLinkedin />
        </a>
        <a 
          href={shareLinks.whatsapp}
          onClick={(e) => {
            e.preventDefault()
            handleShare('whatsapp', shareLinks.whatsapp)
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="whatsapp"
        >
          <FaWhatsapp />
        </a>
        <a 
          href={shareLinks.telegram}
          onClick={(e) => {
            e.preventDefault()
            handleShare('telegram', shareLinks.telegram)
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
          className="telegram"
        >
          <FaTelegram />
        </a>
        <a 
          href={shareLinks.pinterest}
          onClick={(e) => {
            e.preventDefault()
            handleShare('pinterest', shareLinks.pinterest)
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Pinterest"
          className="pinterest"
        >
          <FaPinterest />
        </a>
        <button 
          onClick={copyToClipboard}
          aria-label="Copy link to clipboard"
          className="copy"
        >
          <FaLink />
        </button>
      </div>
      
      {/* Debug info - remove in production */}
      <div className="share-debug">
        URL: {shareData.url} | Image: {shareData.image}
      </div>
    </div>
  )
}