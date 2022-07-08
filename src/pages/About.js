import React, { useState, useEffect } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBFile
} from 'mdb-react-ui-kit';
import { FileUpload, ImageUpload } from 'react-ipfs-uploader';
import abi from '../components/abi.json';
import MetaMaskAuth from "../Authenticate.js";
import { ethers } from "ethers";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import LoadingSpin from "react-loading-spin";
import '../App.css';

export default function About() {




return(
  <div className = 'invert-this text-center'>
    <br></br>
    <p>I created this app to teach myself how to allow users to mint an NFT 
  while simultaneously using IPFS as a means to store NFT attributes. A one-stop shop.</p>
    <br></br>
    <p><strong>Specifications: </strong></p>
    <br></br>
    <div className = 'left'>
    <p>1. I used both ipfs-http-client and react-ipfs-uploader to allow users to upload their NFT image asset and 
      corresponding metadata to IPFS simultaneously while minting their NFT
    </p>
    <p>2. I utilized alchemy-SDK to pull in all available NFTs owned by the connected user
    </p>
    <p>3. I built and deployed the basic NFT contract which inherits from the ERC721 standard, ERC721URIStorage, and Ownable contracts. 
      Check it out at Goerli's Etherscan: <a href='https://goerli.etherscan.io/address/0x5cf7eff3a4f0face1b43c7d4040062dd74de9630'> Link </a>
    </p>
    <p>Go ahead and mint some NFTs for yourself! 
    </p>
    </div>
     </div>
)

}