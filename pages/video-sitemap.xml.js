// import videoData from '../data/data.json'

// const VideoSitemap = () => {}

// export const getServerSideProps = async ({ res }) => {
//   const baseUrl = 'https://capitalroot.vercel.app'

//   // Helper function to convert duration to seconds
//   const durationToSeconds = (duration) => {
//     // Remove PT and parse ISO 8601 duration
//     const time = duration.replace('PT', '');
//     let seconds = 0;
    
//     if (time.includes('H')) {
//       const parts = time.split('H');
//       seconds += parseInt(parts[0]) * 3600;
//       if (parts[1]) {
//         const minutesPart = parts[1].replace('M', '');
//         seconds += parseInt(minutesPart) * 60;
//       }
//     } else if (time.includes('M')) {
//       const minutes = time.replace('M', '');
//       seconds += parseInt(minutes) * 60;
//     } else if (time.includes('S')) {
//       seconds += parseInt(time.replace('S', ''));
//     }
    
//     return seconds;
//   };

//   const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//             xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
//       ${videoData.videos.map(video => {
//         const contentUrl = video.videoSource === 'youtube' 
//           ? `https://www.youtube.com/watch?v=${video.videoId}`
//           : `https://short.icu/${video.videoId}`
          
//         const playerUrl = video.videoSource === 'youtube'
//           ? `https://www.youtube.com/embed/${video.videoId}`
//           : `https://short.icu/${video.videoId}`

//         return `
//         <url>
//           <loc>${baseUrl}/video/${video.videoId}</loc>
//           <video:video>
//             <video:thumbnail_loc>${video.thumbnail.startsWith('http') ? video.thumbnail : baseUrl + video.thumbnail}</video:thumbnail_loc>
//             <video:title><![CDATA[${video.title}]]></video:title>
//             <video:description><![CDATA[${video.description}]]></video:description>
//             <video:content_loc>${contentUrl}</video:content_loc>
//             <video:player_loc>${playerUrl}</video:player_loc>
//             <video:duration>${durationToSeconds(video.duration)}</video:duration>
//             <video:view_count>${video.viewCount}</video:view_count>
//             <video:publication_date>${video.uploadDate}</video:publication_date>
//             <video:family_friendly>yes</video:family_friendly>
//             <video:requires_subscription>no</video:requires_subscription>
//             <video:uploader info="${baseUrl}">Capital Root</video:uploader>
//             <video:live>no</video:live>
//             <video:tags>${video.tags.join(', ')}</video:tags>
//             <video:category>Entertainment</video:category>
//           </video:video>
//         </url>
//         `
//       }).join('')}
//     </urlset>
//   `

//   res.setHeader('Content-Type', 'text/xml')
//   res.write(videoSitemap)
//   res.end()

//   return {
//     props: {}
//   }
// }

// export default VideoSitemap

import videoData from '../data/data.json'

const VideoSitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  const baseUrl = 'https://capitalroot.vercel.app'

  // Helper function to convert duration to seconds
  const durationToSeconds = (duration) => {
    const parts = duration.split(':');
    let seconds = 0;
    if (parts.length === 3) {
      // HH:MM:SS
      seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
    } else if (parts.length === 2) {
      // MM:SS
      seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    } else {
      // SS
      seconds = parseInt(parts[0]);
    }
    return seconds;
  };

  // Helper function to convert view count string to number
  const viewCountToNumber = (viewCount) => {
    if (!viewCount) return 1000;
    if (viewCount.includes('K')) {
      return parseInt(parseFloat(viewCount.replace('K', '')) * 1000);
    }
    if (viewCount.includes('M')) {
      return parseInt(parseFloat(viewCount.replace('M', '')) * 1000000);
    }
    return parseInt(viewCount.replace(/[^0-9]/g, '')) || 1000;
  };

  const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${videoData.videos.map(video => {
        const contentUrl = video.videoSource === 'youtube' 
          ? `https://www.youtube.com/watch?v=${video.videoId}`
          : `https://short.icu/${video.videoId}`
          
        const playerUrl = video.videoSource === 'youtube'
          ? `https://www.youtube.com/embed/${video.videoId}`
          : `https://short.icu/${video.videoId}`

        return `
        <url>
          <loc>${baseUrl}/video/${video.videoId}</loc>
          <video:video>
            <video:thumbnail_loc>${video.thumbnail.startsWith('http') ? video.thumbnail : baseUrl + video.thumbnail}</video:thumbnail_loc>
            <video:title><![CDATA[${video.title}]]></video:title>
            <video:description><![CDATA[${video.description}]]></video:description>
            <video:content_loc>${contentUrl}</video:content_loc>
            <video:player_loc>${playerUrl}</video:player_loc>
            <video:duration>${durationToSeconds(video.duration)}</video:duration>
            <video:view_count>${viewCountToNumber(video.viewCount)}</video:view_count>
            <video:publication_date>${new Date(video.uploadDate).toISOString()}</video:publication_date>
            <video:family_friendly>yes</video:family_friendly>
            <video:requires_subscription>no</video:requires_subscription>
            <video:uploader info="${baseUrl}">Capital Root</video:uploader>
            <video:live>no</video:live>
            <video:tags>${video.tags.join(', ')}</video:tags>
            <video:category>Entertainment</video:category>
          </video:video>
        </url>
        `
      }).join('')}
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(videoSitemap)
  res.end()

  return {
    props: {}
  }
}

export default VideoSitemap