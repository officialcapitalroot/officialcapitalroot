import { FaTwitter, FaFacebook, FaLinkedin, FaLink, FaWhatsapp } from 'react-icons/fa'

export default function SocialShare({ url, title, description }) {
  const shareText = `${title} - Capital Root`
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + url)}`
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
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