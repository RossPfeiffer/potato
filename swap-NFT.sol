// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract SwapPotato{
    address THIS = address(this);
    address public contractOwner;
    address public beneficiary;
    NFT POTATO = NFT(0xC03aA832683181b7F4EF0AAcAccF47bbD9589397);
    mapping(address => bool) worker;
    uint public FEE;
    uint public collections;
    
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

    event SendPotato(address to, uint[] tokenIds);
    function sendPotato(address to, uint[] memory tokenIds) public onlyOwner{
        POTATO.transferFrom(THIS, to, tokenIds);
        emit SendPotato(to, tokenIds);
    }

    event PotatoReceived(address from, uint[] tokenIds)
    function onPotatoReceived(address from, uint[] memory tokenIds) external payable {
        require(msg.value == FEE);
        collections += FEE;
        emit PotatoReceived(from,tokenIds);
    }
}


interface NFT {
    function transferFrom(address from, address to, uint256[] memory tokenId) external;
}