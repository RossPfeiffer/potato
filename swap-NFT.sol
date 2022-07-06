// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract SwapPotato{
    address THIS = address(this);
    address contractOwner;
    NFT POTATO = NFT(0xC03aA832683181b7F4EF0AAcAccF47bbD9589397);
    mapping(address => bool) worker;
    
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
}


interface NFT {
    function transferFrom(address from, address to, uint256[] memory tokenId) external;
}