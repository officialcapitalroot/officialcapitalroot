// import videoData from '../data/data.json'

// const VideoSitemap = () => {}

// export const getServerSideProps = async ({ res }) => {
//   const baseUrl = 'https://officialcapitalroot.vercel.app'

//   const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//             xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
//       ${videoData.videos.map(video => `
//         <url>
//           <loc>${baseUrl}/video/${video.videoId}</loc>
//           <video:video>
//             <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
//             <video:title><![CDATA[${video.title}]]></video:title>
//             <video:description><![CDATA[${video.description}]]></video:description>
//             <video:content_loc>${video.videoSource === 'youtube' 
//               ? `https://www.youtube.com/watch?v=${video.videoId}`
//               : `https://short.icu/${video.videoId}`}</video:content_loc>
//             <video:player_loc>${video.videoSource === 'youtube'
//               ? `https://www.youtube.com/embed/${video.videoId}`
//               : `https://short.icu/${video.videoId}`}</video:player_loc>
//             <video:duration>${video.duration.split(':').reduce((acc, time) => (60 * acc) + +time)}</video:duration>
//             <video:view_count>${parseInt(video.viewCount) || 1000}</video:view_count>
//             <video:publication_date>${new Date(video.publishedAt).toISOString()}</video:publication_date>
//             <video:family_friendly>yes</video:family_friendly>
//             <video:requires_subscription>no</video:requires_subscription>
//             <video:uploader info="${baseUrl}">Official Capital Root</video:uploader>
//             <video:live>no</video:live>
//           </video:video>
//         </url>
//       `).join('')}
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
  const baseUrl = 'https://officialcapitalroot.vercel.app'

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

  const videoSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
      ${videoData.videos.map(video => `
        <url>
          <loc>${baseUrl}/video/${video.videoId}</loc>
          <video:video>
            <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
            <video:title><![CDATA[${video.title}]]></video:title>
            <video:description><![CDATA[${video.description}]]></video:description>
            <video:content_loc>${video.videoSource === 'youtube' 
              ? `https://www.youtube.com/watch?v=${video.videoId}`
              : `https://short.icu/${video.videoId}`}</video:content_loc>
            <video:player_loc>${video.videoSource === 'youtube'
              ? `https://www.youtube.com/embed/${video.videoId}`
              : `https://short.icu/${video.videoId}`}</video:player_loc>
            <video:duration>${durationToSeconds(video.duration)}</video:duration>
            <video:view_count>${parseInt(video.viewCount.replace('K', '000')) || 1000}</video:view_count>
            <video:publication_date>${new Date(video.publishedAt).toISOString()}</video:publication_date>
            <video:family_friendly>yes</video:family_friendly>
            <video:requires_subscription>no</video:requires_subscription>
            <video:uploader info="${baseUrl}">Official Capital Root</video:uploader>
            <video:live>no</video:live>
            <video:tags>${video.tags.join(', ')}</video:tags>
            <video:category>Entertainment</video:category>
          </video:video>
        </url>
      `).join('')}
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