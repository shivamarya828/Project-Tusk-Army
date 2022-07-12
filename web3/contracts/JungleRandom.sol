// // SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "./AJungleV3.sol";

// a nft can be minted in 3 ways
// a free nft at standard chance that can be minted in internal sale or public sale
// a paid nft at standard chance that can be minted in public sale
// a paid nft at better chance that can be minted in internal sale or public sale
// - better means common NFTs are taken out of randomization
//

contract JungleRandom is Pausable, Ownable, VRFConsumerBase {
    // events
    event RequestRandom(bytes32 requestId);
    event DeliverRandom(
        bytes32 requestId,
        uint256 randomNumber,
        address buyerAddress,
        bool isBetterChance
    );
    address payable public nftContract;
    event Debug(string _log);
    event DebugNum(uint _log);
    bytes32 internal keyHash;
    uint256 internal fee;
    mapping(bytes32 => address) public requestIdToSender;

    uint16 public maxTokens;
    uint16[] public tokenIds;

    constructor(
        address _VRFCoordinator,
        address _LinkToken,
        bytes32 _keyhash,
        uint16 _maxTokens
    ) VRFConsumerBase(_VRFCoordinator, _LinkToken) {
        keyHash = _keyhash;
        fee = 0.001 * 10**18;
        maxTokens = _maxTokens;
        for (uint16 i = 1; i < _maxTokens; i++) {
            tokenIds.push(i);
        }
    }

    function requestRandomAnimal(address _requester) external {
        //require(nftContract == msg.sender, "you are not from the jungle!");
        //require(tokenIds.length > 0, "All Nfts minted!");
        emit Debug("got call from nft into randomizer"); 
        bytes32 requestId = requestRandomness(keyHash, fee);
         emit Debug("req snt frm randomizer to vrf");
        requestIdToSender[requestId] = _requester;
    }

    function fulfillRandomness(bytes32 _requestId, uint256 _randomNumber)
        internal
        override
    {
        emit Debug("got call back call from VRF into randomizer");
        emit DebugNum(_randomNumber);

        address buyerAddress = requestIdToSender[_requestId];        
        uint256 modded = _randomNumber % tokenIds.length;
        uint16 randNo = tokenIds[modded];
        emit Debug("got the array length");

        tokenIds[modded] = tokenIds[tokenIds.length - 1];

        emit Debug("replaced");
        tokenIds.pop();
        emit Debug("popped");
       // AJungleV3 aJungleNft = AJungleV3(nftContract);
        emit Debug("sent to nft");
       // aJungleNft.recieveTokenId(buyerAddress, randNo);
    }

    function setNftContractAddress(address payable _nftContract)
        public
        onlyOwner
    {
        nftContract = _nftContract;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    receive() external payable {}
}
