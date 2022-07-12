// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract AJungleV3 is ERC721, Pausable, Ownable, VRFConsumerBase {
   
    using Strings for uint256;
    bytes32 internal keyHash;
    uint256 internal fee;
    mapping(bytes32 => address) public requestIdToSender;
   
    uint16 public maxTokens;
    uint16[] public tokenIds;
    uint16 public lastMintedTokenId;

    constructor(
        address _VRFCoordinator,
        address _LinkToken,
        bytes32 _keyhash,
        uint16 _maxTokens
    ) ERC721("AJungle", "JNGLE") VRFConsumerBase(_VRFCoordinator, _LinkToken) {
        keyHash = _keyhash;
        fee = 0.001 * 10**18;
        maxTokens = _maxTokens;    
        
    }

    function populateTokenIds(uint16 _from, uint256 _to) external {
        for (uint16 i = _from; i < _to; i++) {
            tokenIds.push(i);
        }
    }

    enum Phase {
        WHITELISTSALE,
        PRESALE,
        PUBLICSALE
    }
    Phase public currentPhase;
    uint256 public wSalePrice;
    uint256 public preSalePrice;
    uint256 public pubSalePrice;
    uint256 public charityMintPrice;

    mapping(address => uint8) public wSale;
    mapping(address => uint8) public wFreeSale;
    mapping(address => uint8) public wCharitySale;

    function setPhase(Phase _phase) public onlyOwner {
        currentPhase = _phase;
    }

    function addWSale(address _address, uint8 _count) public onlyOwner {
        wSale[_address] = _count;
    }

    function addWFreeSale(address _address, uint8 _count) public onlyOwner {
        wFreeSale[_address] = _count;
    }

    function addCharitySale(address _address, uint8 _count) public onlyOwner {
        wCharitySale[_address] = _count;
    }

    function setWSalePrice(uint256 _price) public onlyOwner {
        wSalePrice = _price;
    }

    function setPubSalePrice(uint256 _price) public onlyOwner {
        pubSalePrice = _price;
    }

    function setPreSalePrice(uint256 _price) public onlyOwner {
        preSalePrice = _price;
    }

    function setCharityMintPrice(uint256 _price) public onlyOwner {
        charityMintPrice = _price;
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/bafybeif2kbb664pvgtue6ejffy35gwmsjubh25ak6f7wzfj5n6bql65tqm/";
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory baseURI = _baseURI();
        return
            bytes(baseURI).length > 0
                ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
                : "";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMintTo(address _to) external onlyOwner {
        require(currentPhase == Phase.PRESALE, "Not the phase for presale");
        require(wFreeSale[_to] > 0, "Not free whitelisted for presale");
        mintIt(_to);
        --wFreeSale[_to];
    }

    function safeMint() public payable {
        if (wCharitySale[msg.sender] > 0) {
            require(
                msg.value >= charityMintPrice,
                "Charity Payment amount not correct"
            );
            mintIt(msg.sender);
            --wCharitySale[msg.sender];
        } else if (currentPhase == Phase.PRESALE) {
            require(
                msg.value == preSalePrice,
                "Presale Payment amount not correct"
            );
            mintIt(msg.sender);
        } else if (currentPhase == Phase.WHITELISTSALE) {
            require(wSale[msg.sender] > 0, "Ran out of limit");
            require(
                msg.value == wSalePrice,
                "Whitelist Payment amount not correct"
            );
            mintIt(msg.sender);
            --wSale[msg.sender];
        } else {
            require(
                msg.value == pubSalePrice,
                "Public sale payment amount not enough"
            );
            mintIt(msg.sender);
        }
    }

    function mintIt(address _to) private {
        bytes32 requestId = requestRandomness(keyHash, fee);
        requestIdToSender[requestId] = _to;
    }

    function fulfillRandomness(bytes32 _requestId, uint256 _randomNumber)
        internal
        override
    {
        address minter = requestIdToSender[_requestId];
        uint256 modded = _randomNumber % tokenIds.length;
        uint16 tokenId = tokenIds[modded];
        tokenIds[modded] = tokenIds[tokenIds.length - 1];
        tokenIds.pop();
        _safeMint(minter, tokenId);
        lastMintedTokenId = tokenId;
    }

    receive() external payable {}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
