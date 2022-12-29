import React from "react";
import { useLandshareFunctions } from "../contexts/LandshareFunctionsProvider";

export default function Loading() {
  const {
    state: { transactionStatus },
  } = useLandshareFunctions();

  return (
    <div className="landshare-loader d-flex flex-column justify-content-center align-content-center">
      <span className="text-center fs-28 fw-bold">
        {transactionStatus ? transactionStatus : "..."}
      </span>
    </div>
  );
}
