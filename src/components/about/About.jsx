import React from "react";
import "./About.css";
import Chip from "./Chips";
import PropertyCarousell from "./PropertyCarousell";
import { Container, Row, Col } from "react-bootstrap";

const Header = () => {
  return (
    <div className="mt-5">
      <Container className="my-15px w-80 mx-auto">
        <Row>
          <Col sm={12} md={12} lg={6}>
            <PropertyCarousell />
          </Col>
          <Col sm={12} md={12} lg={6}>
            <div className="header-name">
              <span className="hero-heading cl-000000">North Dakota</span>
            </div>
            <div className="">
              <span className="fs-18  fw-500 cl-656565">USA</span>
            </div>

            <Row>
              <Col className="col-12 mt-3">
                <Chip>6 bedrooms</Chip>
                <Chip>3 bath</Chip>
                <Chip>2900 sqft</Chip>
                <Chip>Built in 1970's</Chip>
              </Col>
            </Row>

            <div className=" property-content fs-16 fw-400 cl-656565  mt-4">
              A spacious 3-story house including 6 bedrooms, 3 bathrooms, 2
              stall garage, and more than 2,900 sqft of livable area. This
              property features a newly remodeled kitchen with granite
              countertops, new stainless steel appliances, and plenty of natural
              lighting. The basement has been renovated to include a large
              family room, 2 bedrooms, and a private bath. The main level offers
              access to a large yard with privacy fencing including a fully
              furnished patio complete with fireplace located directly off the
              dining room. With these fresh renovations, new paint and flooring,
              there is nothing not to love about this property.
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
