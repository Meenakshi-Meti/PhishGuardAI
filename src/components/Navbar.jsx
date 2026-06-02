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
        </nav>
    );
}
export default Navbar;