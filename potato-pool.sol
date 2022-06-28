pragma solidity ^0.8.14;
contract PotatoPool{

    address contractOwner;
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
}