// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;
contract PotatoDuel{
    address THIS = address(this);
    address public contractOwner;
    address public beneficiary;
    address potatoAddress = 0x2c9B0abC2d52d48cB4831dB4aAaC1801762856B1;
    address bridge = 0x27792F8198e0685e6d1577cA8a463788D060cd8a;
    NFT POTATO = NFT(potatoAddress);
    mapping(address => bool) worker;
    uint public FEE;
    uint public collections;

    uint duels;
    
    constructor(){
        contractOwner = msg.sender;
    }

    modifier onlyOwner {
      require(msg.sender == contractOwner || worker[msg.sender]) ;
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

    struct PotatoTicket{
        uint playerPotato;
        uint wildPotato;
        bool WIN_LOSE;
        bool finished;
        address player;
    }

    mapping(uint => PotatoTicket) potatoTickets;
    event PotatoReceived(address from, uint[] tokenIds);
    event PotatoDuelGo(address duelist, uint rarity, uint potatoID, uint duelID);
    function onPotatoReceived(address from, uint[] memory tokenIds) external payable returns(bytes32){
        require(msg.value == FEE && msg.sender == potatoAddress && tokenIds.length == 1);
        collections += FEE;
        uint potatoID = tokenIds[0];
        PotatoTicket storage potatoTicket = potatoTickets[duels];
        potatoTicket.playerPotato = potatoID;
        potatoTicket.player = from;

        (,,,,,,,,,, uint rarityrank,) = POTATO.getPotatoData(potatoID);

        emit PotatoDuelGo(from, rarityrank, potatoID, duels);
        duels += 1;
        emit PotatoReceived(from, tokenIds);
        return bytes32(duels-1);
    }

    //overkill
    /*function finalizeDuel(uint duelID, uint wildPotatoID, bool WIN) public onlyOwner{
        PotatoTicket storage potatoTicket = potatoTickets[duelID];
        require(!potatoTicket.finished);
        potatoTicket.finished = true;
        potatoTicket.WIN_LOSE = WIN;
        potatoTicket.wildPotato = wildPotatoID;
        address to;
        if(WIN){//they won so they get their potato back
            to = potatoTicket.player;
        }else{
            to = beneficiary;//There's an ERC20 on the bridge for this potato, so what do we do with that and this potato?
        }
        POTATO.transferFrom(THIS, to, potatoTicket.playerPotato );
    }*/
}


interface NFT {
    function transferFrom(address from, address to, uint256 tokenId) external;
    function getPotatoData(uint tokenId) external view returns(
        address owner,
        uint background,
        uint leftArm,
        uint rightArm,
        uint hat,
        uint ears,
        uint eyes,
        uint nose,
        uint mouth,
        uint shoes,
        uint rarityrank,
        uint metascore);
}