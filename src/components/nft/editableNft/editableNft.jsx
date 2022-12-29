import React, { useState, useEffect } from "react";
import EditIcon from "../../../assets/img/icons/Edit.png";
import Check from '../../../assets/img/icons/check.jpg';
import Close from '../../../assets/img/icons/close.png';
import './editableNft.css';

export const EditableNft = ({
  className = '',
  defaultValue,
  onChangeValue,
  children,
  target,
  activated
}) => {
  const [editable, setEditable] = useState(false);
  const [showValue, setShowValue] = useState(defaultValue);

  useEffect(() => {
    setShowValue(defaultValue)
  }, [defaultValue]);

  return (
    <>
      {editable ? (
        <div className={`position-relative nft-title-edit-section d-flex mb-3 mb-md-0 ${className}`}>
          <input 
            className="font-semibold" 
            value={showValue}
            onChange={(e) => setShowValue(e.target.value)}
          />
          <span className="position-absolute status-name-section">
            <img 
              src={Check} 
              className="check-mark cursor-pointer" 
              alt="check" 
              onClick={() => {
                setEditable(false);
                onChangeValue(target, showValue);
              }}
            />
            <img 
              src={Close} 
              className="cross-close cursor-pointer" 
              alt="close"
              onClick={() => {
                setShowValue(defaultValue);
                setEditable(false);
              }} 
            />
          </span>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          {children}
          <img 
            className="fix-dim cursor-pointer ms-2" 
            src={EditIcon} 
            alt="" 
            onClick={() => activated ? setEditable(true) : {}}
          />
        </div>
      )}
    </>
  );
}
