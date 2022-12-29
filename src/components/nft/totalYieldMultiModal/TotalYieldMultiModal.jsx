import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import sadEmoji from "../../../assets/img/icons/sad_emoji.png";
import gameSetting from "../../../contexts/game/setting.json";
import { validateFortDependency } from "../../../contexts/game/validator";
import { NextIconYieldIcon, SlickPrevIcon } from "../../common/Icons";
import { Modal } from "../../common/modal";
import { data } from "../../nft/UpgradeBoxData";
import "./TotalYieldMultiModal.css";

const sortFunction = (addon1, addon2) => {
  return addon1.sortableId - addon2.sortableId;
};

String.prototype.stringToSlug = function () {
  var str = this; // <-- added this statement

  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  return str;
};

const TotalYieldMultiModalComponent = ({
  hasAddon,
  multiplier,
  modalShow,
  setModalShow,
  lastFortTime,
  firepitRemainDays,
  gardenexpiretime,
  lastFertilizedGardenTime,
  addonData
}) => {
  if (addonData == undefined || addonData == {} || addonData == null || addonData.length == 0) return null
  const { addon } = gameSetting;
  let addonMultiplier = addonData[1]
  const showAddon = [...addon].sort(sortFunction);
  const showData = [...data].sort(sortFunction);
  const hasCount = hasAddon[2] ?(Number(gardenexpiretime)*1000>Date.now())?hasAddon.filter((addonItem) => addonItem).length:hasAddon.filter((addonItem) => addonItem).length-1:hasAddon.filter((addonItem) => addonItem).length;
  let showAddonItems = [];
  hasAddon.map((addon, index) => {
    if (addon) {
      const showItem = showData.filter(
        (item) => item.sortableId == index
      )[0]
      if (
        showItem.title == "Steel Siding" ||
        showItem.title == "Cellar" ||
        showItem.title == "Finished Basement"
      ) {
        if (!(hasAddon[index] && !validateFortDependency(lastFortTime, index)))
          showAddonItems.push(showItem);
      } else if (showItem.title == "Garden") {
        if (Number(gardenexpiretime) * 1000 > Date.now())
          showAddonItems.push(showItem);
          if (Number(lastFertilizedGardenTime) * 1000 > Date.now()) {
            addonMultiplier = [...addonMultiplier.slice(0, 1), addonData[4], ...addonMultiplier.slice(3)];
          }
          else{
            addonMultiplier = [...addonMultiplier.slice(0, 1), addonData[1][2], ...addonMultiplier.slice(3)];
          } 
      } else if (showItem.title == "Firepit") {
        if (firepitRemainDays > 0)
          showAddonItems.push(showItem);
      } else {
        showAddonItems.push(showItem);
      }
    }
  })
  const slider = useRef();
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: false,
    dotsClass: "adson-slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Modal
      modalShow={modalShow}
      setModalShow={setModalShow}
      modalOptions={{
        centered: true,
        size: "lg",
      }}
    >
      <Modal.Header>
        <div className="d-flex w-100 px-3 py-4 align-items-center justify-content-between">
          <h3 className="m-0 fs-sm text-black-800">Total Annual Yields </h3>
          <h1 className="m-0 fs-xxl fw-600 text-green">x{multiplier} LAND</h1>
        </div>
        <div className="divider light-line"></div>
      </Modal.Header>
      <Modal.Body>
        <div className="position-relative">
          {hasCount > 4 ? (
            <button
              onClick={() => slider?.current?.slickPrev()}
              className="prev top-43 next-prev bg-transparent border-0"
            >
              <SlickPrevIcon />
            </button>
          ) : null}
          {hasCount > 4 ? (
            <button
              onClick={() => slider?.current?.slickNext()}
              className="next top-43 next-prev bg-transparent border-0"
            >
              <NextIconYieldIcon />
            </button>
          ) : null}

          {showAddonItems.length > 0 ? (
            showAddonItems.length > 4 ? (
              <div className="px-md-2 py-5 px-2">
                <div className="mx-4 overflow-hidden">
                  <Slider ref={slider} {...settings}>
                    {showAddonItems.map((showAddonItem, index) => (
                      <div
                        className="d-flex flex-column px-2 addon-detail-show"
                        key={`addon-detail-show-${index}`}
                      >
                        <div className="addon-image d-flex align-items-center justify-content-center">
                          <img src={showAddonItem.imgUrl} alt={showAddonItem.title} />
                        </div>
                        <div className="fw-600 mt-1">{showAddonItem.title}</div>
                        <div className="mt-2 fw-600 text-green hasaddon-mulipler">
                          x
                          {Number(addonMultiplier[index]) / 100}{" "}
                          LAND / Year
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            ) : (
              <div className="px-md-2 py-5 px-2">
                <div className="mx-4 overflow-hidden none-slide-addon-detail-show">
                  {showAddonItems.map((showAddonItem, index) => (
                    <div
                      className="d-flex flex-column px-2 addon-detail-show"
                      key={`addon-detail-show-${index}`}
                    >
                      <div className="addon-image d-flex align-items-center justify-content-center">
                        <img src={showAddonItem.imgUrl} alt={showAddonItem.title} />
                      </div>
                      <div className="fw-600 mt-1">{showAddonItem.title}</div>
                      <div className="mt-2 fw-600 text-green hasaddon-mulipler">
                        x
                        {Number(addonMultiplier[index]) / 100}{" "}
                        LAND / Year
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div
              className="d-flex flex-column w-100 h-100"
              style={{ minHeight: "290px" }}
            >
              <img
                src={sadEmoji}
                alt="Sad Emoji"
                className="position-absolute"
                style={{
                  top: "35%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              />
              <span
                className="fs-16 fw-700 text-black position-absolute"
                style={{
                  bottom: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                No Yield Upgrades
              </span>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export const TotalYieldMultiModal = TotalYieldMultiModalComponent;
