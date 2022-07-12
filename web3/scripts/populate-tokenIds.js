const hre = require("hardhat");

let VRF_COORDINATOR = '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255';
let LINK_TOKEN = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';
let POLYGON_KEY = '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4';
async function main() {
    [owner] = await ethers.getSigners();
   
    const AJungleV3 = await hre.ethers.getContractFactory("AJungleV3");
    const aJungleV3 = await AJungleV3.attach("0x1550506677F46D7798F867C53653B11f155A6b51");
    console.log("Jungle NFT found at:", aJungleV3.address);

    //for (var i = 1; i < 10; i++) {
        //console.log("populating "+i*1000 + " to  "+ (i*1000 +1000));
        //await aJungleV3.connect(owner).populateTokenIds(i*100, i*100+ 100);
    //}
    await aJungleV3.connect(owner).populateTokenIds(1, 26);
    console.log("populated request");

}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});