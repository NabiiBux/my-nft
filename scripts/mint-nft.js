require('dotenv').config()
const { API_URL, PUBLIC_KEY, PRIVATE_KEY }= process.env
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/RoyaltiesNFT.sol/RoyaltiesNFT.json")
const contractAddress = "0x78F566C2f2607E2811cFd142de970757925b6E95" // TODO
const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY);

    const tx = {
        'from': PUBLIC_KEY,
        'to': contractAddress,
        'nonce': nonce,
        'gas': 500000,
        'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function(err, hash) { 
                    if (!err) {
                        console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!")
                    } else {
                        console.log("Something went wrong when submitting your transaction:", err)
                    }
                }
            )
        })
        .catch(err => console.log("Sign promise failed: ", err))
}

//mintNFT("https://gateway.pinata.cloud/ipfs/QmUoZ5j7C4C9cv7HqkTHPuG5tGhHZiSZrBzqh4btumC6VB")
module.exports = { mintNFT };