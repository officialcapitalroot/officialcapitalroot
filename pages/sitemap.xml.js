import videoData from '../data/data.json'

const Sitemap = () => {}

export const getServerSideProps = async ({ res }) => {
  const baseUrl = 'https://capitalroot.vercel.app'
  
  const staticPages = [
    '',
    '/videos',
    '/about',
    '/contact',
    '/privacy',
    '/terms'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${staticPages.map(page => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
      ${videoData.videos.map(video => `
        <url>
          <loc>${baseUrl}/video/${video.videoId}</loc>
          <lastmod>${new Date(video.publishedAt).toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.9</priority>
        </url>
      `).join('')}
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {}
  }
}

export default Sitemap