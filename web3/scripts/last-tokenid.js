const hre = require("hardhat");


async function main() {
    [owner] = await ethers.getSigners();
   
    const AJungleV3 = await hre.ethers.getContractFactory("AJungleV3");
    const aJungleV3 = await AJungleV3.attach("0x58b8994f4b0d916BFaD55AE4079D70d4FaD00f0B");    
    console.log("Jungle NFT found at:", aJungleV3.address);
   
    let lastToken = await aJungleV3.connect(owner).lastMintedTokenId();
    console.log(lastToken);
    
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});