import Garden from "../../assets/img/yield-upgrades/garden.png";
import Landscaping from "../../assets/img/yield-upgrades/landscaping.png";
import KitchenRemodel from "../../assets/img/yield-upgrades/kitchen_remodel.png";
import BathroomRemodel from "../../assets/img/yield-upgrades/bathroom_remodel.png";
import SteelSiding from "../../assets/img/yield-upgrades/steel_siding.png";
import SteelAppliances from "../../assets/img/yield-upgrades/steel_appliances.png";
import HardwoodFloors from "../../assets/img/yield-upgrades/hardwood_floors.png";
import JacuzziTub from "../../assets/img/yield-upgrades/jacuzzi_tub.png";
import FinishedBasement from "../../assets/img/yield-upgrades/finished_basement.png";
import Cellar from "../../assets/img/yield-upgrades/cellar.png";
import Trees from "../../assets/img/yield-upgrades/trees.png";
import Firepit from '../../assets/img/yield-upgrades/firepit.png'
import Fireplace from '../../assets/img/yield-upgrades/fireplace.png'


export const data = [
  {
    title: "Hardwood Floors",
    width: "117px",
    imgUrl: HardwoodFloors,
    land: "x1.1",
    btnTitle: "BUY",
    bgVariant: "green-variant-bg",
    btnVariant: "green-variant",
    id: 0,
    sortableId: 0,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 1, 0, 0, 0]
  },
  {
    title: "Landscaping",
    width: "117px",
    imgUrl: Landscaping,
    bgVariant: "green-variant-bg",
    btnVariant: "green-variant",
    id: 1,
    sortableId: 1,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 2.5, 0, 0, 0]
  },
  {
    title: "Garden",
    imgUrl: Garden,
    width: "140px",
    bgVariant: "green-variant-bg",
    btnVariant: "disabled-variant",
    id: 2,
    sortableId: 2,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 0, 0, 0, 0]
  },
  {
    title: "Trees",
    imgUrl: Trees,
    width: "140px",
    bgVariant: "green-variant-bg",
    btnVariant: "disabled-variant",
    id: 3,
    sortableId: 3,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 2, 0, 0, 0]
  },
  {
    title: "Fireplace",
    imgUrl: Fireplace,
    width: "133px",
    bgVariant: "light-blue-variant-bg",
    btnVariant: "green-variant",
    id: 11,
    sortableId: 11,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 0, 0, 0, 0]
  },
  {
    title: "Kitchen Remodel",
    imgUrl: KitchenRemodel,
    width: "131px",
    bgVariant: "light-blue-variant-bg",
    btnVariant: "green-variant",
    id: 4,
    sortableId: 4,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 3, 3, 1.5, 0]
  },
  {
    title: "Bathroom Remodel",
    imgUrl: BathroomRemodel,
    width: "130px",
    bgVariant: "light-blue-variant-bg",
    btnVariant: "dark-blue-variant",
    id: 5,
    sortableId: 5,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 3, 2, 2.5, 0]
  },
  {
    title: "Jacuzzi Tub",
    imgUrl: JacuzziTub,
    width: "135px",
    bgVariant: "light-purple-variant-bg",
    btnVariant: "green-variant",
    id: 6,
    sortableId: 6,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 0, 0, 4, 0]
  },
  {
    title: "Steel Siding",
    imgUrl: SteelSiding,
    width: "135px",
    bgVariant: "light-purple-variant-bg",
    btnVariant: "green-variant",
    id: 7,
    sortableId: 7,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 0, 0, 0, 4]
  },
  {
    title: "Steel Appliances",
    imgUrl: SteelAppliances,
    width: "133px",
    bgVariant: "light-blue-variant-bg",
    btnVariant: "disabled-variant",
    id: 8,
    sortableId: 8,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 0, 0, 0, 3]
  },
  {
    title: "Cellar",
    imgUrl: Cellar,
    width: "133px",
    bgVariant: "light-blue-variant-bg",
    btnVariant: "disabled-variant",
    id: 9,
    sortableId: 9,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 3, 4, 0, 1]
  },
  {
    title: "Finished Basement",
    imgUrl: FinishedBasement,
    width: "133px",
    bgVariant: "light-blue-variant-bg",
    btnVariant: "disabled-variant",
    id: 10,
    sortableId: 10,
    salvageCost: [20, 0, 0, 0, 0],
    salvageReceive: [0, 4, 4, 4, 4]
  }
];

export const upgradeNames = [
  "Hardwood Floors",
  "Landscaping",
  "Garden",
  "Tree",
  "Kitchen Model",
  "Bathroom Remodel",
  "Jacuzzi Tub",
  "Steel Sliding",
  "Steel Application",
  "Root cellar",
  "Finished Basement",
  "Fireplace"
];
