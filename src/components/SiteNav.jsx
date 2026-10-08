import { Link } from "react-router-dom";

function SiteNav() {
  return (
    <nav className="site-nav-bar">
      <Link to="/" className="site-nav-bar__logo">Game<span>Finder</span></Link>
      <Link to="/favorites" className="site-nav-bar__link">Favorites</Link>
    </nav>
  );
}

export default SiteNav;