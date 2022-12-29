import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";

export default function ListItem({ data, last, isPropertyVault, isApprovedLP }) {
  const {
    state: { isAlert, isApprovedLandStake2, whichVault, isApprovedLandStake, isApprovedPropertyVault },
  } = useLandshareFunctions();
  
  return (
    <div
      className={  last === "harvest" ? `d-flex flex-column 
         py-4 justify-content-center`: `d-flex flex-column 
         py-4 justify-content-center border-bottom`}
    >
      <div className="d-flex  flex-row   justify-content-between   align-items-center">
        <div>
          <button
            className="btn-withdraw text-capitalize"
            onClick={(e) => data.handler(e)}
            disabled={(!isPropertyVault && isApprovedLandStake2 === false && whichVault === "v2") || !isPropertyVault && isApprovedLandStake === false && whichVault === "v1" || !isPropertyVault && whichVault === "LP" && isApprovedLP === false || isAlert ? true : false || isPropertyVault && isApprovedPropertyVault === false } 
            //disabled={true}
          >
            {data.name}
          </button>
        </div>
        <div className="w-100 d-sm-none" style={{ maxWidth: "30px" }}></div>
        {data.keys ? (
          <Value
            data={data.keys}
            btnName={data.name}
            isPropertyVault={isPropertyVault}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

const Value = ({ data, isPropertyVault, btnName }) => (
  <div
    className="d-flex  mb-xl-0  justify-content-around  w-100 w-xl-60   mt-xl-0"
  >
    {data.map((obj, i) => (
      <div
        className=" d-flex align-items-center flex-column  ms-sm-0"
        key={i}
      >
        <span
          className={`white-space-nowrap  text-4d4d4d fs-12 fs-xxxl-14 font-medium `}
        >
          {obj.name}
        </span>
        <span className={`text-black fw-600 fs-12 fs-xxxl-14`}>
          {obj.value}
        </span>
      </div>
    ))}
  </div>
);