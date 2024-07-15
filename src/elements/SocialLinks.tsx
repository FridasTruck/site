import { Link } from "react-router-dom";
import { Context } from "../context/AppContext";
import { useContext } from "react";

const SocialLinks = () => {
  const { setShowSignInForm } = useContext(Context);

  return (
    <ul className="social-links">
      <li>
        <Link
          className="social-btn"
          to="#"
          onClick={() => {
            setShowSignInForm(true);
          }}
        >
          <i className="flaticon-user"></i>
        </Link>
      </li>
      <li>
        <Link
          target="_blank"
          className="social-btn fab fa-facebook-f"
          to="https://www.facebook.com/"
        ></Link>
      </li>
      <li>
        <Link
          target="_blank"
          className="social-btn fab fa-twitter"
          to="https://twitter.com/"
        ></Link>
      </li>
      <li>
        <Link
          target="_blank"
          className="social-btn fab fa-instagram"
          to="https://www.instagram.com/"
        ></Link>
      </li>
    </ul>
  );
};

export default SocialLinks;
