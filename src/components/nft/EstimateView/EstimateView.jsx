import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import { useLandshareFunctions } from "../../../contexts/LandshareFunctionsProvider";
import { useMediaQuery } from "react-responsive";
import gameSetting from "../../../contexts/game/setting.json";
import overviewDefault from "../../../assets/img/overview/default.png";
import { MapInteractionCSS } from "react-map-interaction";
import house1img from "../../../assets/img/overview/house_01.png";
import house2img from "../../../assets/img/overview/house_02.png";
import house3img from "../../../assets/img/overview/house_02.png";

import wind1img from "../../../assets/img/overview/wind_01.png";
import wind2img from "../../../assets/img/overview/wind_02.png";
import wind3img from "../../../assets/img/overview/wind_03.png";
import wind4img from "../../../assets/img/overview/wind_04.png";
import wind5img from "../../../assets/img/overview/wind_05.png";

import lumber1img from "../../../assets/img/overview/lumber_01.png";
import lumber2img from "../../../assets/img/overview/lumber_02.png";
import lumber3img from "../../../assets/img/overview/lumber_03.png";
import lumber4img from "../../../assets/img/overview/lumber_04.png";
import lumber5img from "../../../assets/img/overview/lumber_05.png";

import brick1img from "../../../assets/img/overview/brick_01.png";
import brick2img from "../../../assets/img/overview/brick_02.png";
import brick3img from "../../../assets/img/overview/brick_03.png";
import brick4img from "../../../assets/img/overview/brick_04.png";
import brick5img from "../../../assets/img/overview/brick_05.png";

import concrete1img from "../../../assets/img/overview/concrete_01.png";
import concrete2img from "../../../assets/img/overview/concrete_02.png";
import concrete3img from "../../../assets/img/overview/concrete_03.png";
import concrete4img from "../../../assets/img/overview/concrete_04.png";
import concrete5img from "../../../assets/img/overview/concrete_05.png";

import steel1img from "../../../assets/img/overview/steel_01.png";
import steel2img from "../../../assets/img/overview/steel_02.png";
import steel3img from "../../../assets/img/overview/steel_03.png";
import steel4img from "../../../assets/img/overview/steel_04.png";
import steel5img from "../../../assets/img/overview/steel_05.png";

import toolshedbrickimg from "../../../assets/img/overview/extra_toolshed_brick.png";
import toolshedconcreteimg from "../../../assets/img/overview/extra_toolshed_concrete.png";
import toolshedsteelimg from "../../../assets/img/overview/extra_toolshed_steel.png";
import toolshedwoodimg from "../../../assets/img/overview/extra_toolshed_wood.png";

import decorimg from "../../../assets/img/overview/extra_decor.png";
import harvesterimg from "../../../assets/img/overview/extra_harvester.png";
import lightpolesimg from "../../../assets/img/overview/extra_lightpoles.png";
import "./EstimateView.css";
import {
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon,
} from "../NftIcon";
const { fromWei, toWei, toBN } = Web3.utils;

