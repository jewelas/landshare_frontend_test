import React, { useEffect } from "react";
import LandingPageCards from "./LandingPageCards";
import FullPageLoading from "../common/FullPageLoading";
import LandingPropertySlider from "./LandingPropertySlider";
import { useVaultBgProvider } from "../../contexts/VaultBgProvider";

const LandingPage = () => {
  const {
    setBackgoundVault,
    setWithOverlayBg,
    isFullPageLoading,
    setFullPageLoading,
  } = useVaultBgProvider();

  useEffect(() => {
    setBackgoundVault(true);
    setWithOverlayBg(true);
  }, [setBackgoundVault]);

  useEffect(() => {
    if (isFullPageLoading) {
      setTimeout(() => {
        setFullPageLoading(false);
      }, 500);
    }
  }, [isFullPageLoading]);

  return (
    <>
      {isFullPageLoading ? (
        <FullPageLoading />
      ) : (
        <>
          <LandingPageCards />
          <LandingPropertySlider />
        </>
      )}
    </>
  );
};

export default LandingPage;
