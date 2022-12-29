import React from "react";
import "./NFTGuide.css";
// import guide from '../../../assets/img/guide/guide.png'
import guide from '../../../assets/img/guide/guide_result.png'
import guide1 from '../../../assets/img/guide/guide1.png'
import guide2 from '../../../assets/img/guide/guide2.png'
import guide3 from '../../../assets/img/guide/guide3.png'
import guide4 from '../../../assets/img/guide/guide4.png'

export const NFTGuide = () => {
    return (
        <div className="guide">
            <div className="guide_header">How can I get Landshare Real Estate NFT</div>
            <div className="guide_content">
                <div className="guide_row">
                    <div className="guide_num">
                        <div className="guide_number">01</div>
                    </div>
                    <div className="guide_image">
                        <img className="guide_img" src={guide1} alt="guide" />
                    </div>
                    <div className="guide_title">
                        Register your account
                    </div>
                    <div className="guide_description">
                        <div>Sign up for an account on the dashboard at dashboard.</div>
                        <div>landshare.io</div>
                    </div>
                </div>
                <div className="guide_row">
                    <div className="guide_title">
                        Verify your identity
                    </div>
                    <div className="guide_description">
                        <div>Provide your name, address, and photo ID and get approved within 24 hours</div>
                    </div>
                    <div className="guide_image">
                        <img className="guide_img" src={guide2} alt="guide" />
                    </div>
                    <div className="guide_num">
                        <div className="guide_number">02</div>
                    </div>
                </div>
                <div className="guide_row">
                    <div className="guide_num">
                        <div className="guide_number">03</div>
                    </div>
                    <div className="guide_image">
                        <img className="guide_img" src={guide3} alt="guide" />
                    </div>
                    <div className="guide_title">
                        View current offerings
                    </div>
                    <div className="guide_description">
                        <div>View current properties offerings at app.landshare.io/property-details</div>
                    </div>
                </div>
                <div className="guide_row">
                    <div className="guide_title">
                        Make your investment
                    </div>
                    <div className="guide_description">
                        <div>Connect your crypto wallet and make an investment in a matter of minutes</div>
                    </div>
                    <div className="guide_image">
                        <img className="guide_img" src={guide4} alt="guide" />
                    </div>
                    <div className="guide_num">
                        <div className="guide_number">04</div>
                    </div>
                </div>
                <div className="guide_row guid_row_center">
                    <div className="guide_image">
                        <img className="guide_img" src={guide} alt="guide" />
                    </div>
                    <div className="guide_title">
                        Receive NFT
                    </div>
                    <div className="guide_description">
                        <div>Receive NFT within 48 hours of making your investment.</div>
                        <div>Minimum: $250 USD</div>
                    </div>
                </div>
            </div>

      </div>
    
  );
};
