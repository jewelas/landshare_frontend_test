import React from "react";
import Logo from "../assets/img/icons/landshare-icon.svg";
import Landshare from "../assets/img/icons/landshare-text.svg";

const WhiteFooter = () => {
  return (
    <>
      <div className="bg-white py-4">
        <div className="container mx-auto w-75">
          <div className="row justify-content-between">
            <div className="col-12 col-lg-3">
              <ul className="list-unstyled text-center text-md-start ">
                <li className="py-3">
                  <img src={Logo} alt="Logo" />
                </li>
                <li className="pb-3">
                  <img src={Landshare} alt="" />
                </li>
                <li className="d-flex justify-content-center justify-content-md-start footer-social-link-hover">
                  <span>
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="14.0475"
                        cy="14.0475"
                        r="14.0475"
                        fill="#5D5D5D"
                      />
                      <path
                        d="M19.3715 19.3716C19.3715 19.834 19.2053 20.2307 18.873 20.5605C18.5407 20.8909 18.1425 21.0559 17.6773 21.0559H14.328C12.9326 21.0559 11.7401 20.5637 10.7499 19.5783C9.75936 18.593 9.26462 17.4069 9.26462 16.0184V9.26598C9.26462 8.79014 9.42957 8.39047 9.75936 8.06622C10.0892 7.74243 10.492 7.58008 10.9675 7.58008C11.4292 7.58008 11.8259 7.74547 12.1552 8.07587C12.4856 8.40592 12.651 8.80192 12.651 9.26481V11.7098H17.4195C17.8524 11.7098 18.2233 11.863 18.5327 12.1695C18.8418 12.4756 18.996 12.8429 18.996 13.2718C18.996 13.6999 18.8418 14.0679 18.5338 14.3742C18.2258 14.68 17.8556 14.8335 17.4245 14.8335H12.651V16.0169C12.651 16.481 12.8133 16.8751 13.1394 17.2003C13.4653 17.5246 13.8609 17.6869 14.3263 17.6869H17.6766C18.1415 17.6869 18.5407 17.8525 18.873 18.1827C19.2053 18.5131 19.3714 18.9094 19.3714 19.3716"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="mx-2">
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="14.5"
                        cy="14.0475"
                        r="14.0475"
                        fill="#5D5D5D"
                      />
                      <path
                        d="M20.5655 9.70851L21.6411 8.65304V8.42188H17.9159L15.2611 15.2027L12.2414 8.42188H8.33549V8.65304L9.59182 10.2049C9.71465 10.3196 9.77782 10.488 9.76203 10.6565V16.7546C9.80063 16.975 9.7322 17.199 9.58129 17.3585L8.16528 19.12V19.3476H12.1764V19.1164L10.7622 17.3603C10.6864 17.2817 10.6294 17.1863 10.5956 17.0816C10.5618 16.9768 10.5522 16.8655 10.5674 16.7564V11.4808L14.089 19.3511H14.4979L17.5264 11.4808V17.7509C17.5264 17.9158 17.5264 17.9498 17.4211 18.0591L16.3315 19.1397V19.3708H21.6165V19.1397L20.5655 18.0842C20.4742 18.0125 20.4269 17.8925 20.4462 17.776V10.0167C20.4371 9.95915 20.4434 9.90013 20.4644 9.84588C20.4854 9.79164 20.5203 9.74419 20.5655 9.70851Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span>
                    <svg
                      width="29"
                      height="29"
                      viewBox="0 0 29 29"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="14.9525"
                        cy="14.0475"
                        r="14.0475"
                        fill="#5D5D5D"
                      />
                      <path
                        d="M19.5592 8.70312H9.73305C9.17461 8.70312 8.63905 8.92496 8.24417 9.31984C7.8493 9.71471 7.62746 10.2503 7.62746 10.8087V17.8274C7.62746 18.3858 7.8493 18.9214 8.24417 19.3162C8.63905 19.7111 9.17461 19.933 9.73305 19.933H19.5592C20.1176 19.933 20.6532 19.7111 21.048 19.3162C21.4429 18.9214 21.6647 18.3858 21.6647 17.8274V10.8087C21.6647 10.2503 21.4429 9.71471 21.048 9.31984C20.6532 8.92496 20.1176 8.70312 19.5592 8.70312ZM19.5592 10.1069L14.997 13.2442C14.8903 13.3058 14.7693 13.3382 14.6461 13.3382C14.5229 13.3382 14.4019 13.3058 14.2952 13.2442L9.73305 10.1069H19.5592Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="mx-2">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 0C6.26795 0 0 6.26795 0 14C0 21.732 6.26795 28 14 28C21.732 28 28 21.732 28 14C28 6.26795 21.732 0 14 0Z"
                        fill="#5D5D5D"
                      />
                      <path
                        d="M20.8122 8.0532L18.3116 20.6607C18.3116 20.6607 17.9619 21.5351 17.0002 21.1154L11.2298 16.6914L9.1315 15.6773L5.59935 14.4882C5.59935 14.4882 5.05729 14.2959 5.00479 13.8762C4.95229 13.4565 5.61685 13.2293 5.61685 13.2293L19.658 7.72114C19.658 7.72114 20.8121 7.21407 20.8121 8.05342"
                        fill="white"
                      />
                      <path
                        d="M10.7863 20.5189C10.7863 20.5189 10.6179 20.5031 10.4079 19.8385C10.1982 19.1741 9.1315 15.6769 9.1315 15.6769L17.6122 10.2913C17.6122 10.2913 18.1019 9.99402 18.0844 10.2913C18.0844 10.2913 18.1718 10.3438 17.9094 10.5886C17.6472 10.8335 11.2474 16.5863 11.2474 16.5863"
                        fill="#DFDFDF"
                      />
                      <path
                        d="M13.4423 18.387L11.16 20.4679C11.16 20.4679 10.9815 20.6033 10.7863 20.5184L11.2234 16.6533"
                        fill="#919191"
                      />
                    </svg>
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-lg-9 col-12 mt-auto mx-auto align-items-center">
              <p className="col-12  my-auto mb-1" style={{ fontSize: "9px" }}>
              This site is operated by Landshare LLC, which is not a registered broker-dealer 
              or investment advisor. Landshare does not give investment advice, endorsement, 
              analysis or recommendations with respect to any securities. Nothing on this 
              website should be construed as an offer to sell, solicitation of an offer to 
              buy or a recommendation for any security by Landshare LLC or any third party. 
              You are solely responsible for determining whether any investment, investment strategy, 
              security or related transaction is appropriate for you based on your personal investment 
              objectives, financial circumstances and risk tolerance. You should consult with licensed 
              legal professionals and investment advisors for any legal, tax, insurance or investment advice. 
              All securities listed here are being offered by, and all information included on this site is the 
              responsibility of, the applicable issuer of such securities. Landshare LLC does not guarantee 
              any investment performance, outcome or return of capital for any investment opportunity posted 
              on this site.
              </p>

              <p className="fs-14 text-858585 max-w-348 text-center mx-auto pt-3">
                ©2021 Landshare LLC{" "}
              </p>
            </div>
            <div className="col-12 col-md-4  text-center d-flex justify-content-center align-items-center my-2 my-sm-0"></div>
            <div className="col-12 col-md-4 d-flex justify-content-start  justify-content-sm-end  align-items-start align-items-sm-end "></div>
          </div>
        </div>
      </div>
      {/* GREEN FOOTER  */}
    </>
  );
};

export default WhiteFooter;
