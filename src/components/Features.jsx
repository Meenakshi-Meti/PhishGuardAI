function Features(){
    return (
        <section className="features">
            <div className="feature-card">
                <h3>URL Protection</h3>
                <p>Detect Phishing websites in real Time.</p>
            </div>
            <div className="feature-card">
                <h3>Email Security</h3>
                <p>Analyze Suspicious emails.</p>
            </div>
            <div className="feature-card">
                <h3>File Analysis</h3>
                <p>Scan files for threats.</p>
            </div>

            <div className="feature-card">
                <h3>QR Scanner</h3>
                <p>Check QR Codes Safely.</p>
            </div>
            <nav
  className="
    fixed
    top-0
    left-0
    w-full
    bg-white/5
    backdrop-blur-xl
    border-b
    border-white/10
    z-50
  "
></nav>
        </section>
        
    );
}
export default Features;