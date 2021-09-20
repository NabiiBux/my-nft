//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
//pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract RoyaltiesNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address public artist;
    address public txFeeToken;
    uint public txFeeAmount;
    mapping(address => bool) public excludedList;

    constructor(address _artist, address _txFeeToken, uint _txFeeAmount) 
    public ERC721("RoyaltiesNFT", "RNFT") {
        artist = _artist;
        txFeeToken = _txFeeToken;
        txFeeAmount = _txFeeAmount;
        excludedList[_artist] = true;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
    
    // Only the artist can remove or add addresses excluded from the royalty payment.
    function setExcluded(address excluded, bool status) external {
        require(
            msg.sender == artist, 
            'artist only'
        );
        excludedList[artist] = status;
    }

    // An override in the ERC721 transferFrom fn to allow for the royalty payment
    function transferFrom(address from, address to, uint256 tokenId) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId), 
            'ERC721: transfer caller is not owner nor approved'
        );
        if(excludedList[from] == false) {
            _payTxFee(from);
        }
        _transfer(from, to, tokenId);
    }

// Checks to see if recipient can accept ERC721 token format
    function safeTransferFrom(address from, address to, uint256 tokenId) public override {
        if(excludedList[from] == false) {
            _payTxFee(from);
        }
        safeTransferFrom(from, to, tokenId, '');
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public override {
        require(
            _isApprovedOrOwner(_msgSender(), tokenId), 
            'ERC721: transfer caller is not owner nor approved'
        );
        if(excludedList[from] == false) {
            _payTxFee(from);
        }
        _safeTransfer(from, to, tokenId, _data);
    }

// Custom artist payment fn uses IERC20 format to avoid the payable keyword usage (cant use with transferFrom override)
    function _payTxFee(address from) internal {
        IERC20 token = IERC20(txFeeToken);
        token.transferFrom(from, artist, txFeeAmount);
    }
}