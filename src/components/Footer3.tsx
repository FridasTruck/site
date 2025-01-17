import { IMAGES } from "../constent/theme";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { Toaster } from "react-hot-toast";

const Footer3 = () => {
  const heartRef = useRef<HTMLSpanElement | null>(null);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={true} />
      <footer className="site-footer style-3" id="footer">
        <div className="footer-bg-wrapper">
          <div className="container">
            <div className="footer-top">
              <div className="footer-subscribe-wrapper">
                <div className="wrapper-inner">
                  <div className="row justify-content-between">
                    <div className="col-xl-4 col-lg-4 mb-lg-0 m-b20 wow fadeInUp">
                      <div className="footer-logo">
                        <Link to="/" className="anim-logo">
                          <img src={IMAGES.logo} alt="swigo logo" />
                        </Link>
                      </div>
                      <p className="mb-0 font-14">
                        "Frida's Truck: Lanches deliciosos que vão conquistar seu paladar!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-5 col-md-6 col-6 text-md-start">
                  <h5 className="footer-title wow fadeInUp">LINKS</h5>
                  <div className="footer-menu wow fadeInUp">
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about-us">Veja Mais</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-7 col-md-6 col-6 text-md-end">
                  <h5 className="footer-title wow fadeInUp">Help Center</h5>
                  <div className="footer-menu wow fadeInUp">
                    <ul>
                      <li>
                        <Link to="/contact-us">Entre em Contato</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="footer-bottom">
              <div className="row">
                <div className="col-xl-6 col-md-6 text-md-start">
                  <p>Copyright 2024 All rights reserved.</p>
                </div>
                <div className="col-xl-6 col-md-6 text-md-end">
                  <span className="copyright-text">
                    Crafted With{" "}
                    <span
                      className="heart"
                      ref={heartRef}
                      onClick={() => {
                        heartRef.current?.classList.toggle("heart-blast");
                      }}
                    ></span>{" "}
                    by{" "}
                    <Link to="https:/appstechdev.com/" target="_blank">
                      AppsTechDev
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img className="bg1 dz-move" src={IMAGES.background_pic5} alt="/" />
        <img className="bg2 dz-move" src={IMAGES.background_pic6} alt="/" />
      </footer>
    </>
  );
};

export default Footer3;
