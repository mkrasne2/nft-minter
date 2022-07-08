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

function Mint() {
 
  const [imageUrl, setImageUrl] = useState('');
  const [connected, setConnected] = useState('');
  const [NFTName, setNFTName] = useState('');
  const [NFTDescription, setNFTDescription] = useState('');
  const [NFTLocation, setNFTLocation] = useState('');
  const [fileUrl, updateFileUrl] = useState(``);
  const [transaction, setTransactionSuccess] = useState('');
  const [account, setAccount] = useState('');
  

  useEffect(() => {
    const interval = setInterval(() => {
      doThis();
    }, 1000);
 
    return () => clearInterval(interval);
  }, [connected]);
  
  async function doThis(){
    let string = await connected;
    if(!(string)){
      await check();
    }
  }

  const submit = event => {
   
    let imgDestination;
    var myRequest = new Request(imageUrl);
    var imageDest = imageUrl.split('/')[imageUrl.split('/').length - 1];
    var finalImg = `https://ipfs.io/ipfs/${imageDest}`;
    console.log(finalImg);
    const thisProvider = new ethers.providers.Web3Provider(window.ethereum);
    const DEPLOYED_ADDRESS = '0x5CF7eFf3a4f0FACe1B43C7d4040062dd74De9630';
    const signer = thisProvider.getSigner();
    let writeContract = new ethers.Contract(DEPLOYED_ADDRESS, abi, signer);
    const client = create('https://ipfs.infura.io:5001/api/v0');

    async function metaData() {
      let name = NFTName;
      let description = NFTDescription;
      let image = finalImg;
      let newArr = {
        name,
        description,
        image
      };
      const file = JSON.stringify(newArr);
      file.toString();
      console.log(file);
    try {
      const added = await client.add(file)
      const url = `https://ipfs.io/ipfs/${added.path}`
      updateFileUrl(url)
      setTransactionSuccess(1);
      safeMint(connected, url);
      
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
    
      
    }
    
    metaData();
    console.log(fileUrl);
    async function safeMint(address, item) {
      
      let txResponse = await writeContract.safeMint(address, item);
      let txReceipt = await txResponse.wait();
      
      if(txReceipt.blockNumber > 0){
        setTransactionSuccess(txReceipt.blockNumber);
      } else if (!(txReceipt.blockNumber > 0)){
        alert('Your submission was unsuccessful');
        window.location.reload(false);
      }
      console.log(txReceipt);
    }
    
    
    event.preventDefault();

    
  }
  async function check(){
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
  
      if (accounts.length > 0) {
        const account = accounts[0];
        setConnected(account);
        console.log(account);
        return;
      } else {
        console.log('no');

      }
        
      
  
     
    }
  }

  
  
  if (transaction == 1){
    return (
      <>
      <LoadingSpin />
      </>
    )
  }
   else if(transaction > 0){
    return(
      <div>
        <p>Success!</p>
        <MDBBtn className='mb-3'  block href='#/collection'>
        View Your NFTs
      </MDBBtn>
      </div>
    )
  }

   
if(!(imageUrl)){
  check();
  return (
    <div className='invert-colors'>
      <br></br>
      
      <h3> Step 1: Upload Image Asset to IPFS </h3>
    <ImageUpload setUrl={setImageUrl} />
             <a
                href={imageUrl}
                target='_blank'
                rel='noopener noreferrer'
            >
                {imageUrl}
            </a>
            </div>
  )
} else {

 if(!(connected)){
   
   return(
     <h3> Please connect to MetaMask to continue! </h3>
   )
 } else {
  return (
    <div>
      <h3> Step 2: Enter NFT Name, Description, and click Mint! </h3>
    <form onSubmit={submit}>
      <br></br>
      <MDBRow className='mb-4'>
        
        <MDBCol>
          <MDBInput id='form6Example2' label='NFT Name' onChange={event => setNFTName(event.target.value)} value={NFTName}/>
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-4'>
        
        <MDBCol>
          <MDBInput wrapperClass='mb-4' textarea id='form6Example7' rows={4} label='NFT Description' onChange={event => setNFTDescription(event.target.value)} value={NFTDescription}/>
        </MDBCol>
      </MDBRow>
      <MDBRow className='mb-4'>
        
        <MDBCol>
          <MDBInput id='form6Example2' label='NFT IPFS Location' value={ `https://ipfs.io/ipfs/${imageUrl.split('/')[imageUrl.split('/').length - 1]}` } onChange={event => setNFTLocation(event.target.value)} />
        </MDBCol>
      </MDBRow>
     
    <br></br>
      

      <MDBBtn className='mb-4' type='submit' block>
        Mint NFT
      </MDBBtn>
    </form>
    </div>
  );
 }
  

}
  
}
export default Mint;