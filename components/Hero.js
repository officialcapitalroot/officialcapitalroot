export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Holly,Bolly & Stockwood Market with <span>Capital Root</span></h1>
          <p className="hero-subtitle">
            Capital Root blends storytelling with every video reveals the drama behind trio — Holly,Bolly & Stockwood Market.
          </p>
          <p className="hero-subtitle">
            Want To Be in Big Market Value.
          </p>

          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Subscribers</span>
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
              href="https://www.youtube.com/channel/UCS7Ahfb_tr9uUz_XuiNJtGg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="cta-button primary"
            >
              Subscribe on YouTube
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