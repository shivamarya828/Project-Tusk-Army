const hre = require("hardhat");
let LINK_TOKEN = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';


async function main() {
    [owner] = await ethers.getSigners();

    const AJungleV3 = await hre.ethers.getContractFactory("AJungleV3");
    const aJungleV3 = await AJungleV3.attach("0x1550506677F46D7798F867C53653B11f155A6b51");
    console.log("Jungle NFT found at:", aJungleV3.address);
    await aJungleV3.connect(owner).setPhase(1);
    console.log("phase set to presale:");
    await aJungleV3.connect(owner).addWFreeSale("0xe5f69f9a56239c6E1511D652Dd94f0eb6BD6a9B3", 30);
    console.log("white listed");
    for (var i = 0; i < 2; i++) {
        const LINK = await ethers.getContractAt("IToken", LINK_TOKEN);
        await LINK.transfer(aJungleV3.address, (0.001 * Math.pow(10, 18)).toString());
        console.log("Links transferred");
        await aJungleV3.connect(owner).safeMintTo("0xe5f69f9a56239c6E1511D652Dd94f0eb6BD6a9B3", { gasLimit: 8000000 });
        console.log("minted");
        let lastToken = await aJungleV3.connect(owner).lastMintedTokenId();
        console.log(lastToken);
    }
   

}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});