import React, { Component } from "react";
import Faq from "react-faq-component";

const data = {
  title: "FAQ",
  rows: [
    {
      title: "What is asset tokenization?",
      content:
        "Asset tokenization is the process by which the ownership of a real estate asset is represented by tokens.",
    },
    {
      title: "How does asset tokenization work?",
      content:
        "The real estate asset is held by a company whose ownership shares are represented by tokens on the blockchain. By holding these tokens, you become a co-owner of company and by extension the asset itself.",
    },
    {
      title: "How do I buy asset tokens?",
      content:
        "Press the View on Dashboard button above to use our streamlined Tokenized Asset dashboard. The dashboard allows you to KYC and swap for Asset Token all in one place.",
    },
    {
      title: "Are asset tokens considered securities?",
      content:
        "Yes, asset tokens are considered securities. KYC is required to purchase them and certain geographic restrictions apply.",
    },
    {
      title: "How are rental yields distributed?",
      content:
        "Net rental yields are split among all token holders and distributed to their BSC wallet each month in the form of BUSD.",
    },
    {
      title: "How do I sell my asset tokens?",
      content:
        "Asset tokens can be sold back to the Landshare platform based on the most recent home value appraisal for a 2% fee. Similar to the inital purchase, you will be paid in 90% BUSD and 10% LAND. Keep in mind depleted renovation funds are not reflected in the value of the token and that Landshare reserves the right to decline token buybacks. Tokens can also be sold to other whitelisted investors for an agreed upon price using 3rd party services.",
    },
    {
      title:
        "Which countries are restricted from participating in the token sale?",
      content:
        "United States, Afghanistan, Albania , Barbados , Balkans, Botswana , Burkina Faso , Burma, Cambodia , Central African Republic, China, Cote D’Ivoire, Crimean Peninsula, Cuba, Democratic Republic of Congo, Eritrea, Guinea-Bissau, Iran, Iraq, Jamaica, LNR (Luhansk Republic), Lebanon, Libya, Liberia, Mauritius, Mali, Morocco, Myanmar, Nicaragua, North Korea, Pakistan , Panama , Senegal , Somalia, Sudan , Syria , Uganda , Yemen , Venezuela, Zimbabwe, Anguilla, Dominica, Fiji, Palau, Samoa, Seychelles, Trinidad and Tobago, Vanuatu. This list is not all inclusive. Additional restrictions may apply. Token lock periods may also apply to certain jurisdictions. Additional information will be provided in follow up documentation such as PPMs and Token Purchase Agreements.",
    },
    {
      title: "What happens if Landshare goes out of business?",
      content:
        "The entity which owns the asset is separate from Landshare and wholly owned by the token holders. The tokens will always represent the principle value of the underlying asset.",
    },
    {
      title: "What is the Landshare Token?",
      content:
        "The Landshare Token is the native utility token of the Landshare platform and does not represent the value of real estate assets. Each asset token purchase is paid partially in Landshare Tokens.",
    },
  ],
};

const styles = {
  // bgColor: 'white',
  rowTitleTextSize: "18px",
  rowContentTextSize: "15px",
  rowContentPaddingTop: "10px",
  rowContentPaddingBottom: "10px",

  // rowContentColor: 'grey',
  // arrowColor: "red",
};

export default class FAQ extends Component {
  render() {
    return (
      <div className="container mt-1 w-65">
        <Faq data={data} styles={styles} />
      </div>
    );
  }
}
