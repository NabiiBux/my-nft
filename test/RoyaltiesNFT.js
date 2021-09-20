const { inputToConfig } = require('@ethereum-waffle/compiler');
//const { ethers } = require('@ethereum-waffle/provider/node_modules/ethers');
const { ethers } = require("hardhat");
const { expect, use } = require('chai')
const { mintNFT } = require('../scripts/mint-nft');
const { deploy } = require('../scripts/deploy');

const {Contract} = require('ethers');
const {deployContract, MockProvider, solidity} = require('ethereum-waffle');

//const RoyaltiesNFT = require('../artifacts/contracts/RoyaltiesNFT.sol/RoyaltiesNFT.json')

use(solidity);

describe('RoyaltiesNFT', async () => {
    //let admin, artist, owner1, owner2;
    const txFee = ethers.utils.parseUnits('1', 'ether');
    //let token, royaltiesNFT;

    const [wallet, walletTo, walletArtist] = new MockProvider().getWallets();
    console.log('wallets!!!!!!', walletArtist)
    RoyaltiesNFT = await ethers.getContractFactory("RoyaltiesNFT");
    const  hardhatToken = await RoyaltiesNFT.deploy(walletArtist.address,  wallet.address, txFee);//await deploy();
    
    const ownerBalance = hardhatToken.balanceOf(wallet.address)
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    // beforeEach(async () => {
    //     token = await deployContract(walletArtist, Token, [1000]);
    //     await token.deployed()
    //     console.log('deployed')
    // //     ([admin, artist, owner1, owner2] = await ethers.getSigners());
    // //     const Token = await ethers.getContractFactory('MockToken');
    // //     token = await Token.deploy();
    // //     console.log('waiting on deployed Token')
    // //     await token.deployed(); 
    // //     console.log('about to do first transfer', owner1.address)
    // //     await token.transfer(
    // //         owner1.address,
    // //         ethers.utils.parseUnits('500', 'ether')
    // //     )
    // //     await token.transfer(
    // //         owner2.address,
    // //         ethers.utils.parseUnits('500', 'ether')
    // //     )
    // //     console.log('All fake money transferred')
    // //     const RoyaltiesNFT = ethers.getContractFactory('RoyaltiesNFT');
    // //     royaltiesNFT = await RoyaltiesNFT.deploy(artist.address, token.address, txFee)
    // //     await royaltiesNFT.deployed(); 
    // //     console.log('token address', token.address)   
    // //     console.log('royaltiesNFT address', royaltiesNFT.address) 
    // //     await mintNFT("https://gateway.pinata.cloud/ipfs/QmUoZ5j7C4C9cv7HqkTHPuG5tGhHZiSZrBzqh4btumC6VB");
    // //     //done();
    // });

    // it('Assigns initial balance', async () => {
    //     expect(await token.balanceOf(wallet.address)).to.equal(0);
    //   });

    // it('Should transfer NFT and pay royalties', async () => {
    //     let ownerNFT, balanceSender, balanceArtist;

    //     royaltiesNFT = royaltiesNFT.connect(artist);
    //     await royaltiesNFT.transferFrom(
    //         artist.address,
    //         owner1.address,
    //         0
    //     )
    //     ownerNFT = await royaltiesNFT.ownerOf(0);
    //     expect(ownerNFT)
    //     .to
    //     .equal(owner1.address)

    //     await token.connect(owner1).approve(royaltiesNFT.address, txFee);
    //     await royaltiesNFT.connect(owner1).transferFrom(
    //         owner1.address,
    //         owner2.address,
    //         0
    //     );
    //     ownerNFT = await royaltiesNFT.ownerOf(0);
    //     balanceSender = await token.balanceOf(owner1.address);
    //     balanceArtist = await token.balanceOf(artist.address);
    //     expect(ownerNFT)
    //         .to
    //         .equal(owner2.address);
    //     expect(balanceSender.toString())
    //         .to 
    //         .equal(ethers.utils.parseUnits('499', 'ether'));
    //     expect(balanceArtist.toString())
    //         .to 
    //         .equal(ethers.utils.parseUnits('1', 'ether'));

    // });
    
}) 