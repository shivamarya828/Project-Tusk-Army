const hre = require("hardhat");

let VRF_COORDINATOR = '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255';
let LINK_TOKEN = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
let POLYGON_KEY = '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4';
let TOKEN_COUNT = 5;
async function main() {
    [owner] = await ethers.getSigners();
   
    const JungleRandom = await hre.ethers.getContractFactory("JungleRandom");
    const jungleRandom = await JungleRandom.deploy
      (VRF_COORDINATOR,
        LINK_TOKEN,
        POLYGON_KEY,
        TOKEN_COUNT);
    await jungleRandom.deployed();
    console.log("Animal Randomizer deployed to:", jungleRandom.address);   

    const LINK = await ethers.getContractAt("IToken", LINK_TOKEN);
    await LINK.transfer(jungleRandom.address, (0.001 * Math.pow(10, 18)).toString());
    console.log("Links transferred");

    await owner.sendTransaction({
        from: owner.address,
        to: jungleRandom.address,
        value: ethers.utils.parseEther("0.001"), // transfer matic to contract
        gasLimit: 8000000

    });
    console.log("matics transferred to randomiser");    
    await jungleRandom.connect(owner).setNftContractAddress("0x7ce90D26d89768e6020346Cb5B7062D4240b94D7");
    console.log("nft address set")

    await jungleRandom.connect(owner).requestRandomAnimal(owner.address);
    console.log("called request");    
    
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});