import { useEffect, useState } from "react";
import TwitterIcon from "../assets/img/t-icon.svg";
import EmailIcon from "../assets/img/email-icon.svg";
import MediumIcon from "../assets/img/m-icon.svg";
import TelegramIcon from "../assets/img/telegram1.svg";
import "./LeftSocialIcons.css";

export default function LeftSocialIcons() {
  const [areIconsInActive, setAreIconsInActive] = useState(false);
  useEffect(() => {
    function handleScroll() {
      const position = window.pageYOffset;
      if (position > 100) {
        setAreIconsInActive(true);
      } else {
        setAreIconsInActive(false);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`social-home-icons d-flex flex-column ${
        areIconsInActive ? "active" : ""
      }`}
      id="header"
    >
      <a href="https://www.twitter.com/landshareio">
        <span className="t-icon d-flex align-items-center justify-content-center">
          <img src={TwitterIcon} alt="" />
        </span>
      </a>

      <a href="https://medium.com/@Landshare">
        <span className="m-icon d-flex align-items-center justify-content-center">
          <img src={EmailIcon} alt="" />
        </span>
      </a>
      <a href="mailto:admin@landshare.io">
        <span className="email-icon d-flex align-items-center justify-content-center">
          <img src={MediumIcon} alt="" />
        </span>
      </a>
      <a href="https://t.me/landshare">
        <span className="telegram-icon  d-flex align-items-center justify-content-center">
          <img src={TelegramIcon} alt="" />
        </span>
      </a>
    </div>
  );
}
