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
  mediaType = 'movie'
}) {
  const [shareData, setShareData] = useState(null)

  useEffect(() => {
    // Get current page URL and data IMMEDIATELY
    if (typeof window !== 'undefined') {
      const currentUrl = window.location.href;
      const pageTitle = document.title.replace(' - Capital Root Movies', '').replace(' | Capital Root Movies', '');
      
      console.log('🔗 CURRENT PAGE URL:', currentUrl);
      console.log('📄 CURRENT PAGE TITLE:', pageTitle);

      let shareImage = '';
      let shareDescription = 'Watch now on Capital Root Movies';

      // Get image from Open Graph meta tag or other sources
      const ogImage = document.querySelector('meta[property="og:image"]');
      if (ogImage) {
        shareImage = ogImage.getAttribute('content');
        console.log('🖼️ OG IMAGE FOUND:', shareImage);
      }

      // If no OG image, try to get from media data
      if (!shareImage) {
        if (mediaData) {
          // TMDB Data
          shareImage = `https://image.tmdb.org/t/p/w500${mediaData.poster_path || mediaData.backdrop_path}`;
          shareDescription = mediaData.overview || shareDescription;
          console.log('🎬 TMDB IMAGE USED:', shareImage);
        } else if (videoData) {
          // JSON Video Data  
          shareImage = videoData.thumbnail.startsWith('http') 
            ? videoData.thumbnail 
            : `https://capitalroot.vercel.app${videoData.thumbnail}`;
          shareDescription = videoData.description || shareDescription;
          console.log('🎥 VIDEO IMAGE USED:', shareImage);
        }
      }

      // Final fallback - use site logo ONLY if nothing else works
      if (!shareImage) {
        shareImage = 'https://capitalroot.vercel.app/icon-512.png';
        console.log('⚠️ USING FALLBACK IMAGE');
      }

      const finalShareData = {
        title: pageTitle,
        description: shareDescription,
        image: shareImage,
        url: currentUrl
      };

      console.log('🎯 FINAL SHARE DATA:', finalShareData);
      setShareData(finalShareData);
    }
  }, [mediaData, videoData, mediaType]);

  // Don't render until we have share data
  if (!shareData) {
    return <div style={{padding: '1rem', textAlign: 'center'}}>Loading share options...</div>;
  }

  const shareText = `${shareData.title} - Watch on Capital Root Movies`;
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareData.url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareData.url)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareText)}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareData.url)}&media=${encodeURIComponent(shareData.image)}&description=${encodeURIComponent(shareText)}`
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareData.url);
      alert('✅ Link copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareData.url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('✅ Link copied to clipboard!');
    }
  };

  const openShareWindow = (url) => {
    const width = 600;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(url, 'share', `width=${width},height=${height},left=${left},top=${top}`);
  };

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

        .share-label {
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

        .share-button {
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

        .share-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 12px rgba(0,0,0,0.15);
        }

        .twitter:hover { background: #1da1f2; color: white; border-color: #1da1f2; }
        .facebook:hover { background: #1877f2; color: white; border-color: #1877f2; }
        .linkedin:hover { background: #0a66c2; color: white; border-color: #0a66c2; }
        .whatsapp:hover { background: #25d366; color: white; border-color: #25d366; }
        .telegram:hover { background: #0088cc; color: white; border-color: #0088cc; }
        .pinterest:hover { background: #e60023; color: white; border-color: #e60023; }
        .copy:hover { background: #6c757d; color: white; border-color: #6c757d; }

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
      `}</style>

      <span className="share-label">Share this content:</span>
      <div className="share-buttons">
        <a 
          href={shareLinks.twitter}
          onClick={(e) => {
            e.preventDefault();
            openShareWindow(shareLinks.twitter);
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
          className="share-button twitter"
        >
          <FaTwitter />
        </a>
        <a 
          href={shareLinks.facebook}
          onClick={(e) => {
            e.preventDefault();
            openShareWindow(shareLinks.facebook);
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className="share-button facebook"
        >
          <FaFacebook />
        </a>
        <a 
          href={shareLinks.linkedin}
          onClick={(e) => {
            e.preventDefault();
            openShareWindow(shareLinks.linkedin);
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className="share-button linkedin"
        >
          <FaLinkedin />
        </a>
        <a 
          href={shareLinks.whatsapp}
          onClick={(e) => {
            e.preventDefault();
            openShareWindow(shareLinks.whatsapp);
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
          className="share-button whatsapp"
        >
          <FaWhatsapp />
        </a>
        <a 
          href={shareLinks.telegram}
          onClick={(e) => {
            e.preventDefault();
            openShareWindow(shareLinks.telegram);
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
          className="share-button telegram"
        >
          <FaTelegram />
        </a>
        <a 
          href={shareLinks.pinterest}
          onClick={(e) => {
            e.preventDefault();
            openShareWindow(shareLinks.pinterest);
          }}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Pinterest"
          className="share-button pinterest"
        >
          <FaPinterest />
        </a>
        <button 
          onClick={copyToClipboard}
          aria-label="Copy link to clipboard"
          className="share-button copy"
        >
          <FaLink />
        </button>
      </div>
    </div>
  )
}