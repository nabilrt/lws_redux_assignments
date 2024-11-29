import { useSelector } from "react-redux";
import lwsLogo from "../assets/images/logo.png";

export default function NavBar({ setIsProductPage }) {
  const cartLength = useSelector((state) => state.cart.length);
  return (
    <nav className="bg-[#171C2A] py-4">
      <div className="navBar">
        <a href="index.html">
          <img src={lwsLogo} alt="LWS" className="max-w-[140px]" />
        </a>
        <div className="flex items-center gap-4">
          <button
            className="navHome"
            id="lws-home"
            onClick={() => setIsProductPage(true)}
          >
            {" "}
            Home{" "}
          </button>
          <button
            className="navCart"
            id="lws-cart"
            onClick={() => setIsProductPage(false)}
          >
            <i className="text-xl fa-sharp fa-solid fa-bag-shopping" />
            <span id="lws-totalCart">{cartLength}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
