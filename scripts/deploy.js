const { ethers } = require("hardhat")

async function main() {
    const RoyaltiesNFT = await ethers.getContractFactory("RoyaltiesNFT")

    const myNFT = await RoyaltiesNFT.deploy()
    console.log("Contract deployed to address", myNFT.address)
}

main()
    .then(() => process.exit(0))
    .catch(err => {
        console.log(err)
        process.exit(1)
    })