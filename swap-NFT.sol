// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract SwapPotato{
    address THIS = address(this);
    address public contractOwner;
    address public beneficiary;
    address potatoAddress = 0x0A72ffd37b8eb9cC72A9abF6B15d6Dac9d0BFA89;
    NFT POTATO = NFT(potatoAddress);
    mapping(address => bool) worker;
    uint public FEE;
    uint public collections;
    bool active = true;
    
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


    function setWorker(address workerAddress) public onlyOwner{
        worker[workerAddress] = true;
    }

    function fireWorker(address workerAddress) public onlyOwner{
        worker[workerAddress] = false;
    }

    event SendPotato(address to, uint[] tokenIds, string inResponseTo);
    function sendPotato(address to, uint[] memory tokenIds, string memory inResponseTo) public onlyOwner{
        POTATO.transferFrom(THIS, to, tokenIds);
        emit SendPotato(to, tokenIds, inResponseTo);
    }

    event PotatoReceived(address from, uint[] tokenIds, bytes32 forWhom);
    function onPotatoReceived(address from, uint[] memory tokenIds, bytes32 forWhom) external payable returns(bytes32){
        uint cost = FEE * tokenIds.length;
        require(msg.value == cost && msg.sender == potatoAddress && active);
        collections += cost;
        emit PotatoReceived(from,tokenIds, forWhom);
    }

    event Notification(string inResponseTo, string notification);
    function notification(string memory inResponseTo, string memory note) external onlyOwner{
        emit Notification(inResponseTo, note);
    }
}


interface NFT {
    function transferFrom(address from, address to, uint256[] memory tokenId) external;
}