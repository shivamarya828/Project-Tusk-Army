
$(document).ready(function () {


  // toggle mobile menu
  $('[data-toggle="toggle-nav"]').on('click', function () {
    $(this).closest('nav').find($(this).attr('data-target')).toggleClass('hidden');
    return false;
  });

  // feather icons
  feather.replace();

  // smooth scroll
  var scroll = new SmoothScroll('a[href*="#"]');

  // tiny slider
  $('#slider-1').slick({
    infinite: true,
    prevArrow: $('.prev'),
    nextArrow: $('.next'),
  });

  $('#slider-2').slick({
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: true,
    customPaging: function (slider, i) {
      return '<div class="bg-white br-round w-1 h-1 opacity-50 mt-5" id=' + i + '> </div>'
    },
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    },]
  });

  $("#connect_wallet").click(async function async() {

    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    $("#connect_wallet").text(account);
    await initContract();
    //await getBalances();
    await phaseCheck(account);
    await wSalePrice(account);
    await pubSalePrice(account);
    await preSalePrice(account);
    await wCharitySalePrice(account);

  	
  var contract
  async function initContract() {
    let web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
    var contractAddress = '0x1550506677F46D7798F867C53653B11f155A6b51';
    var abi = [
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_VRFCoordinator",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_LinkToken",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "_keyhash",
            "type": "bytes32"
          },
          {
            "internalType": "uint16",
            "name": "_maxTokens",
            "type": "uint16"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "approved",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "ApprovalForAll",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "Paused",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": false,
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "Unpaused",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "_count",
            "type": "uint8"
          }
        ],
        "name": "addCharitySale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "_count",
            "type": "uint8"
          }
        ],
        "name": "addWFreeSale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_address",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "_count",
            "type": "uint8"
          }
        ],
        "name": "addWSale",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "charityMintPrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "currentPhase",
        "outputs": [
          {
            "internalType": "enum AJungleV3.Phase",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "getApproved",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          }
        ],
        "name": "isApprovedForAll",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "lastMintedTokenId",
        "outputs": [
          {
            "internalType": "uint16",
            "name": "",
            "type": "uint16"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "maxTokens",
        "outputs": [
          {
            "internalType": "uint16",
            "name": "",
            "type": "uint16"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "owner",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "paused",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint16",
            "name": "_from",
            "type": "uint16"
          },
          {
            "internalType": "uint256",
            "name": "_to",
            "type": "uint256"
          }
        ],
        "name": "populateTokenIds",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "preSalePrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "pubSalePrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "requestId",
            "type": "bytes32"
          },
          {
            "internalType": "uint256",
            "name": "randomness",
            "type": "uint256"
          }
        ],
        "name": "rawFulfillRandomness",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "name": "requestIdToSender",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_to",
            "type": "address"
          }
        ],
        "name": "safeMintTo",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "_data",
            "type": "bytes"
          }
        ],
        "name": "safeTransferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "operator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "approved",
            "type": "bool"
          }
        ],
        "name": "setApprovalForAll",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "setCharityMintPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "enum AJungleV3.Phase",
            "name": "_phase",
            "type": "uint8"
          }
        ],
        "name": "setPhase",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "setPreSalePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "setPubSalePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "setWSalePrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes4",
            "name": "interfaceId",
            "type": "bytes4"
          }
        ],
        "name": "supportsInterface",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "tokenIds",
        "outputs": [
          {
            "internalType": "uint16",
            "name": "",
            "type": "uint16"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenURI",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "newOwner",
            "type": "address"
          }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "unpause",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "wCharitySale",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "wFreeSale",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "wSale",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "wSalePrice",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ];
    contract = new web3.eth.Contract(abi, contractAddress);

  }
  async function phaseCheck(account) {
    var output = await contract.methods
      .currentPhase()
      .call({ from: account });
    $('#phase').val(output);
  }

  $("#phase_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var output = await contract.methods
      .setPhase($('#phase').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      });

  });

  $("#wSale_check_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var output = await contract.methods
      .wSale($('#wSale').val())
      .call({ from: account });
    $('#wSaleCount').val(output);
  });
  $("#wSale_update_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .addWSale($('#wSale').val(), $('#wSaleCount').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });

  $("#wFreeSale_check_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var output = await contract.methods
      .wFreeSale($('#wFreeSale').val())
      .call({ from: account });
    $('#wFreeSaleCount').val(output);
  });
  $("#wFreeSale_update_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .addWFreeSale($('#wFreeSale').val(), $('#wFreeSaleCount').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });
  async function wSalePrice(account) {

    var output = await contract.methods
      .wSalePrice()
      .call({ from: account });
    $('#wSalePrice').val(output);
  }
  $("#wSale_price_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .setWSalePrice($('#wSalePrice').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });

  async function pubSalePrice(account) {
    var output = await contract.methods
      .pubSalePrice()
      .call({ from: account });
    $('#pubSalePrice').val(output);
  }
  $("#pubSalePrice_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .setPubSalePrice($('#pubSalePrice').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });

  async function preSalePrice(account) {
    var output = await contract.methods
      .preSalePrice()
      .call({ from: account });
    $('#preSalePrice').val(output);
  }
  $("#preSalePrice_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .setPreSalePrice($('#preSalePrice').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });
  $("#mint_admin_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .safeMintTo($('#mint_address').val())
      .send({ from: account, value: $('#mint_payment').val() }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });
  $("#mint_myself_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .safeMint()
      .send({ from: account, value: $('#mint_payment').val() }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });

  $("#getBalance_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var output = await contract.methods
      .balanceOf($('#address').val())
      .call({ from: account });
    $('#balance').text("Balance :" + output);

   
  });

  $("#getToken_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var output = await contract.methods
      .ownerOf($('#tokenId').val())
      .call({ from: account });
    $('#owner').text("Owner :" + output);

    output = await contract.methods
      .tokenURI($('#tokenId').val())
      .call({ from: account });
    $('#tokenUri').text("TokenUri :" + output);
  });

  $("#mint_charity").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
    .safeMint()
    .send({ from: account, value: $('#donation').val() }, function (err, res) {
      if (err) {
        console.log("An error occured", err)
        return
      }
      console.log("Hash of the transaction: " + res)
    })
  });

  async function wCharitySalePrice(account) {

    var output = await contract.methods
      .charityMintPrice()
      .call({ from: account });
    $('#charity_price').val(output);
  }
  $("#charitySalePrice_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .setCharityMintPrice($('#charity_price').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });

  $("#wCharitySale_check_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    var output = await contract.methods
      .wCharitySale($('#wCharitySale').val())
      .call({ from: account });
    $('#wCharitySaleCount').val(output);
  });
  $("#wCharitySale_update_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    await contract.methods
      .addCharitySale($('#wCharitySale').val(), $('#wCharitySaleCount').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });

});
