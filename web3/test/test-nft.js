const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require('fs')
/**
 * @author -Yash Sharma
 * Test - Deployment
 * Loan Start
 * Repayment Amount check
 *  
 */

describe("Jungle NFT Tests", function () {
  let owner;
  let borrower;
  let user;
  let nft;

  beforeEach(async function () {
    [owner, borrower, user] = await ethers.getSigners();
    const NFT = await hre.ethers.getContractFactory("AJungleV3");
    nft = await NFT.deploy();
    await nft.deployed();
    console.log("AJungle NFT deployed to:", nft.address);

    const JungleRandom = await hre.ethers.getContractFactory("JungleRandom");
    const jungleRandom = await JungleRandom.deploy
      ('0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
        '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
        '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4',
        10000);
    await jungleRandom.deployed();
    console.log("Animal Randomizer deployed to:", jungleRandom.address);

    await nft.connect(owner).setJungleRandomAddress(jungleRandom.address);
    await jungleRandom.connect(owner).setNftContractAddress(nft.address);
    console.log("Addresses set");


  })

  it("Random Test Local 1 - 10000", async function () {
    for (let index = 0; index < 10000; index++) {
      const tx = await nft.connect(owner).test();
      const recipt = await tx.wait();
      console.log(recipt.events[0].args[0]);
      fs.appendFile('tokenId.txt', recipt.events[0].args[0]+'\n', (err) => {
      
        // In case of a error throw err.
        if (err) throw err;
    })
    
    }
  }).timeout(400000000);



});