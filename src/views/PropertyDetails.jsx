import React, { useEffect } from "react";
import Map from "../components/chart/Map";
import Investment from "../components/property/Investment";
import EstimatedAnnual from "../components/property/EstimatedAnnual";
import ProgressBar from "../components/property/ProgressBar";
import About from "../components/about/About";
import { useVaultBgProvider } from "../contexts/VaultBgProvider";

export default function PropertyDetails() {
  const { setBackgoundVault } = useVaultBgProvider();

  useEffect(() => {
    setBackgoundVault(false);
  }, [setBackgoundVault]);
  return (
    <>
      <About />
      <ProgressBar />
      <Investment />
      <EstimatedAnnual />
      <Map />
    </>
  );
}
