function Hero() {
  return (
    <section className="hero">

      
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* Hero Content */}
      <div className="hero-content">
        <h1>PhishGuard AI</h1>
        <p>AI Powered Phishing Detection</p>

        <button>Scan Now</button>
      </div>
      <div className="bg-slate-900/40 backdrop-blur-lg"></div>

    </section>
  );
}

export default Hero;
