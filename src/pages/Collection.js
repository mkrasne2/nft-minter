import React, { useState, useEffect } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBFile,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  
} from 'mdb-react-ui-kit';
import { FileUpload, ImageUpload } from 'react-ipfs-uploader';
import abi from '../components/abi.json';
import MetaMaskAuth from "../Authenticate.js";
import { ethers } from "ethers";
import { create, CID, IPFSHTTPClient } from "ipfs-http-client";
import LoadingSpin from "react-loading-spin";
import '../App.css';
import { Network, initializeAlchemy, getNftsForOwner } from "@alch/alchemy-sdk";

function Collection() {

  const CardExample = (props) => {
     const thisFunc = async () => {
       let checkObj = {};
       checkObj.image = props.image;
       checkObj.title = props.title;
       checkObj.description = props.description;
       checkObj.location = props.location;
       checkObj.type = props.type;
       checkObj.contract = props.contract;
      await viewDetail(checkObj);
    }
    return (
      
        <MDBCard style={{ width: "33%" }}>
          <div className ='img-styles'>
          <MDBCardImage className="img-new" src={props.image}waves />
          </div>
          <MDBCardBody className = 'set-body'>
            <div >
            <MDBCardTitle><p>Title: <strong>{props.title} </strong> </p> </MDBCardTitle>
            <MDBCardText>
            <p>Description: <strong>{props.description} </strong> </p>
            </MDBCardText>
            <MDBBtn color="dark" onClick = { thisFunc }> View NFT ID# {props.location}</MDBBtn>
            </div>
          </MDBCardBody>
        </MDBCard>
      
    )
  }

  async function viewDetail(item){
   setCard(item);
    console.log(item);
    console.log(data);
  }

  async function exitDetail(){
    setCard(initialState);
  }

  let pushC = [];
  pushC.push(<CardExample />);

  const settings = {
    apiKey: "HT5oTfLdGZPxoBIxZhpyc4ODbYyYZ1G8", // Replace with your Alchemy API Key.
    network: Network.ETH_GOERLI, // Replace with your network.
    maxRetries: 10,
  };

  const initialState = '';
  const alchemy = initializeAlchemy(settings);
  const [connected, setConnected] = useState('');
  const [data, setData] = useState('');
  const [card, setCard] = useState('');
  const fillData = [
   
  ];
  let newArr = [];

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

  async function check(){
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
  
      if (accounts.length > 0) {
        const account = accounts[0];
        setConnected(account);
        console.log(account);
        const nftsForOwner = await getNftsForOwner(alchemy, account);
        if(nftsForOwner.ownedNfts.length > 0){
          for(let i = 0; i < nftsForOwner.ownedNfts.length - 1; i++){
            var element = {};
            let check = await nftsForOwner.ownedNfts[i].title;
            if(check.length > 0){
              element.title = await nftsForOwner.ownedNfts[i].title;
              element.description = await nftsForOwner.ownedNfts[i].description;
              element.image = await nftsForOwner.ownedNfts[i].rawMetadata.image;
              element.id = await nftsForOwner.ownedNfts[i].tokenId;
              element.contract = await nftsForOwner.ownedNfts[i].contract.address;
              element.type = await nftsForOwner.ownedNfts[i].tokenType;
              fillData.push(element);
            }
            
          }
          let newc = await nftsForOwner.ownedNfts;
          console.log(newc);
          console.log(fillData);
          setData(fillData);
        }
        console.log(fillData);
        return;
      } else {
        console.log('no');

      }
        
    }
  }

  
if(card){
  let newItem = card;
  return(
    <div>
      <br></br>
      <MDBBtn  color='dark' onClick={exitDetail}> Go Back </MDBBtn>
    
    <div className = 'newE'>
    
     
               
               <MDBCard className = 'viewCard' style={{ width: "80%" }}>
          <div className ='img-styles'>
          <MDBCardImage className="img-new" src={newItem.image}waves />
          </div>
          <MDBCardBody>
            <MDBCardTitle><p>Title: <strong>{newItem.title} </strong> </p> </MDBCardTitle>
            <MDBCardText>
            <p>ID: <strong>{newItem.location} </strong> </p>
            <p>Description: <strong>{newItem.description} </strong> </p>
            <p>Contract: <strong>{newItem.contract} </strong> </p>
            <p>Token Type: <strong>{newItem.type} </strong> </p>
            <p>Owned By: <strong> You! </strong> </p>
            </MDBCardText>
            
          </MDBCardBody>
        </MDBCard>
            
          
           </div>
           </div>
  )
}
   if(data) {
    return(
      <div className = 'final'>
     <div className='check'>
      {
            data.map((value, key) => {
             
              return (
            
              
                  
                <CardExample className = 'element' key={key} 
                fction={value.id} location={value.id} 
                image={value.image} title={value.title} 
                contract={value.contract} type={value.type} 
                description={value.description}/>
                
               
                
                
               )
              })
            
            
            }
            </div>
            </div>
    )
  
  
}
else if(!(connected)){
   
  return(
    <h3> Please connect to MetaMask to continue! </h3>
  )
}
}
export default Collection;