export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-art" role="img" aria-label="A friendly AI support robot at a laptop surrounded by conversation bubbles">
        <img className="hero-robot" src="/images/hero-robot.webp" width="1600" height="1000" alt="" fetchPriority="high" />
        {[1, 2, 3, 4].map((number) => (
          <div key={number} className={`hero-bubble bubble-${number}`}>
            <img src={`/images/bubble-${number}.webp`} alt="" />
          </div>
        ))}
      </div>
      <div className="hero-copy">
        <h1 id="hero-title"><span>Every hello</span><br />{' '}builds <strong>LOYALTY.</strong></h1>
        <p>Elevate customer experience by letting intelligent AI agents solve<br className="desktop-break" /> repetitive questions instantly.</p>
      </div>
    </section>
  )
}
