import { useState } from "react";
import { Carousel } from "react-bootstrap";
import Front from "../../assets/img/base-images/front_of_house.jpg";
import Backyard from "../../assets/img/base-images/backyard.jpg";
import Basement from "../../assets/img/base-images/basement_old.jpeg"; 
import Kitchen from "../../assets/img/base-images/kitchen.jpg";
import DiningRoom from "../../assets/img/base-images/diningroom.jpeg";
import "./About.css";

export default function PropertyCarousell({ classes }) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      interval={null}
      activeIndex={index}
      onSelect={handleSelect}
      className={`${classes} property-about-carousell`}
    >
      <Carousel.Item>
        <img
          alt=""
          className="rounded-10"
          src={Front}
          style={{ width: "100%" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          alt=""
          className="rounded-10"
          src={Backyard}
          style={{ width: "100%" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          alt=""
          className="rounded-10"
          src={Kitchen}
          style={{ width: "100%" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          alt=""
          className="rounded-10"
          src={Basement}
          style={{ width: "100%" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          alt=""
          className="rounded-10"
          src={DiningRoom}
          style={{ width: "100%" }}
        />
      </Carousel.Item>
    </Carousel>
  );
}
