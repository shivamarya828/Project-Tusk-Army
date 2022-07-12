// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract AJungle is ERC721, Pausable, Ownable {
    using Counters for Counters.Counter;

    uint256 public publicSalePrice;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("AJungle", "JNGLE") {}

    event MintAllowed(address, uint256);

    mapping(address => mapping(uint256 => uint256)) public discountWhiteList;
    mapping(address => uint256) public regularWhiteList;
    bool public isPreSaleRunning;

    function safeMint() public payable {
        if (isPreSaleRunning) {
            if (
                regularWhiteList[msg.sender] > 0 &&
                msg.value >= regularWhiteList[msg.sender]
            ) {
                safeMint(msg.sender);
                regularWhiteList[msg.sender] = 0;
            } else if (discountWhiteList[msg.sender][msg.value] > 0) {
                //the price is paied in the non parameterized safeMint call
                safeMint(msg.sender);
                unchecked {
                    --discountWhiteList[msg.sender][msg.value];
                }
            }
        } else {
            if (msg.value >= publicSalePrice) {
                safeMint(msg.sender);
            } else {
                revert('payment too low');
            }
        }
    }

    function whiteList(
        address _user,
        uint256 _at_price,
        uint256 _allowed
    ) public onlyOwner {
        discountWhiteList[_user][_at_price] = _allowed;
    }

    function setPublicSalePrice(uint256 _price) public onlyOwner {
        publicSalePrice = _price;
    }

    function whiteListOf(address _user, uint256 _price)
        public
        view
        returns (uint256)
    {
        return discountWhiteList[_user][_price];
    }

    function _baseURI() internal pure override returns (string memory) {
        return
            "https://ipfs.io/ipfs/bafybeif2kbb664pvgtue6ejffy35gwmsjubh25ak6f7wzfj5n6bql65tqm/";
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function closePresale(bool update) public onlyOwner {
        isPreSaleRunning = update;
    }

    function addRegWhiteList(address _lister, uint256 _price) public onlyOwner {
        regularWhiteList[_lister] = _price;
    }

    function safeMint(address to) public payable {
        
        //if (msg.value >= publicSalePrice) {
            uint256 tokenId = _tokenIdCounter.current();
            _tokenIdCounter.increment();
            _safeMint(to, tokenId);
        //} else {
          //  revert("payment too low");
        //}
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, tokenId);
    }
}
