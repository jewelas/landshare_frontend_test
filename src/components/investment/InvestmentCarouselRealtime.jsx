import React from "react";
import InvestmentCarousel from "./InvestmentCarousel";
import { useScreenFixedProvider } from "../../contexts/ScreenFixedProvider";
const InvestmentCarouselRealtime = () => {
  const { walletAddress } = useScreenFixedProvider();
  return (
    <>
      <InvestmentCarousel walletAddress={walletAddress} />
    </>
  );
};

export default InvestmentCarouselRealtime;
