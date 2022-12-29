import React, { useState, useEffect } from "react";
import Web3 from "web3";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";
import { NextLabelIcon, PrevLabelIcon, QuestionIcon } from "../../common/Icons";
import NftItem from "./NftItem";
import { NFTGuide } from "./NFTGuide";
import sadEmoji from "../../../assets/img/icons/sad_emoji.png";
import { useLandshareFunctions } from "../../../contexts/LandshareFunctionsProvider";
import "./NftItems.css";
const { fromWei, toWei, toBN } = Web3.utils;

export const NftItems = ({ tokenIds }) => {
  const { state } = useLandshareFunctions();
  const [itemOffset, setItemOffset] = useState(0);
  const [showHouseList, setShowHouseList] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tokenIds.length;
    setItemOffset(newOffset);
  };

  const itemsPerPage = 8;
  const pageCount = Math.ceil(tokenIds.length / itemsPerPage);
  const currentItems = tokenIds.slice(
    itemOffset,
    itemOffset + itemsPerPage
  );

  useEffect(() => {
    async function getHouseNFT () {
      if (state.houseNFT) {
        setIsLoading(true);
        let houseNFTList = {}
        for (let tokenId of tokenIds.slice(itemOffset, itemOffset + itemsPerPage)) {
          const houseNft = await state.houseNFT.methods.getHouse(tokenId).call();
          const houseDetails = await state.helper.methods
            .getHouseDetails(tokenId)
            .call();
    
          houseNFTList[tokenId] = {
            activated: houseNft.activated,
            isRare: houseNft.isRare,
            rareId: houseNft.rareId,
            name: houseNft.name,
            depositedBalance: houseNft.depositedBalance,
            facilityLevel: houseNft.facilityLevel,
            hasAddon: houseNft.hasAddon,
            expireGardenTime: houseNft.expireGardenTime,
            currentDurability: houseDetails[0],
            maxDurability: houseDetails[1],
            multiplier: Math.floor(
              fromWei(
                toBN(houseDetails[2]).mul(toBN(houseDetails[0])).div(toBN(houseDetails[1]))
              ).toString()
            ).toString(),
            tokenReward: houseDetails[4],
          };
        }
        setShowHouseList(houseNFTList);
        setIsLoading(false);
      }
    }
    getHouseNFT();
  }, [itemOffset])

  return (
    <>
      {isLoading ? (
        <div className="d-flex w-100 min-h-60vh h-100 align-items-center justify-content-center">
          <ReactLoading type="bars" color="#0ed145" />
        </div>
      ) : (
        <div className="">
          {tokenIds.length > 0 ? (
            <div className="nft-houses-list mb-5 justify-content-center justify-content-md-start">
              {currentItems.map((tokenId, index) => {
                if (showHouseList[tokenId]) {
                  return (
                    <div
                      className="d-flex justify-content-center m-margin"
                      key={`nft-house-item-${index}`}
                    >
                      <NftItem tokenId={tokenId} house={showHouseList[tokenId]} />
                    </div>
                  );
                }
              })}
            </div>
          ) : (
            <div className='d-flex w-100 h-100 align-items-center justify-content-center no-item-ui'>
              <div className="no-item-text">No NFTs Found</div>
              <img
                src={sadEmoji}
                alt="Sad Emoji"              
              />
              <div className="no-item-link"><a href="https://docs.landshare.io/" target="_blank" className="no-item-hyper">Learn More</a> <QuestionIcon/></div>
            </div>
            //   <NFTGuide/>
          )}
          {pageCount > 1 && (
            <div className="d-flex justify-content-center mb-5">
              <ReactPaginate
                previousLabel={<PrevLabelIcon />}
                nextLabel={<NextLabelIcon />}
                containerClassName={"pagination"}
                activeClassName={"active"}
                breakLabel="..."
                onPageChange={handlePageClick}
                marginPagesDisplayed={1}
                pageRangeDisplayed={
                  itemOffset === 0
                    ? 5
                    : itemOffset / itemsPerPage + 2 <= 4
                    ? 4
                    : pageCount - itemOffset / itemsPerPage <= 3
                    ? 5
                    : 2
                }
                forcePage={itemOffset / itemsPerPage}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};
