import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function ScrollNav() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`scroll-nav ${visible ? "scroll-nav--visible" : ""}`}>
      <Link to="/" className="scroll-nav__logo">Game<span>Finder</span></Link>
      <Link to="/favorites" className="scroll-nav__link">Favorites</Link>
    </nav>
  );
}

export default ScrollNav;
