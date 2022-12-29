import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Investment.css";
import Front from "../../assets/img/front_of_house.jpg";
import Chart from "../chart/Chart";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";

function Investment() {
  const { state } = useLandshareFunctions();
  const tokenPrice = state.price;
  const landReturn = tokenPrice * 12;
  const totalReturn = landReturn + 13;
  const strLandReturn = landReturn.toString();
  const strTotalReturn = totalReturn.toString();

  return (
    <div className="bg-F5FFF7 mt-5 ">
      <Container className="my-15px w-80 mx-auto">
        <Row>
          <Col sm={12} md={12} lg={6}>
            <div className=" pt-5">
              <div className="fs-28 fw-600 br-b pb-1">Investment Summary</div>
              <div className="investment-summary fs-18 fw-500 mt-4 cl-656565  ">
                <div className="row">
                  <div className="col-sm pb-3">
                    Property Value:
                    <span className="fw-400 px-1">$340,000</span>
                  </div>
                  <div className="col-sm pb-3">
                    Net Rental Value:
                    <span className="fw-400 px-1">$1,724</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm pb-3">
                    Monthly Rental Value:
                    <span className="fw-400 px-1">$2,200</span>
                  </div>
                  <div className="col-sm pb-3">
                    Estimated Appreciation:
                    <span className="fw-400 px-1">2%</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm pb-3">
                    Property Taxes:
                    <span className="fw-400 px-1">$318</span>
                  </div>
                  <div className="col-sm pb-3">
                    Cap Rate:
                    <span className="fw-400 px-1">6%</span>
                  </div>
                </div>
                <div className="pb-3">
                  Homeowners Insurance:
                  <span className="fw-400 px-1">$158</span>
                </div>
              </div>
            </div>
            <div className="estimated-rturn pt-5 mb-5 ">
              <div className="fs-28 fw-600 br-b pb-1">
                Estimated Annual Yields
              </div>
              <div className="estimated-items fs-18 fw-500  pt-3 cl-656565">
                <div className="row">
                  <div className="pb-3 col-sm">
                    Appreciation:
                    <span className="fw-400 px-1">$6,920</span>
                  </div>
                  <div className="pb-3 col-sm">
                    BUSD Return:
                    <span className="fw-400 px-1">13%</span>
                  </div>
                </div>
                <div className="row">
                  <div className="pb-3 col-sm">
                    Rental Value:
                    <span className="fw-400 px-1">$20,689</span>
                  </div>
                  <div className="pb-3 col-sm">
                    LAND Token Return:
                    <span className="fw-400 px-1">
                      {strLandReturn.substr(0, 5)}%
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="pb-3 col-sm">
                    Yield Bonus:
                    <span className="fw-400 px-1">$17,300</span>
                  </div>
                  <div className="pb-3 col-sm">
                    Total Vault ROI:
                    <span className="fw-400 px-1">
                      {strTotalReturn.substr(0, 5)}%
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="pb-3 col-sm">
                    Total Value:
                    <span className="fw-400 px-1">$44,909</span>
                  </div>
                  <br></br>
                  <br></br>
                  <div className="pb-1">
                    <b style={{ fontSize: "13px" }}>Note:</b>
                    <span className="fw-400 px-1" style={{ fontSize: "13px" }}>
                      The Property Vault does not offer ownership or investment
                      in assets. Property data is estimated and used only as a
                      reference to determine staking rewards.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="graph">
              <Chart />
            </div>
          </Col>

          <Col
            className="full-card d-flex justify-content-flex-end pt-4"
            sm={12}
            md={6}
            lg={6}
          >
            <div className="property-card mt-5  ">
              <div className="">
                <img src={Front} style={{ width: "100%" }} />
                <div className="fs-28 fw-600 px-4 pt-3 ">North Dakota</div>
                <div className="fs-18 fw-500 cl-656565 px-4 pt-2 pb-3 ">
                  USA
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Investment;
