pragma solidity ^0.6.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.6/contracts/access/Ownable.sol";


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/solc-0.6/contracts/token/ERC20/ERC20.sol";

contract LandTokenStake is Ownable {
    
   
    using SafeMath for uint256;


    ERC20 private token; 
    uint public tokensStaked;
    uint public rewardPool; 
    uint public rewardPerToken = 0; 
    address [] public stakers; 
    uint thing = 1000000000000000000000000;
    mapping(address => uint) public amountStaked;  
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaked; 
    mapping(address => uint) public rewardTally;
    bool isFeeOn = true;

    constructor(ERC20 _token) public {
     
        token = _token; 
    }
    
    function feeSwitch(bool x) public onlyOwner {
         
        isFeeOn = x; 
    }

    function deposit(uint amount) public {
         require(amount > 10000000000000000, "must deposit at least 0.01"); 
        if (isFeeOn == true) {
            uint amountGoingInAdjusted = SafeMath.div(SafeMath.mul(thing, amount), 1010101010101010101010101);
                                                                              
        
        amountStaked[msg.sender] = SafeMath.add(amountGoingInAdjusted, amountStaked[msg.sender]); 
        rewardTally[msg.sender] = SafeMath.add(rewardTally[msg.sender], SafeMath.div(SafeMath.mul(rewardPerToken, amountGoingInAdjusted), thing));
        tokensStaked = SafeMath.add(tokensStaked, amountGoingInAdjusted);
        rewardPool = SafeMath.add(rewardPool, SafeMath.sub(amount, amountGoingInAdjusted));
        }
        else {
        amountStaked[msg.sender] = SafeMath.add(amount, amountStaked[msg.sender]); 
        rewardTally[msg.sender] = SafeMath.add(rewardTally[msg.sender], SafeMath.div(SafeMath.mul(rewardPerToken, amount), thing));
        tokensStaked = SafeMath.add(tokensStaked, amount);
        }
        
        
        
        //add to stakers
        if (hasStaked[msg.sender] != true) {
            stakers.push(msg.sender); 
        }

        //verify has and is staked
        hasStaked[msg.sender] = true;
        isStaked[msg.sender] = true; 
        

         

        token.transferFrom(msg.sender, address(this), amount);

    }
    
     function rewardDeposit(uint amount) private {
         
        
        amountStaked[msg.sender] = SafeMath.add(amount, amountStaked[msg.sender]); 
        rewardTally[msg.sender] = SafeMath.add(rewardTally[msg.sender], SafeMath.div(SafeMath.mul(rewardPerToken, amount), thing));
        tokensStaked = SafeMath.add(tokensStaked, amount);
        

    }

    function distribute(uint r) public onlyOwner {
  
        require(tokensStaked > 0, "no tokens staked");
        require(r <= rewardPool, "distribution larger than pool");
        rewardPerToken = SafeMath.add(rewardPerToken, SafeMath.div(SafeMath.mul(r, thing), tokensStaked)); 
        rewardPool = SafeMath.sub(rewardPool, r);

    }

    function computeReward(address x) public view returns(uint reward) {
        if (rewardTally[x] > SafeMath.div(SafeMath.mul(amountStaked[x], rewardPerToken), thing)) {
            return 0;
        }
        else {
        return SafeMath.sub(SafeMath.div(SafeMath.mul(amountStaked[x], rewardPerToken), thing), rewardTally[x]); 
        }
    }

    function withdrawReward() public  {
        require (computeReward(msg.sender) > 0, "no reward found"); 
        uint rewardAmt = computeReward(msg.sender);
        rewardTally[msg.sender] = SafeMath.div(SafeMath.mul(amountStaked[msg.sender], rewardPerToken), thing);
        token.transfer(msg.sender, rewardAmt);
    }

    function compoundReward() public  {
        require (computeReward(msg.sender) > 0, "no reward found"); 
        
        uint rewardAmt = computeReward(msg.sender);
        
         //depositing functions
        rewardDeposit(rewardAmt); 
        
        //withdrawing reward functions
        
        rewardTally[msg.sender] = SafeMath.div(SafeMath.mul(amountStaked[msg.sender], rewardPerToken), thing);
        
       
        
    }

    function withdraw(uint withdrawAmt) public {
        
        require(isStaked[msg.sender] == true, "No deposit found");
        require(amountStaked[msg.sender] >= withdrawAmt, "Can't withdraw more than your deposit");
 
        
        if (computeReward(msg.sender) > 0) {
            withdrawReward();
        }
        
        if (rewardTally[msg.sender] < SafeMath.div(SafeMath.mul(rewardPerToken, withdrawAmt), thing)) {
            rewardTally[msg.sender] = 0;
        }
        else {
            rewardTally[msg.sender] = SafeMath.sub(rewardTally[msg.sender], SafeMath.div(SafeMath.mul(rewardPerToken, withdrawAmt), thing));
        }
        amountStaked[msg.sender] = SafeMath.sub(amountStaked[msg.sender], withdrawAmt); 
       
        tokensStaked = SafeMath.sub(tokensStaked, withdrawAmt); 
        

        if (amountStaked[msg.sender] == 0) {    
         isStaked[msg.sender] == false; 
        }

        token.transfer(msg.sender, withdrawAmt);
    }

    function addToRewardPool(uint x) public {
        require(token.allowance(msg.sender, address(this)) > x, "insufficient allowance" );
        rewardPool = SafeMath.add(rewardPool, x); 
        
        token.transferFrom(msg.sender, address(this), x);
    }



}