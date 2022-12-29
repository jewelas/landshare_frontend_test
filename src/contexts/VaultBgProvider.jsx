import { useState, useContext, createContext } from "react";

const VaultBgProviderContext = createContext();

export function useVaultBgProvider() {
  return useContext(VaultBgProviderContext);
}

export default function VaultBgProvider({ children }) {
  const [backgoundVault, setBackgoundVault] = useState(false);
  const [isFooterShow, setFooterShow] = useState(false);
  const [withOverlayBg, setWithOverlayBg] = useState(false);
  const [isFullPageLoading, setFullPageLoading] = useState(true);
  const [isVaultPageLoading, setVaultPageLoading] = useState(true);

  const value = {
    backgoundVault,
    setBackgoundVault,
    isFooterShow,
    setFooterShow,
    withOverlayBg,
    setWithOverlayBg,
    isFullPageLoading,
    setFullPageLoading,
    setVaultPageLoading,
    isVaultPageLoading,
  };

  return (
    <VaultBgProviderContext.Provider value={value}>
      {children}
    </VaultBgProviderContext.Provider>
  );
}
