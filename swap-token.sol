pragma solidity ^0.8.14;
contract SwapToken{
    address THIS = address(this);
    address contractOwner;
    ERC20 POTATO = NFT(0x000000000000000);
    mapping(address => bool) worker;
    uint FEE;
    uint MAX_SWAP = 1000;
    uint collections;
    
    constructor(){
        contractOwner = msg.sender;
    }

    modifier onlyOwner {
      require(msg.sender == contractOwner);
      _;
   }

    function changeContractOwner(address newContractOwner) public onlyOwner{
        contractOwner = newContractOwner;
    }

    function setFee(uint newFee) public  onlyOwner{
        FEE = newFee;
    }

    function withdraw() public  onlyOwner{
        collections = 0;
    }

    function setWorker(address workerAddress) public  onlyOwner{
        worker[workerAddress] = true;
    }

    function fireWorker(address workerAddress) public  onlyOwner{
        worker[workerAddress] = false;
    }

    event DepositPotatoToken(address from, address for, uint amount);
    function depositPotatoToken(address for, uint256 amount) external payable{
        address sender = msg.sender;
        uint cost = amount*FEE;
        require(msg.value == cost && amount<=MAX_SWAP);
        collections += cost;
        POTATO.transferFrom(sender, THIS, amount);
        emit DepositPotatoToken(from, for, amount);
    }
    
    event SendPotato(address to, uint amount);
    function sendPotato(address to, uint amount) public onlyOwner{
        POTATO.transfer(to, amount);
        emit SendPotato(to, amount);
    }
}


abstract contract ERC20 {
    function transferFrom(address from, address to, uint256 amount) external;
    function transfer(address from, address to, uint256 amount) external;
}