const { ethers } = require("hardhat")

async function main() {
    const MyNFT = await ethers.getContractFactory("MyNFT")

    const myNFT = await MyNFT.deploy()
    console.log("Contract deployed to address", myNFT.address)
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.log(err)
        process.exit(1)
    })