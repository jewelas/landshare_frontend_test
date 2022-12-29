import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import goOther from "../../../assets/img/icons/go_other.png";
import { useScreenFixedProvider } from "../../../contexts/ScreenFixedProvider";
import { BackIcon } from "../NftIcon";
import "./Topbar.css";

const Topbar = ({ isNftList }) => {
  const { setShowNftFooter } = useScreenFixedProvider();
  const pathName = window.location.pathname;
  let history = useHistory();
  useEffect(() => {
    setShowNftFooter(true);
    return () => {
      setShowNftFooter(false);
    };
  });
  return (
    <>
      <div className="w-100 overflow-hidden">
        <div className="mb-4 mt-5 mb-lg-0 tabs-list d-flex flex-nowrap align-items-center overflow-auto top-bar-menu">
          <span
            className={`cursor-pointer white-space-nowrap  pb-3 tabs ${
              !pathName.includes("/marketplace") &&
              !pathName.includes("/resources") &&
              "active fw-bold"
            }`}
            onClick={() => history.push("/nft/list")}
          >
            Your NFTs
          </span>
          <span
            className={` tabs pb-3 cursor-pointer ${
              pathName.includes("/marketplace") && "active fw-bold"
            }`}
            // onClick={() => history.push("/marketplace")}
          >
            Marketplace
          </span>
          <span
            className={` tabs pb-3 cursor-pointer ${
              pathName.includes("/resources") && "active fw-bold"
            }`}
            onClick={() => history.push("/nft/resources")}
          >
            Resources
          </span>
          <span className={` white-space-nowrap tabs pb-3 cursor-pointer`}>
            <a
              href="https://docs.landshare.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <img src={goOther} alt="go other" className="me-1" />
              Game Guide
            </a>
          </span>
        </div>

        {/*========== BACK TO LIST ROW  ======*/}
        {isNftList ? (
          <div className="mt-4"></div>
        ) : (
          <div className="d-flex align-items-center back-to-list">
            <div
              className="inline-block cursor-pointer"
              onClick={() => history.push("/nft/list")}
            >
              <BackIcon />
              <span className="px-2 fs-xs cursor-pointer text-black-900">
                Back to the list
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Topbar;
