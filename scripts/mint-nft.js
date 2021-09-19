require('dotenv').config()
const { API_URL, PUBLIC_KEY, PRIVATE_KEY }= process.env
const { createAlchemyWeb3 } = require('@alch/alchemy-web3')
const web3 = createAlchemyWeb3(API_URL)

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json")
const contractAddress = "0xb1f9486bf3a8b9fe898c12491faa83a41bd7dc55"
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

mintNFT("https://gateway.pinata.cloud/ipfs/QmSzkrBwf9wJNTSDtHV9CbRgubueHJ5psQU57FbwJ25djU")