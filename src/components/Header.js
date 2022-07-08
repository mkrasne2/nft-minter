import React from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
import MetaMaskAuth from "../Authenticate.js";
import { Link } from  "react-router-dom";
import '../App.css';

export default function Header(props) {
  
  return (
    <header>
      <MDBNavbar expand='lg' dark bgColor='black' sticky>
        <MDBContainer fluid>
          <MDBNavbarToggler
            aria-controls='navbarExample01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <MDBIcon fas icon='bars' />
          </MDBNavbarToggler>
          <div className='collapse navbar-collapse' id='navbarExample01'>
            <MDBNavbarNav right className='mb-2 mb-lg-0'>
              <MDBNavbarItem active>
                <Link aria-current='page' to='/' className="text-decoration-none">
                  <MDBNavbarLink > Mint NFTs </MDBNavbarLink>
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/collection' className="text-decoration-none"><MDBNavbarLink> View NFTs </MDBNavbarLink></Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <Link to='/about' className="text-decoration-none"><MDBNavbarLink> About </MDBNavbarLink></Link>
              </MDBNavbarItem>
              
            </MDBNavbarNav>
          </div>
        </MDBContainer>
      </MDBNavbar>

      <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('https://mdbcdn.b-cdn.net/img/Photos/Slides/3.webp')", height: 300 }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              <h1 className='mb-3'> {props.title}</h1>
              <h4 className='mb-3'> {props.message}</h4>
              <div >
              <MetaMaskAuth onAddressChanged={address => {}}/>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </header>
  );
}