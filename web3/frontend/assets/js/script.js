
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

    await preSaleCheck(account);
    //await getPresalePrice(account);
    await getPubSalePrice(account);
  });
  var contract
  async function initContract() {
    let web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:8545");
    var contractAddress = '0x538D2755B5Fb9A4f7c5769bdcf5103E569D6E241';
    var abi = [
      {
        "inputs": [],
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
            "indexed": false,
            "internalType": "address",
            "name": "",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "MintAllowed",
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
            "name": "_lister",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "addRegWhiteList",
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
        "inputs": [
          {
            "internalType": "bool",
            "name": "update",
            "type": "bool"
          }
        ],
        "name": "closePresale",
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
          },
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "discountWhiteList",
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
        "name": "isPreSaleRunning",
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
        "inputs": [],
        "name": "publicSalePrice",
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
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "name": "regularWhiteList",
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
        "name": "renounceOwnership",
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
          }
        ],
        "name": "safeMint",
        "outputs": [],
        "stateMutability": "payable",
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
        "name": "setPublicSalePrice",
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
            "name": "_user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_at_price",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_allowed",
            "type": "uint256"
          }
        ],
        "name": "whiteList",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "_user",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_price",
            "type": "uint256"
          }
        ],
        "name": "whiteListOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ];
    contract = new web3.eth.Contract(abi, contractAddress);
  }

  $("#get_discount_whitelist").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    await getDiscountWhiteList(account);

  });

  $("#add_discount_whitelist").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    console.log(account);

    await addDiscountWhiteList(account);

  });

  $("#mint").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    await mint(account);

  });

  $("#presale_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    await setPresale(account);

  });


  $("#publicsale_price_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    contract.methods
      .setPublicSalePrice($('#publicsale_price').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  });

  $("#add_whitelist_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    await addRegWhiteListPrice(account);

  });

  $("#get_whitelist_button").click(async function async() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];

    await getRegWhiteListPrice(account);

  });
  async function mint(account) {

    contract.methods
      .safeMint()
      .send({ from: account, value: $('#pay').val() }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  }

  async function addDiscountWhiteList(account) {
    console.log(account)
    contract.methods
      .whiteList($('#discount_address').val(), $('#discount_price').val(), $('#discount_count').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  }


  async function getDiscountWhiteList(account) {

    var output = await contract.methods
      .whiteListOf($('#discount_address').val(), $('#discount_price').val())
      .call({ from: account });
    $('#discount_count').val(output);

  }

  async function preSaleCheck(account) {

    var output = await contract.methods
      .isPreSaleRunning()
      .call({ from: account });
    $('#presale').val(output);

  }

  async function setPresale(account) {

    contract.methods
      .closePresale($('#presale').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  }


  async function getPubSalePrice(account) {

    var output = await contract.methods
      .publicSalePrice()
      .call({ from: account });
    console.log(output);
    $('#publicsale_price').val(output);

  }

  async function addRegWhiteListPrice(account) {

    await contract.methods
      .addRegWhiteList($('#whitelist_address').val(), $('#whitelist_address_price').val())
      .send({ from: account }, function (err, res) {
        if (err) {
          console.log("An error occured", err)
          return
        }
        console.log("Hash of the transaction: " + res)
      })
  }

  async function getRegWhiteListPrice(account) {
    var output = await contract.methods
      .regularWhiteList($('#whitelist_address').val())
      .call({ from: account });
    console.log(output);
    $('#whitelist_address_price').val(output);

  }


});
