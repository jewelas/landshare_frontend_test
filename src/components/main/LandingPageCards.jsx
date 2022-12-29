import React from "react";
import {
  VaultIcon,
  VaultWithShadowIcon,
  TokenizedIcon,
  TokenizedShadowIcon,
  DashboardIcon,
  DashboardShadowIcon,
  GovernanceIcon,
  GovernanceWithShadowIcon,
} from "../common/Icons";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

const LandingPageCards = ({ history }) => {
  return (
    <>
      <div className="container custom-container px-3">
        <div className="mw-1200 mx-auto">
          <div className="row justify-content-evenly">
            <div className="col-md-6 col-12 pt-3">
              <div
                className="landshare-card mt-xxl-5 mt-4"
                onClick={() => history.push("/vaults")}
              >
                <div className="pe-sm-4 me-sm-2">
                  <VaultIcon />
                </div>
                <div className="d-flex justify-content-center flex-column mt-4">
                  <h2 className="heading mb-2">Vaults</h2>
                  <p className="mr-4 mb-0 para-landshare ">
                    Earn rewards for staking LAND, LAND-BNB LP, or stablecoins
                    in our DeFi vaults
                  </p>
                  <div className="shadow-icon">
                    <VaultWithShadowIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 pt-3">
              <div
                className="landshare-card mt-xxl-5 mt-4"
                onClick={() => history.push("/property-details")}
              >
                <div className="pe-sm-4 me-sm-2">
                  <TokenizedIcon />
                </div>
                <div className="d-flex justify-content-center flex-column mt-4">
                  <h2 className="heading mb-2">Tokenized Assets</h2>
                  <p className="mb-0 para-landshare pe-2">
                    View current properties for sale including pictures,
                    financials, and return estimates
                  </p>
                  <div className="shadow-icon">
                    <TokenizedShadowIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12 pt-3 text-decoration-none-a">
              <Link
                to={{
                  pathname: "https://dashboard.landshare.io/auth/login",
                }}
                target="_blank"
              >
                <div className="landshare-card mt-xxl-5 mt-4">
                  <div className="pe-sm-4 me-sm-2">
                    <DashboardIcon />
                  </div>
                  <div className="d-flex justify-content-center flex-column mt-4">
                    <h2 className="heading mb-2">Dashboard</h2>
                    <p className="mb-0 para-landshare pe-1">
                      KYC, purchase, and track your Asset Tokens in one
                      conveinient location
                    </p>
                    <div className="shadow-icon">
                      <DashboardShadowIcon />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-6 col-12 pt-3 text-decoration-none-a">
              <Link
                to={{
                  pathname: "https://vote.landshare.io",
                }}
                target="_blank"
              >
                <div className="landshare-card mt-xxl-5 mt-4">
                  <div className="pe-sm-4 me-sm-2">
                    <GovernanceIcon />
                  </div>
                  <div className="d-flex justify-content-center flex-column mt-4">
                    <h2 className="heading mb-2">Governance</h2>
                    <p className="mb-0 para-landshare">
                      View current proposals brought forth by Landshare’s
                      Governance Protocol
                    </p>
                    <div className="shadow-icon">
                      <GovernanceWithShadowIcon />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(LandingPageCards);
