import Logo from "../assets/img/icons/landshare-icon.svg";
import Landshare from "../assets/img/icons/landshare-text.svg";
import { useScreenFixedProvider } from "../contexts/ScreenFixedProvider";
import { useVaultBgProvider } from "../contexts/VaultBgProvider";
import "./Footer.css";
import { EmailIcon, MediumIcon, TelegramIcon, TwitterIcon } from "./Icons";
import NftFooter from "./nft/NftFooter";
export default function Footer() {
  const { backgoundVault, setBackgoundVault } = useVaultBgProvider();
  const { isNftRoute } = useScreenFixedProvider();
  return (
    <>
      {isNftRoute ? (
        <NftFooter />
      ) : (
        <>
          <footer
            className={`${
              backgoundVault ? "bg-transparent " : "bg-f5fff7"
            } py-3 py-md-5 d-flex align-items-end`}
          >
            <div className="container">
              <div className="row justify-content-around flex-column flex-md-row">
                <div className="col-auto text-center text-md-start pb-4 pb-md-0">
                  <ul className="list-unstyled d-flex flex-column align-items-center">
                    <li className="py-3">
                      <img className="footer-logo-img" src={Logo} alt="Logo" />
                    </li>
                    <li className="pb-3">
                      <img
                        className="footer-logo-text"
                        src={Landshare}
                        alt=""
                      />
                    </li>
                    <li>
                      <ul className="footer-social-icons list-unstyled d-flex justify-content-center justify-content-md-start">
                        <li>
                          <a href="https://twitter.com/landshareio">
                            <span
                              className={`${
                                backgoundVault ? "bg-white" : "bg-5d5d5d"
                              }`}
                            >
                              <TwitterIcon backgoundVault={backgoundVault} />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="https://medium.com/@Landshare">
                            <span
                              className={`${
                                backgoundVault ? "bg-white" : "bg-5d5d5d"
                              }`}
                            >
                              <MediumIcon backgoundVault={backgoundVault} />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="mailto:admin@landshare.io">
                            <span
                              className={`${
                                backgoundVault ? "bg-white" : "bg-5d5d5d"
                              }`}
                            >
                              <EmailIcon backgoundVault={backgoundVault} />
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="https://t.me/landshare">
                            <span
                              className={`${
                                backgoundVault ? "bg-white" : "bg-5d5d5d"
                              }`}
                            >
                              <TelegramIcon />
                            </span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="col-auto text-center align-items-end d-flex justify-content-center pb-4 pb-md-0">
                  <ul className="list-unstyled">
                    <li>© 2021 Landshare LLC</li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
          <div
            className={`${
              backgoundVault
                ? "backdrop-filter-130 bg-transparent"
                : "bg-0ed145"
            }  text-center  p-3 d-flex flex-column flex-sm-row justify-content-center`}
          >
            <span
              className={` ${
                backgoundVault ? " text-black" : "text-white"
              } fw-700 text-black d-flex align-items-center fs-20`}
            >
              Disclaimer
            </span>
            <p
              className={` ${
                backgoundVault ? " text-black" : "text-white"
              }  px-md-5 text-start max-w-992 mt-2 mt-sm-0`}
              style={{ fontSize: "11px" }}
            >
              Use of the Landshare BUSD Vault and LAND Token Staking is not an
              investment in real estate assets. Staking features are not tied to
              the Tokenized Asset offerings conducted by Landshare LLC. The
              Landshare Token is a utility of the platform, and does not
              represent the value of any real estate assets.
            </p>
          </div>
        </>
      )}
    </>
  );
}
