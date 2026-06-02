function Hero(){
    return (
        <section class="hero">

            <div className="hero-left">
                <span className ="badge">AI-Powered Threat Detection</span>

                <h1>Detect Phishing Websites Before They Steal</h1>

                <p>AI-Powered phishing detection system for websites, emails and files.</p>
            <div className ="hero-buttons">
            <button>Start Free Scan</button>
            <button>Watch Demo</button>
            </div>
            </div>
            <div className="hero-right">
                <shield3D />
            </div>
        </section>
    );
}
export default Hero;
