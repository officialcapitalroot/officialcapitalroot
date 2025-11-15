// components/SocialShare.js
import { FaTwitter, FaFacebook, FaLinkedin, FaLink, FaWhatsapp, FaTelegram } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export default function SocialShare() {
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    // Get current page URL dynamically
    if (typeof window !== 'undefined') {
      setPageUrl(window.location.href)
    }
  }, [])

  // Use the actual page title from the document
  const pageTitle = typeof document !== 'undefined' ? document.title : 'Capital Root'
  const shareText = `${pageTitle.replace(' - Capital Root Movies', '').replace(' | Capital Root Movies', '')} - Capital Root`

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl)
      alert('Link copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="social-share">
      <span>Share this video:</span>
      <div className="share-buttons">
        <a 
          href={shareLinks.twitter} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Share on Twitter"
        >
          <FaTwitter />
        </a>
        <a 
          href={shareLinks.facebook} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
        >
          <FaFacebook />
        </a>
        <a 
          href={shareLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a 
          href={shareLinks.whatsapp} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Share on WhatsApp"
        >
          <FaWhatsapp />
        </a>
        <a 
          href={shareLinks.telegram} 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
        >
          <FaTelegram />
        </a>
        <button 
          onClick={copyToClipboard}
          aria-label="Copy link"
        >
          <FaLink />
        </button>
      </div>

          </div>
  )
}