const fs = require('fs');
const path = require('path');

function generateSitemaps() {
  try {
    // Read the data.json file
    const dataPath = path.join(process.cwd(), 'data', 'data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const baseUrl = 'https://capitalroot.vercel.app';
    const currentDate = new Date().toISOString().split('T')[0];

    // Generate main sitemap.xml
    const staticPages = [
      { url: '', changefreq: 'daily', priority: '1.0' },
      { url: '/videos', changefreq: 'weekly', priority: '0.8' },
      { url: '/about', changefreq: 'monthly', priority: '0.7' },
      { url: '/contact', changefreq: 'monthly', priority: '0.7' },
      { url: '/privacy', changefreq: 'monthly', priority: '0.5' },
      { url: '/terms', changefreq: 'monthly', priority: '0.5' }
    ];

    let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

    // Add static pages
    staticPages.forEach(page => {
      sitemapXml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    // Add video pages
    data.videos.forEach(video => {
      sitemapXml += `  <url>
    <loc>${baseUrl}/video/${video.videoId}</loc>
    <lastmod>${video.uploadDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
`;
    });

    sitemapXml += `</urlset>`;

    // Write sitemap.xml to public folder
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'sitemap.xml'),
      sitemapXml
    );

    console.log('✓ sitemap.xml generated successfully');

    // Generate video-sitemap.xml
    const durationToSeconds = (duration) => {
      const parts = duration.split(':');
      let seconds = 0;
      if (parts.length === 3) {
        seconds = parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
      } else if (parts.length === 2) {
        seconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
      } else {
        seconds = parseInt(parts[0]);
      }
      return seconds;
    };

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

    let videoSitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

    data.videos.forEach(video => {
      const videoUrl = `${baseUrl}/video/${video.videoId}`;
      const contentUrl = video.videoSource === 'youtube' 
        ? `https://www.youtube.com/watch?v=${video.videoId}`
        : `https://short.icu/${video.videoId}`;
      const playerUrl = video.videoSource === 'youtube'
        ? `https://www.youtube.com/embed/${video.videoId}`
        : `https://short.icu/${video.videoId}`;
      
      videoSitemapXml += `  <url>
    <loc>${videoUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>
      <video:title><![CDATA[${video.title}]]></video:title>
      <video:description><![CDATA[${video.description}]]></video:description>
      <video:content_loc>${contentUrl}</video:content_loc>
      <video:player_loc>${playerUrl}</video:player_loc>
      <video:duration>${durationToSeconds(video.duration)}</video:duration>
      <video:view_count>${viewCountToNumber(video.viewCount)}</video:view_count>
      <video:publication_date>${video.uploadDate}</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
      <video:uploader info="${baseUrl}">Capital Root</video:uploader>
      <video:live>no</video:live>
      <video:tags>${video.tags.join(', ')}</video:tags>
      <video:category>Entertainment</video:category>
    </video:video>
  </url>
`;
    });

    videoSitemapXml += `</urlset>`;

    // Write video-sitemap.xml to public folder
    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'video-sitemap.xml'),
      videoSitemapXml
    );

    console.log('✓ video-sitemap.xml generated successfully');

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/video-sitemap.xml`;

    fs.writeFileSync(
      path.join(process.cwd(), 'public', 'robots.txt'),
      robotsTxt
    );

    console.log('✓ robots.txt generated successfully');

  } catch (error) {
    console.error('Error generating sitemaps:', error);
    process.exit(1);
  }
}

generateSitemaps();