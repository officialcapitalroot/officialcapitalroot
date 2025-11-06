export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Watch Movies On Demand with <span>Capital Root</span></h1>
          <p className="hero-subtitle">
            Capital Root Movies Only On Demand Via Telegram.
          </p>
        
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Subscribers</span>
            </div>
              <div className="stat">
              <span className="stat-number">Unlimited</span>
              <span className="stat-label">Movies</span>
            </div>
            <div className="stat">
              <span className="stat-number">100+</span>
              <span className="stat-label">Videos</span>
            </div>
            <div className="stat">
              <span className="stat-number">1M+</span>
              <span className="stat-label">Views</span>
            </div>
          </div>
          <div className="hero-actions">
            <a 
              href="https://t.me/capitalroot" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button primary"
            >
              Subscribe on Telegram
            </a>
            <a href="#videos" className="cta-button secondary">
              Watch Videos
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}