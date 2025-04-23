import { useState } from "react";

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 740) {
      setMenuOpen(false);
    }})

    const handleLinkClick = () => {
        setMenuOpen(false);
      };

    

  return (
    <>
      <div className="header-wrapper">
        <div className="header">
          <div className="logo-canvas"></div>
          <div className="header-right">
            <a href="#">Обо мне</a>
            <a href="#section-sport">Занятия</a>
            <a href="#section-contact">Контакты</a>
          </div>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
            <a href="#" onClick={handleLinkClick}>Обо мне</a>
            <a href="#" onClick={handleLinkClick}>Занятия</a>
            <a href="#" onClick={handleLinkClick}>Контакты</a>
        </div>
      )}
    </>
  );
};