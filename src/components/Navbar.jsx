function Navbar(){
    return(
        <nav class="navbar">
            <div className ="logo">
                <h2>🛡️PhishGuardAI</h2>
            </div>
            <ul>
                <li>Home</li>
                <li>Features</li>
                <li>Dashboard</li>
                <li>Pricing</li>
                <li>About</li>
                <li>Contact</li>
            </ul>

            <div className="nav-button">
            <button className="login-btn">Log In</button>

            <button className ="signup-btn">Sign Up</button>
            
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
        </nav>

    );
}
export default Navbar;