import React, { useState } from "react";
import { InfoIcon } from "../../common/Icons";
import "./ResourceCard.css";
import { CustomModal } from "../../common/modal/Modal";

export const ResourceCard = ({
  children,
  title,
  subTitle,
  imgSrc,
  cost,
  background,
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="d-flex  flex-column cards-hover-animation resource-card">
      <div
        className="d-flex flex-column resource-header"
        style={{ background: background }}
      >
        <div className="fs-16 fw-600 text-white resource-card-tile py-2">
          {title}
        </div>
        <div className="d-flex flex-column align-itmes-center resource-card-body position-relative h-100">
          <span className="fs-14 fw-600 text-white text-center mt-2">
            {subTitle}
          </span>
          <img src={imgSrc} />
          <div className={`d-flex w-100 resource-cost px-2 position-absolute ${title=="Gather Lumber" ? 'justify-content-between' : 'justify-content-center'}`}>
            {title=="Gather Lumber" && (
              <div style={{ width: 20 }}></div>
            )}
            <div>
              <span className="fs-14 fw-600 me-1">{cost.value}</span>
              <span className="fs-12 fw-600">{cost.description}</span>
            </div>
            {title=="Gather Lumber" && (
              <div className="info-icon" onClick={() => setOpenModal(true)}>
                <InfoIcon />
              </div>
            )}
            
          </div>
        </div>
      </div>
      {children}
      <CustomModal
        modalOptions={{
          centered: true,
          size: "lg",
        }}
        modalShow={openModal}
        setModalShow={setOpenModal}
      >
        <CustomModal.Body className="d-flex min-h-100 justify-content-center align-items-center">
          <span className="my-2 mx-3 fs-14 fw-400">{`Gather lumber from nearby woods. Costs 15 power per Lumber and can gather 2 per day, or 3 with the Trees upgrade.`}</span>
        </CustomModal.Body>
      </CustomModal>
    </div>
  );
};
