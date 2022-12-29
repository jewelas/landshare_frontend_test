import "@openzeppelin/contracts/Token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/Token/ERC721/IERC721.sol";


contract NFTStaking is ERC721Holder, Ownable {


    IERC721 public houseNFT;
    IERC721 public landNFT;
    uint public nextDepositID = 0; 
    mapping(uint => DepositInfo) public depositID; 
    mapping(uint => bool) public isDepositActive;
    mapping(address=>uint) public bankedHarvest; 
   

    struct DepositInfo {
        uint houseID;
        uint landID;
        uint lastRepair;
        address owner; 
        uint lastRewardTime;
        uint timeWhenDisrepaired; 
    }

    

    constructor (IERC721 _houseNFT, IERC721 _landNFT) {
        houseNFT = _houseNFT;
        landNFT = _landNFT; 
    }

    function getOwner(uint id) public view returns(address) {
        DepositInfo storage user = depositID[id];
        return user.owner;
    }

    function getHouseID(uint id) public view returns(address) {
        DepositInfo storage user = depositID[id];
        return user.houseID;
    }

    function getLandID(uint id) public view returns(address) {
        DepositInfo storage user = depositID[id];
        return user.landID;
    }

    function getLastRepair(uint id) public view returns(address) {
        DepositInfo storage user = depositID[id];
        return user.lastRepair;
    }

       function getTimeWhenDisrepaired(uint id) public view returns(address) {
        DepositInfo storage user = depositID[id];
        return user.timeWhenDisrepaired;
    }

    

    function deposit(uint houseID, uint landID)  external {
        
        landNFT.safeTransferFrom(msg.sender, address(this), landID);
        houseNFT.safeTransferFrom(msg.sender, address(this), houseID); 
        depositID[nextDepositID] = DepositInfo(houseID, landID, block.timestamp, msg.sender, block.timestamp, (block.timeStamp + 500) );


    }



}