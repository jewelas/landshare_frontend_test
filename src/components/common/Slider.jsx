import React from "react";
import Carousel from "react-bootstrap/Carousel";
import carouselimg from "../../assets/img/carousel-img.png";
function Slider() {
  return (
    <div className="h-100">
      <Carousel className={`${"landshare-carousel"}`} interval={null}>
        <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src={carouselimg}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src={carouselimg}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 h-100"
            src={carouselimg}
            alt="Second slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
export default Slider;