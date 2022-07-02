pragma solidity ^0.8.14;
contract PotatoPool{
    address THIS = address(this);
    address contractOwner;
    NFT POTATO = NFT(0x000000000000000);
    mapping(address => bool) worker;
    
    constructor(){
        contractOwner = msg.sender;
    }

    function changeContractOwner(address newContractOwner) public{
        require( msg.sender == contractOwner );
        contractOwner = newContractOwner;
    }

    function setWorker(address workerAddress) public{
        require( msg.sender == contractOwner );
        worker[workerAddress] = true;
    }

    function fireWorker(address workerAddress) public{
        require( msg.sender == contractOwner );
        worker[workerAddress] = false;
    }

    event DockingPotato(address from, uint tokenId);
    function onERC721Received(address from, uint256 tokenId, bytes calldata data) external returns (bytes4){
        emit DockingPotato(from/* if it's from the machine, don't make an order ... if it's from someone else, make an order...*/, tokenId);
    }

    event SendPotato(address to, uint tokenId);
    function transferNFT(address to, uint tokenId){
        require( msg.sender     == contractOwner );
        POTATO.transferFrom(THIS, address to, uint256 tokenId);
        emit SendPotato(to, tokenId);
    }
}


abstract contract NFT {
    function transferFrom(address from, address to, uint256 tokenId) external;
}