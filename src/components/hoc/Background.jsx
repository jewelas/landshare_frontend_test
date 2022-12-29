import React, { useEffect } from "react";
import { useScreenFixedProvider } from "../../contexts/ScreenFixedProvider";
import { useVaultBgProvider } from "../../contexts/VaultBgProvider";
import VaultBackground from "../../assets/img/base-images/landshare-wallet.jpg";
import VaultBackgroundWithOverlay from "../../assets/img/base-images/homeBgImage.webp";
import NftFooter from "../nft/NftFooter";
export const Background = ({ children }) => {
  const pathName = window.location.pathname;
  const { showOverlay, showNftFooter, setShowNftFooter } =
    useScreenFixedProvider();

  const { backgoundVault, setBackgoundVault, withOverlayBg, setWithOverlayBg } =
    useVaultBgProvider();
  useEffect(() => {
    if (pathName === "/") {
      setBackgoundVault(true);
      setWithOverlayBg(true);
    } else if (pathName.includes("/property")) {
      setBackgoundVault(false);
      //setShowNftFooter(true)
      setShowNftFooter(false);
    } else if (pathName === "/vaults") {
      setWithOverlayBg(false);
      setShowNftFooter(false);
    } else if (pathName.includes("/nft")) {
      setBackgoundVault(false);
      setShowNftFooter(true);
    }
  }, [pathName]);
  return (
    <div
      className={`${
        showOverlay
          ? "h-100vh overflow-hidden"
          : backgoundVault
          ? "w-100 h-100 bg-cover bg-attachment-fixed max-h-xxxl-110vh max-h-xxl-125vh"
          : ""
      } `}
      style={{
        backgroundImage: `url(${
          backgoundVault
            ? withOverlayBg
              ? VaultBackgroundWithOverlay
              : VaultBackground
            : ""
        })`,
      }}
    >
      {children}
      {showNftFooter && <NftFooter />}
    </div>
  );
};
