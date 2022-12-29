import React from "react";
import { Accordion, Card, Button } from "react-bootstrap";
import { MonthlyExpenseIcon } from "../Icons";

const TableAccordian = () => {
  return (
    <>
      <Accordion defaultActiveKey>
        <Accordion.Toggle eventKey="1">
          <div className="br-bottom-1 ">
            <p className="fs-15 fs-sm-14  d-flex justify-content-between mb-0">
              <span className="mb-3 mt-2 fw-600">
                Monthly Expenses{" "}
                <span className="ms-2">
                  <MonthlyExpenseIcon />
                </span>
              </span>
              <span className="mb-3 mt-2 fw-400">- $267.73</span>
            </p>
            <Accordion.Collapse eventKey="1">
              <div className="mb-2">
                <span className="fs-14 fs-sm-13 d-flex justify-content-between">
                  <span className="mb-3 fw-300">Property Taxes</span>
                  <span className="mb-3 fw-100">-$191.75</span>
                </span>
                <span className="fs-14 fs-sm-13  d-flex justify-content-between ">
                  <span className="mb-3 fw-300">Insurance</span>
                  <span className="mb-3 fw-100">-$75.98</span>
                </span>
              </div>
            </Accordion.Collapse>
          </div>
        </Accordion.Toggle>
      </Accordion>
    </>
  );
};

export default TableAccordian;
