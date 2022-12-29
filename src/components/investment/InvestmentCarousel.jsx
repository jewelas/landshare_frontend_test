import React, { useState } from "react";
import Front from "../../assets/img/base-images/front.jpg";
import LivingRoom from "../../assets/img/base-images/livingroom.jpeg";
import Kitchen from "../../assets/img/base-images/kitchen.jpeg";
import Basement from "../../assets/img/base-images/basement.jpeg";
import Bedroom from "../../assets/img/base-images/bedroom.jpeg";
import Bedroom2 from "../../assets/img/base-images/bedroom2.jpeg";
import DownstairsBedroom from "../../assets/img/base-images/downstairsbedroom.jpeg";
import DownstairsBedroom2 from "../../assets/img/base-images/downstairsbedroom2.jpeg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import AutoCompounding from "../common/AutoCompounding";
import { Modal } from "react-bootstrap";
const InvestmentCarousel = React.memo(() => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="container py-3 py-sm-5 my-2">
        <div className="row mt-3 mt-sm-4">
          <div className="col-xl-6 ">
            <div className="h-100">
              <div className="investment-carousel">
                <Carousel>
                  <div>
                    <img className="carousel-img" src={Front} />
                  </div>
                  <div>
                    <img className="carousel-img" src={LivingRoom} />
                  </div>
                  <div>
                    <img className="carousel-img" src={Kitchen} />
                  </div>
                  <div>
                    <img className="carousel-img" src={Bedroom} />
                  </div>
                  <div>
                    <img className="carousel-img" src={Bedroom2} />
                  </div>

                  <div>
                    <img className="carousel-img" src={Basement} />
                  </div>
                  <div>
                    <img className="carousel-img" src={DownstairsBedroom} />
                  </div>
                  <div>
                    <img className="carousel-img" src={DownstairsBedroom2} />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="text-padding pt-xl-0 pt-sm-4  ps-3">
              <span className="home-text">Home </span>
              <span className="first-home-line px-2">
                817 12th Ave N Fargo, ND 58102
              </span>
              <h1 className="carousel-heading pt-2 fs-sm-20">
                817 12th Ave N Fargo, ND 58102
              </h1>

              {/* <p className="summary-text  pt-sm-1 pt-xxl-2">
                Property Summary
              </p> */}
              <p className="carousel-para-text">
                Updated but retaining its old-world charm, this property features a fenced-in 
                backyard, garage, finished basement, hardwood floors, and new siding. 
                Located just blocks away from one of the largest universities in the area, 
                this 3 bedroom 2 bathroom single family home presents an attractive rental 
                for the thousands of students in the area.
              </p>

              <p className="carousel-para-text">
                The Fargo area has a massive demand for renovated properties. 
                According a recent ATTOM report it is the second most profitable 
                flipping market in the country with an average ROI of 187.5%. 
                To take advantage of this, the investment includes a renovation 
                budget to increase the value of the property.
              </p>

              <div className="d-flex flex-wrap my-5 align-items-center">
                <AutoCompounding handleShow={handleShow} />
              </div>
              <Modal
                className="autocompount-modal"
                centered
                show={show}
                onHide={handleClose}
              >
                <div className="py-4 px-3">
                  <p className="mb-0 text-center">
                    Turn on auto-compounding to automatically convert your
                    rental yields into additional Asset Tokens. Auto-compounding
                    offers a 5% bonus on your rental yields. For example, if
                    rent due is $100, you will receive $105 in Asset Tokens.
                  </p>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default InvestmentCarousel;
