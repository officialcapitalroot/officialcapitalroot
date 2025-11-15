// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: ['i.ytimg.com', 'img.youtube.com', 'www.dailymotion.com', 'dmcdn.net', 'abyss.to', 'capitalroot.vercel.app', 'short.icu'],
//     formats: ['image/webp', 'image/avif'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff'
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'DENY'
//           },
//           {
//             key: 'X-XSS-Protection',
//             value: '1; mode=block'
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'origin-when-cross-origin'
//           },
//           {
//             key: 'Strict-Transport-Security',
//             value: 'max-age=31536000; includeSubDomains'
//           }
//         ],
//       },
//     ]
//   },
//   compress: true,
//   poweredByHeader: false,
//   generateEtags: false,
//   trailingSlash: true,
// }

// module.exports = nextConfig

// Update your next.config.js to include TMDB domains
// next.config.js










// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: [
//       'i.ytimg.com', 
//       'img.youtube.com', 
//       'www.dailymotion.com', 
//       'dmcdn.net', 
//       'abyss.to', 
//       'capitalroot.vercel.app', 
//       'short.icu',
//       'image.tmdb.org', // Add TMDB image domain
//       'themoviedb.org'
//     ],
//     formats: ['image/webp', 'image/avif'],
//     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//   },
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff'
//           },
//           {
//             key: 'X-Frame-Options',
//             value: 'DENY'
//           },
//           {
//             key: 'X-XSS-Protection',
//             value: '1; mode=block'
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'origin-when-cross-origin'
//           },
//           {
//             key: 'Strict-Transport-Security',
//             value: 'max-age=31536000; includeSubDomains'
//           }
//         ],
//       },
//     ]
//   },
//   compress: true,
//   poweredByHeader: false,
//   generateEtags: false,
//   trailingSlash: true,
// }

// module.exports = nextConfig




// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'i.ytimg.com', 
      'img.youtube.com', 
      'www.dailymotion.com', 
      'dmcdn.net', 
      'abyss.to', 
      'capitalroot.vercel.app', 
      'short.icu',
      'image.tmdb.org',
      'themoviedb.org',
      // Add any other domains from your JSON thumbnails
      'i.ibb.co',
      'example.com',
      'your-image-host.com'
    ],  
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ]
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  trailingSlash: true,
}

module.exports = nextConfig