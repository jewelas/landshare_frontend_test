import React from "react";
import { Accordion } from "react-bootstrap";
import { TotalInvestmentIcon } from "../common/Icons";

const InvestmentAccordian = () => {
  return (
    <>
      <div className="table-accordian">
        <Accordion defaultActiveKey>
          <Accordion.Toggle eventKey="1">
            <p className="fs-18 fs-md-xl-18 fs-sm-16 fw-600 mt-1 d-flex justify-content-between br-bottom-1 ">
              <span className="mb-3">
                Total Investment
                <span className="ms-2">
                  <TotalInvestmentIcon />
                </span>
              </span>
              <span className="mb-3">$170,000</span>
            </p>
          </Accordion.Toggle>

          <Accordion.Collapse eventKey="1">
            <div className="mb-2">
              <span className="fs-14 fs-sm-13  d-flex justify-content-between ">
                <span className="mb-3 fw-300">Property</span>
                <span className="mb-3 fw-100">$145,000</span>
              </span>
              <span className="fs-14 fs-sm-13  d-flex justify-content-between ">
                <span className="mb-3 fw-300">Renovation Fund</span>
                <span className="mb-3 fw-100">$10,000</span>
              </span>
              <span className="fs-14 fs-sm-13  d-flex justify-content-between ">
                <span className="mb-3 fw-300">Platform Fee</span>
                <span className="mb-3 fw-100">$7,250</span>
              </span>
              <span className="fs-14 fs-sm-13  d-flex justify-content-between ">
                <span className="mb-3 fw-300">Legal and Administrative</span>
                <span className="mb-3 fw-100">$500</span>
              </span>
              <span className="fs-14 fs-sm-13  d-flex justify-content-between ">
                <span className="mb-3 fw-300">Maintenance Reserve</span>
                <span className="mb-3 fw-100">$7,250</span>
              </span>
            </div>
          </Accordion.Collapse>
        </Accordion>
      </div>
    </>
  );
};

export default InvestmentAccordian;
