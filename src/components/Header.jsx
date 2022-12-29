import React, { useEffect } from "react";
import Logo from "../assets/img/icons/landshare-icon.svg";
import LogoText from "../assets/img/icons/landshare-text.svg";
import HeaderModal from "./HeaderModal";
import "./Header.css";
import { useLandshareFunctions } from "../contexts/LandshareFunctionsProvider";
import { useVaultBgProvider } from "../contexts/VaultBgProvider";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useScreenFixedProvider } from "../contexts/ScreenFixedProvider";
import Login from "./auth/login";
import Register from "./auth/register";
import axios from 'axios';

export default function Header() {
  const isBeforeDesktop = useMediaQuery({ maxWidth: 991.98 });
  const isDesktop = useMediaQuery({ minWidth: 992 });
  let history = useHistory();
  const pathName = window.location.pathname;
  const { showOverlay, setShowOverlay, setWalletAddress, walletAddress } =
    useScreenFixedProvider();
  const [isLoading, setIsLoading] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [registerOpen, setRegisterOpen] = React.useState(false);
  const { backgoundVault, setBackgoundVault } = useVaultBgProvider();
  const [addy, setAddy] = React.useState("Not Connected");
  const { state, setState, notifyError, notifySuccess } = useLandshareFunctions();

  const login = async (address, password) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/signin`, {
      username: address,
      password: password
    }).then((res) => {
      setLoginOpen(false);
      const { data } = res
      if (data.success) {
        localStorage.setItem('jwtToken', data.token);
      } else {
        localStorage.removeItem('jwtToken');
        notifyError("Wrong password. Please check it again.");
      }
    }).catch((err) => {
      setLoginOpen(false);
      console.log(err);
      notifyError("Something went wrong. Try again later.");
    });
  }

  const register = async (address, password) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/register`, {
      username: address,
      password: password
    }).then((res) => {
      setRegisterOpen(false);
      const { data } = res
      if (data.success) {
        notifySuccess(data.msg);
      } else {
        notifyError(data.msg);
      }
    }).catch((err) => {
      setRegisterOpen(false);
      console.log(err);
      notifyError("Something went wrong. Try again later.");
    });
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalIsOpen]);
  useEffect(() => {
    const address = state.account;
    if (state.account !== undefined) {
      setWalletAddress(state.account);
      setAddy(
        state.account.toString().substr(0, 6) +
          "..." +
          state.account.toString().substr(38, 40)
      );

      function addressTrunc() {
        if (address != "Not Connected") {
          return;
        } else {
          setAddy(state.account);
        }
      }
      addressTrunc();
    }
    setIsLoading(true);
  }, [state]);
  const overlayRouteChangeHandler = (value) => {
    history.push(`/${value}`);
    setShowOverlay(false);
  };
  return (
    <>
      {isLoading ? (
        <nav className="navbar-wrapper d-flex align-items-center bg-fifthgray box-shadow-nav zIndex-11">
          <div
            className="container mx-auto d-flex justify-content-between w-100 align-items-stretch"
            style={{ maxWidth: "1320px" }}
          >
            {/* LANDSHARE LOGO  */}
            <div className="brand-logo my-auto  py-3">
              <div className="landshare-logo">
                <span
                  onClick={() => {
                    history.push("/");
                    setBackgoundVault(true);
                  }}
                  className="d-flex flex-nowrap"
                  title="Landshare"
                >
                  <img
                    src={Logo}
                    className="logo-img  cursor-pointer"
                    alt="logo-im"
                  />
                  <img
                    src={LogoText}
                    className="d-inline-block logo-text ms-2 cursor-pointer"
                    alt="LogoText"
                  />
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-stretch w-60 header-btn-group">
              <div className="list-items-header w-100 flex-grow-1 d-flex justify-content-end justify-content-lg-between align-items-stretch">
                {isDesktop && (
                  <>
                    <div
                      className={`fw-400 d-flex text-black fs-16 list-header-item transition-0_3sEase cursor-pointer align-items-center ${
                        pathName.includes("/nft") && "active"
                      }`}
                      onClick={() => history.push("/nft/list")}
                    >
                      <span className="fs-16">NFT</span>
                    </div>
                    <div
                      className={`fw-400 d-flex text-black fs-16 list-header-item transition-0_3sEase cursor-pointer align-items-center ${
                        pathName === "/vaults" && "active"
                      }`}
                      onClick={() => history.push("/vaults")}
                    >
                      <span className="fs-16">Vaults</span>
                    </div>
                    <div
                      className={`fw-400 d-flex cursor-pointer list-header-item text-black fs-16 transition-0_3sEase align-items-center ${
                        pathName === "/property-details" && "active"
                      }`}
                      onClick={() => history.push("/property-details")}
                    >
                      Tokenized Assets
                    </div>
                    <div
                      className={`fw-400 d-flex cursor-pointer list-header-item text-black fs-16 transition-0_3sEase align-items-center ${
                        pathName === "/"
                      }`}
                    >
                      <a
                        href="https://dashboard.landshare.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black fs-16 text-decoration-none transition-0_3sEase"
                      >
                        Dashboard
                      </a>
                    </div>
                    <div className="d-flex align-items-center list-header-item fw-400 text-black fs-16 transition-0_3sEase">
                      <a
                        href="https://vote.landshare.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black fs-16 text-decoration-none transition-0_3sEase"
                      >
                        Vote
                      </a>
                    </div>
                  </>
                )}
                
                {((state.account != "Not Connected") && pathName.includes("/nft") && !(localStorage.getItem('jwtToken'))) ? (
                  <div className="navbar-btns me-1 align-items-center d-flex my-auto ms-0">
                    <span
                      onClick={() => setLoginOpen(!loginOpen)}
                      className="btn nav-btn d-flex flex-column justify-content-center me-1 auth"
                    >
                      <span className="fs-16">Login</span>
                    </span>
                    <Login 
                      loginShow={loginOpen} 
                      setLoginShow={setLoginOpen} 
                      address={state.account} 
                      onSubmit={(wallet, password) => {
                        login(wallet, password);
                      }} 
                    />
                    <span
                      onClick={() => setRegisterOpen(!registerOpen)}
                      className="btn nav-btn d-flex flex-column justify-content-center auth"
                    >
                      <span className="fs-16">Register</span>
                    </span>
                    <Register 
                      loginShow={registerOpen} 
                      setLoginShow={setRegisterOpen} 
                      address={state.account} 
                      onSubmit={(wallet, password) => {
                        register(wallet, password);
                      }} 
                    />
                  </div>
                ) : (
                  <div className="navbar-btns me-3 align-items-center d-flex my-auto ms-0">
                    {/* NOT CONNECTED BUTTON  */}
                    <span
                      onClick={() => setIsOpen(true)}
                      className="btn nav-btn d-flex flex-column justify-content-center"
                    >
                      <span className="fs-16">{addy}</span>
                    </span>
                    <HeaderModal
                      isOpen={modalIsOpen}
                      closeModal={() => setIsOpen(false)}
                    />
                  </div>
                )}
                {/* TOGGLE BUTTON  */}
                <div
                  className={`position-relative navbarwrapper d-flex my-auto flex-column d-lg-none ${
                    showOverlay && "animate show-overlay"
                  }`}
                  onClick={() => setShowOverlay(!showOverlay)}
                >
                  <span className="first d-inline-block"></span>
                  <span className="second d-inline-block"></span>
                  <span className="third d-inline-block"></span>
                </div>
              </div>
            </div>
          </div>
          {/* OVERLAY SHOW ONLY BEFORE 992 SHOW HERE WE USE REACT MEDIA QUERY  */}
          {isBeforeDesktop && (
            <div
              className={`${showOverlay ? "overlay-active" : ""} overlay-nav`}
            >
              <div className="bg-white h-100vh d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column text-center ">
                  <ul className="p-0">
                    <li
                      onClick={() => overlayRouteChangeHandler("nft/list")}
                      className="fw-400 text-black fs-28 transition-0_3sEase overflow-hidden"
                    >
                      <span className="py-4 d-inline-block cursor-pointer">
                        NFT
                      </span>
                    </li>
                    <li className="fw-400 text-black fs-28 transition-0_3sEase overflow-hidden">
                      <span className="py-4 d-inline-block cursor-pointer">
                        <a
                          onClick={() => setShowOverlay(!showOverlay)}
                          href="https://vote.landshare.io"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black fs-28 text-decoration-none transition-0_3sEase"
                        >
                          Vote
                        </a>
                      </span>
                    </li>
                    <li className="fw-400 text-black fs-28 transition-0_3sEase overflow-hidden">
                      <span className="py-4 d-inline-block cursor-pointer">
                        <a
                          onClick={() => setShowOverlay(!showOverlay)}
                          href="https://dashboard.landshare.io/auth/login"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-black fs-28 text-decoration-none transition-0_3sEase"
                        >
                          Dashboard
                        </a>
                      </span>
                    </li>
                    <li
                      onClick={() => overlayRouteChangeHandler("vaults")}
                      className="fw-400 text-black fs-28 transition-0_3sEase overflow-hidden"
                    >
                      <span className="py-4 d-inline-block cursor-pointer">
                        Vaults
                      </span>
                    </li>
                    <li
                      onClick={() => overlayRouteChangeHandler("property-details")}
                      className="fw-400 text-black fs-28 transition-0_3sEase overflow-hidden"
                    >
                      <span className="py-4 d-inline-block cursor-pointer">
                        Tokenized Assets
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </nav>
      ) : null}
      {/* OVERLAY  */}
    </>
  );
}
