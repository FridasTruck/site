import { Link } from "react-router-dom";
import { IMAGES } from "../constent/theme";

const MainBanner3 = () => {
  return (
    <>
      <div className="main-bnr-two">
        <div className="main-slider-2">
          <div className="banner-inner">
            <div className="primary-box"></div>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-xl-6 col-lg-7 col-md-7">
                  <div className="banner-content">
                    <h1 className="title wow fadeInUp">
                      A escolha número <span className="text-primary">#1</span> para saciar sua fome
                    </h1>
                    <p className="wow fadeInUp">
                      Descubra os sabores incríveis do nosso food truck. De
                      hambúrgueres suculentos a HotDogs saborosos, servimos
                      comida de alta qualidade que vai deixar você querendo mais!
                    </p>

                    <div className="banner-btn d-flex align-items-center wow fadeInUp">
                      <Link
                        to="/contact-us"
                        className="btn btn-primary btn-md shadow-primary m-r30 btn-hover-3"
                      >
                        <span className="btn-text" data-text="Clique Aqui">
                          Entrar em Contato
                        </span>
                      </Link>
                      <Link
                        to="/our-menu-1"
                        className="btn btn-outline-primary btn-md shadow-primary btn-hover-3"
                      >
                        <span className="btn-text" data-text="Clique Aqui">
                          Cardápio
                        </span>
                      </Link>
                    </div>
                  </div>
                  <div className="main-thumb2-area">
                    <Link to="/our-menu-1" className="food-card wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-juice"></i>
                      </div>
                    </Link>
                    <Link to="/our-menu-1" className="food-card wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-hamburger"></i>
                      </div>
                    </Link>
                    <Link to="/our-menu-1" className="food-card wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-pizza"></i>
                      </div>
                    </Link>
                    <Link to="/our-menu-1" className="food-card wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-cake-slice"></i>
                      </div>
                    </Link>
                    <Link to="/our-menu-1" className="food-card wow fadeInUp">
                      <div className="icon">
                        <i className="flaticon-room-service"></i>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-5 col-md-5">
                  <div className="banner-media">
                    <img
                      src={IMAGES.main_slider3_bg}
                      className="item-bg"
                      alt="/"
                    />
                    <div className="item-media wow fadeInRight dz-move-down">
                      <img
                        src={IMAGES.main_slider3_offer}
                        className="offer dz-move"
                        alt="/"
                      />
                      <img
                        src={IMAGES.main_slider3_crown}
                        className="crown"
                        alt="/"
                      />
                      <img
                        src={IMAGES.main_slider3_burger}
                        className="img2"
                        alt="/"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="primary-box style-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBanner3;
