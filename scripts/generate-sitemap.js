const fs = require('fs');
const path = require('path');

// Import your video data
const videoData = require('../data/data.json');

function generateSitemap() {
  const baseUrl = 'https://capitalroot.vercel.app';
  const videos = videoData.videos;
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- All Videos Page -->
  <url>
    <loc>${baseUrl}/videos</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- Individual Video Pages -->
  ${videos.map(video => `
    <url>
      <loc>${baseUrl}/video/${video.slug}</loc>
      <lastmod>${new Date(video.uploadDate).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
      <image:image>
        <image:loc>${video.thumbnail.startsWith('http') ? video.thumbnail : baseUrl + video.thumbnail}</image:loc>
        <image:title><![CDATA[${video.title}]]></image:title>
        <image:caption><![CDATA[${video.description}]]></image:caption>
      </image:image>
      <video:video>
        <video:thumbnail_loc>${video.thumbnail.startsWith('http') ? video.thumbnail : baseUrl + video.thumbnail}</video:thumbnail_loc>
        <video:title><![CDATA[${video.title}]]></video:title>
        <video:description><![CDATA[${video.description}]]></video:description>
        <video:content_loc>${baseUrl}/video/${video.slug}</video:content_loc>
        <video:duration>${video.duration ? parseInt(video.duration.replace('PT', '').replace('H', '').replace('M', '').replace('S', '')) : 120}</video:duration>
        <video:publication_date>${new Date(video.uploadDate).toISOString()}</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:requires_subscription>no</video:requires_subscription>
      </video:video>
    </url>
  `).join('')}
</urlset>`;

  // Write to public folder
  const publicDir = path.join(__dirname, '../public');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
  
  console.log('✅ Sitemap generated successfully!');
  console.log(`📊 Total URLs: ${videos.length + 2}`);
}

generateSitemap();