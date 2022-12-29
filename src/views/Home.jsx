import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AlertModal } from "../components/common/modal";
import PageNotFound from "../components/error/PageNotFound";
import RestrictedCountry from "../components/error/RestrictedCountry";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import LandingPage from "../components/main/LandingPage";
import Main from "../components/main/Main";
import Marketplace from "../components/marketplace/Marketplace";
import NftResource from "../components/nft-resource/NftResource";
import Nft from "../components/nft/Nft";
import NftList from "../components/nftList/NftList";
import { useLandshareFunctions } from "../contexts/LandshareFunctionsProvider";
import { useScreenFixedProvider } from "../contexts/ScreenFixedProvider";
import { useVaultBgProvider } from "../contexts/VaultBgProvider";
import Property from "./Property";
export default function Home() {
  const { isNftRoute, setNftRoute } = useScreenFixedProvider();
  const { backgoundVault, isFooterShow, setFooterShow } = useVaultBgProvider();
  const [countryCode, setCountryCode] = useState("knowhere");
  const [isFullPageLoading, setFullPageLoading] = useState(false);
  const {
    state: { isAlert },
    alertModal,
    setAlertModal,
  } = useLandshareFunctions();

  const pathName = window.location.pathname;
  useEffect(() => {
    if (pathName.includes("nft")) {
      setNftRoute(true);
    }
  }, []);
  useEffect(() => {
    if (pathName === "/" || "/vaults") {
      setFooterShow(true);
    }
  }, [pathName, setFooterShow]);

  // CHECK COUNTRY
  useEffect(() => {
    setFullPageLoading(true);

    axios
      .get(
        "https://ipapi.co/json/?key=BLdyq5q8rDMIu8yQOznED2TOTQA8Ty8A1QEBQyO4B70386de5C"
      )
      .then((response) => {
        console.log(response.data.country_code, "response.data.country_code");
        setCountryCode(response.data.country_code);

        setFullPageLoading(false);
      })
      .catch(() => {
        console.log("error");
        setFullPageLoading(false);
      });
  }, []);

  return (
    <>
      <Router>
        <Header />
        {/* <LeftSocialIcons /> */}

        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/vaults" exact component={Main} />
          <Route path="/nft/list" exact component={NftList} />
          <Route path="/nft/resources" exact component={NftResource} />
          <Route path="/nft/:tokenId" exact component={Nft} />
          <Route path="/marketplace" exact component={Marketplace} />
          <Route
            path="/property-details"
            component={() => (
              <Property
                isFullPageLoading={isFullPageLoading}
                countryCode={countryCode}
              />
            )}
          />
          <Route path="/restricted-country" component={RestrictedCountry} />
          <Route component={PageNotFound} />
        </Switch>
        {backgoundVault && isFooterShow ? (
          pathName === "/property-details" ? (
            ""
          ) : (
            <>
              <Footer />
            </>
          )
        ) : pathName === "/property-details" ? (
          ""
        ) : (
          ""
        )}
      </Router>

      {isAlert ? <Loading /> : ""}
      <AlertModal
        show={alertModal.show}
        type={alertModal.type}
        message={alertModal.message}
        setShow={(show) => setAlertModal((state) => ({ ...state, show }))}
      />
    </>
  );
}
