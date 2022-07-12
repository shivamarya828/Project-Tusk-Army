const hre = require("hardhat");

let VRF_COORDINATOR = '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255';
let LINK_TOKEN = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
let POLYGON_KEY = '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4';
let TOKEN_COUNT = 1000;
async function main() {
    [owner] = await ethers.getSigners();

    const AJungleV3 = await hre.ethers.getContractFactory("AJungleV4");
    const aJungleV3 = await AJungleV3.deploy(TOKEN_COUNT);
    await aJungleV3.deployed();
    console.log("Jungle NFT deployed to:", aJungleV3.address);

    /*const LINK = await ethers.getContractAt("IToken", LINK_TOKEN);
    await LINK.transfer(aJungleV3.address, (0.001 * Math.pow(10, 18)).toString());
    console.log("Links transferred");*/

    /*await owner.sendTransaction({
        from: owner.address,
        to: aJungleV3.address,
        value: ethers.utils.parseEther("0.001"), // transfer matic to contract
        gasLimit: 30000000

    });*/

    for (var i = 1; i <= TOKEN_COUNT; i++) {

        await aJungleV3.connect(owner).safeMintTo(owner.address);
        let lastToken = await aJungleV3.connect(owner).lastTokenMinted();
        console.log(lastToken.toNumber());
    }


}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});