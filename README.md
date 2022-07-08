# Quick Notes about this Project:

I created this app to teach myself how to allow users to mint an NFT while simultaneously using IPFS as a means to store NFT attributes. A one-stop shop.

## Specifications:

1. I used both ipfs-http-client and react-ipfs-uploader to allow users to upload their NFT image asset and corresponding metadata to IPFS simultaneously while minting their NFT

2. I utilized alchemy-SDK to pull in all available NFTs owned by the connected user

3. I built and deployed the basic NFT contract which inherits from the ERC721 standard, ERC721URIStorage, and Ownable contracts. Check it out at Goerli's Etherscan: Link

Go ahead and mint some NFTs for yourself! mkrasne2.github.io/nft-minter/
