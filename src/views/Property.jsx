import React, { useEffect } from "react";
import InvestementTable from "../components/investment/InvestementTable";
import InvestmentCarouselRealtime from "../components/investment/InvestmentCarouselRealtime";
import TotalInvestMent from "../components/investment/TotalInvestMent";
import MapWithHeading from "../components/MapWithHeading";
import WhiteFooter from "../components/WhiteFooter";
import { useVaultBgProvider } from "../contexts/VaultBgProvider";
import FAQ from "../components/FAQ";
import NotAvailable from "./NotAvailable";
import FullPageLoading from "../components/common/FullPageLoading";

const Property = ({ countryCode, isFullPageLoading }) => {
  const { setBackgoundVault, backgoundVault } = useVaultBgProvider();
  // FOR REMOVE BACKGROUND IMAGE IN DIFFERENT ROUTES
  useEffect(() => {
    setBackgoundVault(false);
  }, []);

  return (
    <>
      {isFullPageLoading ? (
        <FullPageLoading />
      ) : countryCode === "US" ? (
        <NotAvailable />
      ) : (
        <div className="">
          <InvestmentCarouselRealtime />
          <TotalInvestMent />
          <InvestementTable />
          <FAQ />
          <MapWithHeading />
          <WhiteFooter />
        </div>
      )}
    </>
  );
};

export default Property;
