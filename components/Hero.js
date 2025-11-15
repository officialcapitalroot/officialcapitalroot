// export default function Hero() {
//   return (
//     <section className="hero">
//       <div className="container">
//         <div className="hero-content">
//           <h1>Watch Movies On Demand with <span>Capital Root</span></h1>
//           <p className="hero-subtitle">
//             Capital Root Movies Only On Demand Via Telegram.
//           </p>
        
//           <div className="hero-stats">
//             <div className="stat">
//               <span className="stat-number">50K+</span>
//               <span className="stat-label">Subscribers</span>
//             </div>
//               <div className="stat">
//               <span className="stat-number">Unlimited</span>
//               <span className="stat-label">Movies</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">100+</span>
//               <span className="stat-label">Videos</span>
//             </div>
//             <div className="stat">
//               <span className="stat-number">1M+</span>
//               <span className="stat-label">Views</span>
//             </div>
//           </div>
//           <div className="hero-actions">
//             <a 
//               href="https://t.me/capitalroot" 
//               target="_blank" 
//               rel="noopener noreferrer"
//               className="cta-button primary"
//             >
//               Subscribe on Telegram
//             </a>
//             <a href="#videos" className="cta-button secondary">
//               Watch Videos
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// components/Hero.js
export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Watch Latest Movies Online in HD Quality</h1>
          <p className="hero-subtitle">
            Stream Hollywood, Bollywood and regional movies on demand. 
            Unlimited entertainment with Capital Root Movies. New movies added daily.
          </p>
          
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Movies</span>
            </div>
            <div className="stat">
              <span className="stat-number">Full HD</span>
              <span className="stat-label">Quality</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Streaming</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free</span>
            </div>
          </div>

          <div className="hero-actions">
            <a href="#movies" className="cta-button primary">
              <span>Watch Movies</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </a>
            <a href="/videos" className="cta-button secondary">
              <span>Browse All</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}