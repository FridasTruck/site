import { Link, useLocation } from "react-router-dom";
import { IMAGES } from "../constent/theme";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Context } from "../context/AppContext";
import SocialLinks from "../elements/SocialLinks";

interface MenuItem {
  child: string;
  to?: string;
  subchild?: { children: string; to: string }[];
}

interface MenuType {
  menu: string;
  className?: string;
  ulClassName?: string;
  to?: string;
  submenu?: MenuItem[];
}

const MenuArr: MenuType[] = [
  {
    menu: "Home",
    to: "/",
  },
  {
    menu: "Contato",
    to: "/contact-us",
  },
  {
    menu: "Cardápio",
    to: "/our-menu-1",
    submenu: [
      {
        child: "Double Burger",
        to: "/product-detail",
      },
      {
        child: "Cheese Burger",
        to: "/product-detail",
      },
    ],
  },
];

const reducer = (previousState: any, updatedState: any) => {
  return {
    ...previousState,
    ...updatedState,
  };
};

const initialState = {
  activeSubmenu: "",
};

const Menu = () => {
  const { headerClass } = useContext(Context);
  const [active, setActive] = useState<string>("");
  const { pathname } = useLocation();
  const navRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    MenuArr.forEach((el) => {
      if (el.to === pathname) {
        setActive(el.menu);
      }
      el.submenu?.forEach((ell: MenuItem) => {
        if (ell.to === pathname) {
          setActive(el.menu);
        }
        ell.subchild?.forEach((data) => {
          if (data.to === pathname) {
            setActive(el.menu);
          }
        });
      });
    });
  }, [pathname]);

  const [state, setState] = useReducer(reducer, initialState);
  const menuHandler = (status: string) => {
    setState({ activeSubmenu: status });
    if (state.activeSubmenu === status) {
      setState({ activeSubmenu: "" });
    }
  };

  return (
    <>
      <ul className={`nav navbar-nav navbar ms-lg-4 ${headerClass ? "white" : ""}`}>
        {MenuArr.map(({ menu, className, submenu, ulClassName, to }, ind) => (
          <li
            key={ind}
            className={`${className || ""} ${active === menu ? "active" : ""} ${state.activeSubmenu === menu ? "open" : ""}`}
            ref={(node) => {
              if (node) {
                navRef.current.push(node);
              }
            }}
            onClick={() => {
              menuHandler(menu);
            }}
          >
            <Link
              to={to || "#"}
              style={{
                color: "black",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              {menu}
            </Link>
            {submenu && (
              <ul className={ulClassName}>
                {submenu.map(({ child, to, subchild }: MenuItem, index) => (
                  ulClassName === "mega-menu" ? (
                    <li key={index}>
                      <Link to={to || "#"}>{child}</Link>
                      {subchild && (
                        <ul>
                          {subchild.map(({ children, to }, ind) => (
                            <li key={ind}>
                              <Link to={to}>{children}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ) : (
                    <li key={index}>
                      <Link to={to || "#"}>{child}</Link>
                    </li>
                  )
                ))}
                {ulClassName === "mega-menu" && (
                  <li className="header-adv p-0">
                    <img src={IMAGES.images_adv_media} alt="Advertisement" />
                  </li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="dz-social-icon d-flex justify-content-center">
        <SocialLinks />
      </div>
    </>
  );
};

export default Menu;
