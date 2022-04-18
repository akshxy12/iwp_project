
// Styles
import "./Header.css";

// Assets
import logo from "../../assets/logo_normal.png";

function Header() {
    return (
        <>
            <header>
                <a href="/" alt="Home"><img src={logo} alt="Logo" /></a>

                <nav>
                    <li><a href="/" alt="Home page">Home</a></li>
                </nav>
            </header>
        </>
    )
};

export default Header;