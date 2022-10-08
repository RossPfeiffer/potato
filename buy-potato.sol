// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract PotatoBuy{
    address THIS = address(this);
    address public contractOwner;
    address public beneficiary;
    mapping(address => bool) worker;
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
    function buyPotato() external payable{
        uint money = msg.value;
        require( money>0 && money==(money/FEE)*FEE/*only send flat amounts*/ && active );
        collections += money;
        emit BuyPotato(msg.sender, money, money/FEE);
    }
    
    //lazy admin controls
    event Batchmint(address destination, uint amount);
    function batchmint(address destination, uint amount) public onlyOwner{
        emit Batchmint(destination, amount);
    }
}