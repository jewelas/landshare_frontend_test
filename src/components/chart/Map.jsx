import React from "react";

const Map = () => {
  return (
    <>
      <div className="container w-80">
        <div className="row">
          <div className="col">
            <p className="location mt-5 pt-lg-3">Location</p>

            <div
              className="br-20 my-4 i-frame-border-radius"
              style={{ width: "100%" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3349.576232905537!2d-96.7952172253926!3d46.89089576799865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52c8c97bf848a8bb%3A0xb810002b6743edf2!2s817%2012th%20Ave%20N%2C%20Fargo%2C%20ND%2058102!5e0!3m2!1sen!2sus!4v1632161116521!5m2!1sen!2sus"
                width="100%"
                height="450"
                allowFullScreen=""
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
