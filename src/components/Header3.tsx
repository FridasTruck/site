import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import Menu from "./Menu"; // ou importe MenuDark se necessário
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AppContext";

const Header = () => {
  const { headerClass, headerSidebar, setHeaderSidebar } =
    useContext(Context);
  const [scroll, setScroll] = useState<boolean>(false);

  const scrollHandler = () => {
    if (window.scrollY > 80) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <header className="site-header mo-left header header-transparent transparent-white style-1">
      <div
        className={`sticky-header main-bar-wraper navbar-expand-lg ${scroll ? "is-fixed" : ""}`}
      >
        <div className="main-bar clearfix ">
          <div className="container clearfix">
            <div className="logo-header mostion">
              {headerClass ? (
                <>
                  {scroll ? (
                    <Link to="/" className="anim-logo">
                      <img src={IMAGES.logo} alt="/" className="logo-image" />
                    </Link>
                  ) : (
                    <Link to="/" className="anim-logo-white">
                      <img src={IMAGES.logo} alt="/" className="logo-image" />
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/" className="anim-logo">
                  <img src={IMAGES.logo} alt="/" className="logo-image" />
                </Link>
              )}
            </div>

            <button
              className={`navbar-toggler collapsed navicon justify-content-end ${headerSidebar ? "open" : ""}`}
              type="button"
              onClick={() => {
                setHeaderSidebar(!headerSidebar);
              }}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            <div className="extra-nav">
              <div className="extra-cell">
                <ul className="d-flex align-items-center">
                  <li>
                  </li>
                  <li>
                  </li>
                </ul>
              </div>
            </div>

            <div
              className={`header-nav navbar-collapse justify-content-end ${headerSidebar ? "show" : ""}`}
              id="navbarNavDropdown"
            >
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
