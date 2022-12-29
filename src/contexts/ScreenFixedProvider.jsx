import { useState, useContext, createContext } from "react";

const ScreenFixedProviderContext = createContext();

export function useScreenFixedProvider() {
  return useContext(ScreenFixedProviderContext);
}

export default function ScreenFixedProvider({ children }) {
  const [walletAddress, setWalletAddress] = useState();
  const [showNftFooter, setShowNftFooter] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isNftRoute, setNftRoute] = useState(false);

  const value = {
    showOverlay,
    setShowOverlay,
    isNftRoute,
    setNftRoute,
    showNftFooter,
    setShowNftFooter,
    setWalletAddress,
    walletAddress,
  };

  return (
    <ScreenFixedProviderContext.Provider value={value}>
      {children}
    </ScreenFixedProviderContext.Provider>
  );
}
