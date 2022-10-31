// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract PotatoBuy{
    address THIS = address(this);
    address public contractOwner;
    address public beneficiary;
    mapping(address => bool) worker;
    ERC20 BUSD = ERC20(0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89);
    uint public FEE;
    uint public collections;
    bool active = true;
    
    constructor(){
        contractOwner = msg.sender;
    }

    modifier onlyOwner {
      require(msg.sender == contractOwner || worker[msg.sender]) ;
      _;
    }

    modifier ifActive {
      require(active);
      _;
    }
    function activate() public onlyOwner{
        active = true;
    }
    function deactivate() public onlyOwner{
        active = false;
    }

    function changeContractOwner(address newContractOwner) public onlyOwner{
        contractOwner = newContractOwner;
    }
    function changeBeneficiary(address newBeneficiary) public onlyOwner{
        beneficiary = newBeneficiary;
    }

    function setFee(uint newFee) public onlyOwner{
        FEE = newFee;
    }

    function withdraw() public {
        require(msg.sender == beneficiary);
        (bool success, ) = msg.sender.call{value:collections}("");
        require(success, "Transfer failed.");
        collections = 0;
    }


    function setWorker(address workerAddress) public onlyOwner{
        worker[workerAddress] = true;
    }

    function fireWorker(address workerAddress) public onlyOwner{
        worker[workerAddress] = false;
    }

    event BuyPotato(address sender, uint paid, uint amount);
    function buyPotato(uint money) external payable{
        require( money>0 && money==(money/FEE)*FEE/*only send flat amounts*/ && active && BUSD.transferFrom(msg.sender, THIS, money));
        collections += money;
        emit BuyPotato(msg.sender, money, money/FEE);
    }

    event MintNotification(string inResponseTo, string notification);
    function mintNotification(string memory inResponseTo, string memory notification) external onlyOwner{
        emit MintNotification(inResponseTo, notification);
    }
}


interface ERC20 {
    function transferFrom(address from, address to, uint256 amount) external returns(bool);
    function transfer(address to, uint256 amount) external;
}
