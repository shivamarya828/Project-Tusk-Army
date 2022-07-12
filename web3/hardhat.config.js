require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "polygon_testnet",
  mocha: {
    timeout: 12000000
  },

  networks: {
    hardhat: {},
    polygon_testnet: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: ["e3a87a50bc1650b9ca6db9fec0a8ed9d20da5bd8ad149273bedea712f7860ae3"]
   
    },
    local: {
      url: "http://localhost:8545",
      accounts: ["0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd"], //this is temporary
      gasPrice: 20000000000,
      timeout: 40000000
    },
    polygon: {
      url: "https://rpc-mainnet.maticvigil.com/",
      accounts: ["a809eb8bee25fdbff28ab7e61d3f8c3bfdaaa9a059715452d6ff0c4f8a5bdb23"],
      gasPrice: 8000000000
    },     
    avax_testnet: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: ["01648c840511a5c6d513a73a3392562f03ac654ec47a94ef20cc0fc059df8313"]
      
    } 

  }

}




