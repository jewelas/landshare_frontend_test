import React from "react";
import Logo from "../../assets/img/icons/landshare-icon.svg";
import Landshare from "../../assets/img/icons/landshare-text.svg";
import "../../../src/components/Footer.css";
import { useVaultBgProvider } from "../../contexts/VaultBgProvider";
import MaxWidth from "../hoc/MaxWidth";
import { TwitterIcon, MediumIcon, EmailIcon, TeleGramIcon } from "./NftIcon";
const NftFooter = () => {
  const { backgoundVault, setBackgoundVault } = useVaultBgProvider();
  return (
    <>
      <section className="nft-footer">
        <div className="d-flex justify-content-center">
          <div className="container">
            <footer
              style={{ minHeight: "100%" }}
              className={` py-3 d-flex align-items-end`}
            >
              <div className="container">
                <div className="row justify-content-around flex-column flex-md-row">
                  <div className="col-auto text-center text-md-start pb-4 pb-md-0">
                    <ul className="list-unstyled d-flex flex-column ">
                      <li className="py-3">
                        <img src={Logo} alt="Logo" />
                      </li>
                      <li className="pb-3">
                        <img src={Landshare} alt="" />
                      </li>
                      <li>
                        <ul className="footer-social-icons list-unstyled d-flex justify-content-center justify-content-md-start">
                          <li>
                            <a href="https://twitter.com/landshareio">
                              <span
                                className={`
                          bg-5d5d5d
                      `}
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
                                <TeleGramIcon backgoundVault={backgoundVault} />
                              </span>
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                  <div
                    className="col text-center d-flex justify-content-center pb-4 pb-md-0"
                    style={{ alignItems: "end" }}
                  >
                    <div className="ms-md-5 ps-md-5">
                      <ul className="list-unstyled">
                        <li className="fs-xxs text-grey-800">
                          <MaxWidth maxWidth="100%">
                            <div style={{ fontSize: "10px" }}>
                              Real Estate NFTs are available for use by approved
                              Asset Token holders. Asset Tokens are real estate
                              securities and have not been, and will not be,
                              registered under the Securities Act of 1933, and
                              may be offered or sold to a non-US residents
                              outside of the United States. Accordingly, the
                              Securities are being offered and sold only to the
                              non-US residents in compliance with SEC Final Rule
                              Offshore Offers and Sales (Regulation S).{" "}
                            </div>
                          </MaxWidth>
                        </li>
                      </ul>
                      <div
                        className={`fw-bold m-0 text-grey-800 py-2`}
                        style={{ fontSize: "12px" }}
                      >
                        <MaxWidth maxWidth="992">
                          Copyright LandShare 2022 - all rights reserved
                        </MaxWidth>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-auto d-flex flex-column justify-content-end">
                    <ul className="list-unstyled d-flex justify-content-center">
                      <div className="d-flex px-3 flex-column">
                        {" "}
                        <li className="text-grey-900 fs-xxs">About</li>
                        <li className="mt-3 fs-xxs fs-sm text-grey-900">
                          Feature
                        </li>
                      </div>
                      <div className="d-flex fs-sm px-3 flex-column">
                        {" "}
                        <li className="text-grey-900 fs-xxs">Token</li>
                        <li className="mt-3 fs-xxs text-grey-900">
                          Presale
                        </li>
                      </div>
                    </ul>
                  </div> */}
                </div>
              </div>
            </footer>
          </div>
        </div>
      </section>
      {/*============== COPYRIGHT SECTION  ==============*/}
      {/* <div className={`bg-0ed145 text-center  p-3 d-flex flex-column flex-sm-row justify-content-center`}>
        <div
          className={`fw-bold m-0 text-white text-grey-800 py-2`}
          style={{ fontSize: "12px" }}
        >
          <MaxWidth maxWidth="992">
            Copyright LandShare 2022 - all rights reserved
          </MaxWidth>
        </div>
      </div> */}
    </>
  );
};

export default NftFooter;
