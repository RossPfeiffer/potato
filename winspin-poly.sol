// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract WinSpin{
    address THIS = address(this);
    address contractOwner;
    address public beneficiary;
    mapping(address => bool) worker;
    uint public FEE;
    uint public collections;
    bool active;

    constructor(){
        contractOwner = msg.sender;
    }

    modifier onlyOwner {
      require(msg.sender == contractOwner || worker[msg.sender]);
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


    function setWorker(address workerAddress) public  onlyOwner{
        worker[workerAddress] = true;
    }

    function fireWorker(address workerAddress) public  onlyOwner{
        worker[workerAddress] = false;
    }

    event SpinWheel(address spinner);
    function spinWheel() external payable ifActive{
        address sender = msg.sender;
        require( msg.value == FEE );
        collections += FEE;
        emit SpinWheel(sender);
    }

    event SpinWheelNotification(string inResponseTo, string notification);
    function spinWheelNotification(string memory inResponseTo, string memory notification) external onlyOwner{
        emit SpinWheelNotification(inResponseTo, notification);
    }
}

