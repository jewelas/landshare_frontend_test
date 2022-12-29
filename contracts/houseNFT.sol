import "@openzeppelin/contracts/Token/ERC1155/ERC1155.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract houseNFT is ERC1155, Ownable {

    struct payouts {
        address owner;
        uint houseID;
        uint landID;
        uint perBlockPayout;
    } 

    address public upgradeContract; 

    constructor(string memory uri) ERC1155(uri) {

    }

    function setUri(string memory uri) external onlyOwner{
        _setURI(uri);
    }
    

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data) 
        public onlyOwner {
        _mint(account, id, amount, data);
    }


     function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, data);
    
    }

 
    function burn(
        address account,
        uint256 id,
        uint256 amount
    ) public onlyOwner {
        _burn(account, id, amount);
    }


    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public onlyOwner {
        _burnBatch(account, ids, amounts);
    }

   function changeUpgrader(address newUpgrader) external onlyOwner {
       upgradeContract = newUpgrader; 
   }
    

}