const sortFunction = (addon1, addon2) => {
  return addon1.sortableId - addon2.sortableId;
};

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export const EstimateView = ({
  levels,
  hasAddon,
  hasToolshed,
  hasHarvester,
  hasFireplace,
  activeToolshedType,
  lastFortTime,
  lastHandymanHiredTime,
  hasConcreteFoundation,
  activated,
  setHouse,
  setUserResource,
}) => {
  const isBeforeDesktop = useMediaQuery({ maxWidth: 991.98 });
  const [index, setIndex] = useState(0);
  const [value, setValue] = useState({
    scale: 1,
    translation: { x: 0, y: 0 },
  });
  const [lumberImgUrl, setLumberImgUrl] = useState();
  const [lumberImg, setLumberImage] = useState([
    lumber1img,
    lumber2img,
    lumber3img,
    lumber4img,
    lumber5img,
  ]);
  const [windImages, setWindImages] = useState([
    wind1img,
    wind2img,
    wind3img,
    wind4img,
    wind5img,
  ]);
  const [windImgUrl, setWindImgUrl] = useState();

  const [bricksImages, setBricksImages] = useState([
    brick1img,
    brick2img,
    brick3img,
    brick4img,
    brick5img,
  ]);
  const [brickImgUrl, setBrickImgUrl] = useState();

  const [concreteImages, setConcreteImages] = useState([
    concrete1img,
    concrete2img,
    concrete3img,
    concrete4img,
    concrete5img,
  ]);
  const [concreteImgUrl, setConcreteImgUrl] = useState();
  const { tokenId } = useParams();

  const { state, notifySuccess, notifyError } = useLandshareFunctions();
  const { account, setting, game, web3 } = state;
  const [selTab, setSelTab] = useState(0);
  const [addonMultiplier, setAddonMultiplier] = useState(
    gameSetting.addonMultiplier
  );
  const [facilityYield, setFacilityYield] = useState(gameSetting.facilityYield);

  useEffect(() => {
    loadSetting();
  }, [state]);

  const loadSetting = async () => {
    if (setting) {
      const addonMultiplier = await state.setting.methods
        .getBaseAddonMultiplier()
        .call();
      const data = await state.setting.methods.getFacilitySetting().call();
      setFacilityYield(data[1]);
      setAddonMultiplier(addonMultiplier);
    }
  };

  const icons = [
    <ChargeIcon className="" iconColor="#263238" />,
    <LumberIcon className="" iconColor="#263238" />,
    <BrickIcon className="" iconColor="#263238" />,
    <ConcreteIcon className="" iconColor="#263238" />,
    <SteelIcon className="" iconColor="#263238" />,
  ];

  const onSelTab = (tabIndex) => {
    setSelTab(tabIndex);
  };

  useEffect(() => {
    if (levels) {
      const numb = [1, 2, 3, 4, 5];
      // LOGIC FOR WIND IMAGE
      levels.forEach((level, index) => {
        if (index == "0") {
          numb.map((number, i) => {
            if (number == level) {
              setWindImgUrl(windImages[number - 1]);
            }
          });
        }
        // LOGIC FOR LUMBER IMAGE
        if (index == "1") {
          numb.map((number, i) => {
            if (number == level) {
              setLumberImgUrl(lumberImg[number - 1]);
            }
          });
        }
        // LOGIC FOR BRICKS IMAGE
        if (index == "2") {
          numb.map((number, i) => {
            if (number == level) {
              setBrickImgUrl(bricksImages[number - 1]);
            }
          });
        }
        // LOGIC FOR CONCRETE IMAGE
        if (index == "3") {
          numb.map((number, i) => {
            if (number == level) {
              setConcreteImgUrl(concreteImages[number - 1]);
            }
          });
        }
      });
    }
  }, [levels]);

  const translationHandler = (n) => {
    if (n.scale == 1) {
      setValue(() => {
        return {
          scale: 1,
          translation: { x: 0, y: 0 },
        };
      });
    } else {
      setValue(n);
    }
  };

  return (
    <div className="container px-0 mb-5 mt-3">
      <div className="view-section">
        <div className="zoom-wrapper">
          <MapInteractionCSS
            disableZoom={!isBeforeDesktop}
            minScale={1}
            value={value}
            disablePan={!isBeforeDesktop}
            maxScale={4}
            onChange={(n) => translationHandler(n)}
          >
            <div id="image-container" className="estimate-img">
              <img className="totalproduct" src={overviewDefault} />
              <img className="windimgproduct" src={windImgUrl} />
              {lumberImgUrl && (
                <>
                  <img className="lumberimgproduct" src={lumberImgUrl} />
                </>
              )}
              {brickImgUrl && (
                <>
                  <img className="brickimgproduct" src={brickImgUrl} />
                </>
              )}
              {brickImgUrl && (
                <>
                  <img className="brickimgproduct" src={brickImgUrl} />
                </>
              )}

              {concreteImgUrl && (
                <>
                  <img className="concreteimgproduct" src={concreteImgUrl} />
                </>
              )}

              {hasAddon[1] ? (
                hasAddon[2] ? (
                  <img className="steelimgproduct" src={house3img} />
                ) : (
                  <img className="steelimgproduct" src={house2img} />
                )
              ) : (
                <img className="steelimgproduct" src={house1img} />
              )}

              {levels[4] == 1 && (
                <img className="steelimgproduct" src={steel1img} />
              )}
              {levels[4] == 2 && (
                <img className="steelimgproduct" src={steel2img} />
              )}
              {levels[4] == 3 && (
                <img className="steelimgproduct" src={steel3img} />
              )}
              {levels[4] == 4 && (
                <img className="steelimgproduct" src={steel4img} />
              )}
              {levels[4] == 5 && (
                <img className="steelimgproduct" src={steel5img} />
              )}
              {hasAddon[1] && (
                <img className="steelimgproduct" src={decorimg} />
              )}
              {levels[0] > 0 && (
                <img className="steelimgproduct" src={lightpolesimg} />
              )}
              {hasHarvester && (
                <img className="steelimgproduct" src={harvesterimg} />
              )}
              {activeToolshedType == 1 && (
                <img className="steelimgproduct" src={toolshedwoodimg} />
              )}
              {activeToolshedType == 2 && (
                <img className="steelimgproduct" src={toolshedbrickimg} />
              )}
              {activeToolshedType == 3 && (
                <img className="steelimgproduct" src={toolshedconcreteimg} />
              )}
              {activeToolshedType == 4 && (
                <img className="steelimgproduct" src={toolshedsteelimg} />
              )}
            </div>
          </MapInteractionCSS>
        </div>
      </div>
      <div className="view-section">
        <div className="estimate-section-content">
          <div className="estimate-section-view">
            <table className="estimate-section-table">
              <thead className="estimate-section-thead">
                <tr>
                  <th className="estimate-section-th">Name</th>
                  <th className="estimate-section-th">Current Yield</th>
                  <th className="estimate-section-th">Level</th>
                </tr>
              </thead>
              <tbody>
                {gameSetting.facility.map((item, type) => (
                  <tr className="estimate-section-tr" key={item}>
                    <td className="estimate-section-td-name">{item}</td>
                    <td className="estimate-section-td-yi">
                      {levels[type] != 0
                        ? facilityYield[type][levels[type] - 1]
                        : "0"}
                      {icons[type]}/day
                    </td>
                    <td className="estimate-section-td-level">
                      Lvl {levels[type]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="estimate-section-view">
            <table className="estimate-section-table">
              <thead className="estimate-section-thead">
                <tr>
                  <th className="estimate-section-th">Name</th>
                  <th className="estimate-section-th">Multiplier</th>
                </tr>
              </thead>
              <tbody>
                {[...gameSetting.addon].sort(sortFunction).map((item, idx) => (
                  <tr className="estimate-section-tr" key={item.name}>
                    <td className="estimate-section-td-name">{item.name}</td>
                    <td className="estimate-section-td-yi">
                      {hasAddon[idx] ? (
                        <>x{Number(addonMultiplier[idx]) / 100} LAND / Year</>
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="estimate-section-view">
            <table className="estimate-section-table">
              <thead className="estimate-section-thead">
                <tr>
                  <th className="estimate-section-th">Name</th>
                  <th className="estimate-section-th">Owned/Not Owned</th>
                </tr>
              </thead>
              <tbody>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">Lumber Toolshed</td>
                  <td className="estimate-section-td-yi">
                    {hasToolshed[1] ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">Brick Toolshed</td>
                  <td className="estimate-section-td-yi">
                    {hasToolshed[2] ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">
                    Concrete Toolshed
                  </td>
                  <td className="estimate-section-td-yi">
                    {hasToolshed[3] ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">Steel Toolshed</td>
                  <td className="estimate-section-td-yi">
                    {hasToolshed[4] ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">
                    Concrete Foundation
                  </td>
                  <td className="estimate-section-td-yi">
                    {hasConcreteFoundation ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">Havester</td>
                  <td className="estimate-section-td-yi">
                    {hasHarvester ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">
                    Fortification Brick
                  </td>
                  <td className="estimate-section-td-yi">
                    {Number(lastFortTime[0]) * 1000 > Date.now() ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">
                    Fortification Concrete
                  </td>
                  <td className="estimate-section-td-yi">
                    {Number(lastFortTime[1]) * 1000 > Date.now() ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">
                    Fortification Steel
                  </td>
                  <td className="estimate-section-td-yi">
                    {Number(lastFortTime[2]) * 1000 > Date.now() ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
                <tr className="estimate-section-tr">
                  <td className="estimate-section-td-name">Fireplace</td>
                  <td className="estimate-section-td-yi">
                    {hasFireplace ? (
                      "Owned"
                    ) : (
                      <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="estimate-section-content-mobile">
          <div className="estimate-section-tab">
            <div
              className={
                selTab == 0
                  ? "estimate-section-tab-sel"
                  : "estimate-section-tab-fa"
              }
              onClick={onSelTab.bind(this, 0)}
            >
              Facilities
            </div>
            <div
              className={
                selTab == 1
                  ? "estimate-section-tab-sel"
                  : "estimate-section-tab-fa"
              }
              onClick={onSelTab.bind(this, 1)}
            >
              Yield Upgrades
            </div>
            <div
              className={
                selTab == 2
                  ? "estimate-section-tab-sel"
                  : "estimate-section-tab-fa"
              }
              onClick={onSelTab.bind(this, 2)}
            >
              Production Upgrades
            </div>
          </div>
          {selTab == 0 && (
            <div className="estimate-section-view">
              <table className="estimate-section-table">
                <thead className="estimate-section-thead">
                  <tr>
                    <th className="estimate-section-th">Name</th>
                    <th className="estimate-section-th">Current Yield</th>
                    <th className="estimate-section-th">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {gameSetting.facility.map((item, type) => (
                    <tr className="estimate-section-tr" key={item}>
                      <td className="estimate-section-td-name">{item}</td>
                      <td className="estimate-section-td-yi">
                        {levels[type] != 0
                          ? facilityYield[type][levels[type] - 1]
                          : "0"}{" "}
                        {icons[type]}/day
                      </td>
                      <td className="estimate-section-td-level">
                        Lvl {levels[type]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {selTab == 1 && (
            <div className="estimate-section-view">
              <table className="estimate-section-table">
                <thead className="estimate-section-thead">
                  <tr>
                    <th className="estimate-section-th">Name</th>
                    <th className="estimate-section-th">Multiplier</th>
                  </tr>
                </thead>
                <tbody>
                  {[...gameSetting.addon]
                    .sort(sortFunction)
                    .map((item, idx) => (
                      <tr className="estimate-section-tr" key={item.name}>
                        <td className="estimate-section-td-name">
                          {item.name}
                        </td>
                        <td className="estimate-section-td-yi">
                          {hasAddon[idx] ? (
                            <>
                              x{Number(addonMultiplier[idx]) / 100} LAND / Year
                            </>
                          ) : (
                            <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
          {selTab == 2 && (
            <div className="estimate-section-view">
              <table className="estimate-section-table">
                <thead className="estimate-section-thead">
                  <tr>
                    <th className="estimate-section-th">Name</th>
                    <th className="estimate-section-th">Owned/Not Owned</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">
                      Lumber Toolshed
                    </td>
                    <td className="estimate-section-td-yi">
                      {hasToolshed[1] ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">Brick Toolshed</td>
                    <td className="estimate-section-td-yi">
                      {hasToolshed[2] ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">
                      Concrete Toolshed
                    </td>
                    <td className="estimate-section-td-yi">
                      {hasToolshed[3] ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">Steel Toolshed</td>
                    <td className="estimate-section-td-yi">
                      {hasToolshed[4] ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">
                      Concrete Foundation
                    </td>
                    <td className="estimate-section-td-yi">
                      {hasConcreteFoundation ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">Havester</td>
                    <td className="estimate-section-td-yi">
                      {hasHarvester ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">
                      Fortification Brick
                    </td>
                    <td className="estimate-section-td-yi">
                      {Number(lastFortTime[0]) * 1000 > Date.now() ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">
                      Fortification Concrete
                    </td>
                    <td className="estimate-section-td-yi">
                      {Number(lastFortTime[1]) * 1000 > Date.now() ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">
                      Fortification Steel
                    </td>
                    <td className="estimate-section-td-yi">
                      {Number(lastFortTime[2]) * 1000 > Date.now() ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                  <tr className="estimate-section-tr">
                    <td className="estimate-section-td-name">Fireplace</td>
                    <td className="estimate-section-td-yi">
                      {hasFireplace ? (
                        "Owned"
                      ) : (
                        <div style={{ color: "#FFFFFF" }}>Not Owned</div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
