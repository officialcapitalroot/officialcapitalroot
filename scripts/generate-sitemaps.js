const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const xml2js = require('xml2js');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function generateSitemaps() {
  try {
    // Read the data.json file
    const dataPath = path.join(process.cwd(), 'data', 'data.json');
    const data = JSON.parse(await readFile(dataPath, 'utf8'));
    
    const baseUrl = 'https://capitalroot.vercel.app';
    const currentDate = new Date().toISOString();

    // Generate main sitemap.xml
    const staticPages = [
      { url: '', changefreq: 'daily', priority: '1.0' },
      { url: '/videos', changefreq: 'weekly', priority: '0.8' },
      { url: '/about', changefreq: 'monthly', priority: '0.7' },
      { url: '/contact', changefreq: 'monthly', priority: '0.7' },
      { url: '/privacy', changefreq: 'monthly', priority: '0.5' },
      { url: '/terms', changefreq: 'monthly', priority: '0.5' }
    ];

    const sitemapUrls = [
      ...staticPages.map(page => ({
        loc: `${baseUrl}${page.url}`,
        lastmod: currentDate,
        changefreq: page.changefreq,
        priority: page.priority
      })),
      ...data.videos.map(video => ({
        loc: `${baseUrl}/video/${video.videoId}`,
        lastmod: new Date(video.uploadDate).toISOString(),
        changefreq: 'monthly',
        priority: '0.9'
      }))
    ];

    const sitemapBuilder = new xml2js.Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' }
    });

    const sitemapObj = {
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
        },
        url: sitemapUrls.map(url => ({
          loc: url.loc,
          lastmod: url.lastmod,
          changefreq: url.changefreq,
          priority: url.priority
        }))
      }
    };

    const sitemapXml = sitemapBuilder.buildObject(sitemapObj);
    
    // Write sitemap.xml to public folder
    await writeFile(
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

    const videoSitemapUrls = data.videos.map(video => ({
      loc: `${baseUrl}/video/${video.videoId}`,
      video: {
        'video:thumbnail_loc': video.thumbnail,
        'video:title': { _: video.title },
        'video:description': { _: video.description },
        'video:content_loc': video.videoSource === 'youtube' 
          ? `https://www.youtube.com/watch?v=${video.videoId}`
          : `https://short.icu/${video.videoId}`,
        'video:player_loc': video.videoSource === 'youtube'
          ? `https://www.youtube.com/embed/${video.videoId}`
          : `https://short.icu/${video.videoId}`,
        'video:duration': durationToSeconds(video.duration),
        'video:view_count': viewCountToNumber(video.viewCount),
        'video:publication_date': new Date(video.uploadDate).toISOString(),
        'video:family_friendly': 'yes',
        'video:requires_subscription': 'no',
        'video:uploader': { _: 'Capital Root', $: { info: baseUrl } },
        'video:live': 'no',
        'video:tags': video.tags.join(', '),
        'video:category': 'Entertainment'
      }
    }));

    const videoSitemapObj = {
      urlset: {
        $: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1'
        },
        url: videoSitemapUrls.map(item => ({
          loc: item.loc,
          'video:video': item.video
        }))
      }
    };

    const videoSitemapXml = sitemapBuilder.buildObject(videoSitemapObj);
    
    // Write video-sitemap.xml to public folder
    await writeFile(
      path.join(process.cwd(), 'public', 'video-sitemap.xml'),
      videoSitemapXml
    );

    console.log('✓ video-sitemap.xml generated successfully');

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
Sitemap: ${baseUrl}/video-sitemap.xml`;

    await writeFile(
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