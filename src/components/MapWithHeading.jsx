import React from "react";

const MapWithHeading = () => {
  return (
    <>
      <div className="bg-f5fff7 py-4 py-sm-5 mt-5">
        <div className="container my-15px mx-auto w-75">
          <div className="row">
            <div className="col-12 col-xl-6">
              <div className="d-flex flex-column about-please-heading">
                <h2>About Fargo</h2>
                <p>
                  Fargo is the largest city in the state of North 
                  Dakota, the 4th fastest growing state in the country. According to a recent report by Attom, home renovations in Fargo offer
                  a staggering 187.5% ROI, the second highest in the country. This investment includes a $10,000 renovation budget which
                   is expected to increase the value of the property by $20,000 in addition to standard annual appreciation rates.
                </p>
                <p>
                Amazon recently opened a 
                  1.1 million Square foot facility in the city, creating thousands of new jobs. The 
                  Fargo area is projected to grow by 50% in the next 25 years, ensuring a high demand for 
                  housing for years to come.
                </p>
                <p>
                  Home to the largest university in the state, the Fargo-Moorhead area presents 
                  a favorable rental market for accomodating students. This property is located 
                  just blocks away from the university and a public park, making it an attractive option 
                  for college students or families.
                </p>
              </div>
            </div>
            <div className="col-12 col-xl-6 mt-3 mt-xl-0">
              <div className="w-100">
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.318316049028!2d75.71860201415906!3d29.155290666981273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391233d0d797efb7%3A0x90a59576018cca5f!2sRadial%20Code!5e0!3m2!1sen!2sin!4v1630467922828!5m2!1sen!2sin"
                  width="100%"
                  height="444"
                  allowFullScreen=""
                  loading="lazy"
                /> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2726.6162512124806!2d-96.7940356843942!3d46.89059757914375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x52c8c97bf848a8bb%3A0xb810002b6743edf2!2s817%2012th%20Ave%20N%2C%20Fargo%2C%20ND%2058102!5e0!3m2!1sen!2sus!4v1632424552288!5m2!1sen!2sus" width="100%" height="444"  allowFullScreen="" loading="lazy"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapWithHeading;
