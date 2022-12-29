import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
  NextLabelIconMarketPlaceIcon,
  PevtLabelIconMarketPlaceIcon,
} from "../../common/Icons";
import NftItem from "./MarketplaceItem";
import CountDown from "../../common/timer/Timer";
import "./MarketplaceItems.css";

export const MarketplaceItems = ({ marketplaceIds, marketplaces }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const isCommingSoon = true;

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % filteredMarketplaceIds.length;
    setItemOffset(newOffset);
  };

  const filteredMarketplaceIds = marketplaceIds.filter(
    (marketplaceId) => marketplaces[marketplaceId]
  );
  const itemsPerPage = 8;
  const pageCount = Math.ceil(filteredMarketplaceIds.length / itemsPerPage);
  const currentItems = filteredMarketplaceIds.slice(
    itemOffset,
    itemOffset + itemsPerPage
  );

  return (
    <div>
      {isCommingSoon ? (
        <>
          <div className="d-flex flex-column align-items-center justify-content-center min-h-50vh">
            <h4 className="text-center">Coming soon!</h4>
            {/* <CountDown /> */}
          </div>
        </> 
      ): (
        <>
          {filteredMarketplaceIds.length > 0 ? (
            <div className="marketplaces-list mb-5">
              {currentItems.map((marketplaceId, index) => (
                <div
                  key={`nft-house-item-${index}`}
                  className="marketplaces-item-moible"
                >
                  <NftItem
                    marketplaceId={marketplaceId}
                    marketplace={marketplaces[marketplaceId]}
                  />
                </div>
              ))}
            </div>
          ) : (
            "No Marketplace Items"
          )}
          {pageCount > 1 && (
            <div className="d-flex justify-content-center mb-5">
              <ReactPaginate
                previousLabel={<PevtLabelIconMarketPlaceIcon />}
                nextLabel={<NextLabelIconMarketPlaceIcon />}
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
                pageCount={pageCount}
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
