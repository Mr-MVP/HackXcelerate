

// gateway : https://beige-added-swift-852.mypinata.cloud/

//res.data : 
/*
{
  IpfsHash: 'Qmef1UvwNzrUnpuk4cPqJMgbHgSPCWvVjD77t3LGufpVRs',
  PinSize: 1041905,
  Timestamp: '2024-03-21T14:15:37.934Z'
// }
// */
// const axios = require("axios");
// const FormData = require("form-data");
// const fs = require("fs");
// const JWT = "Bearer PASTE_YOUR_PINATA_JWT";

// const pinJSONToIPFS = async () => {
//   const data = JSON.stringify({
//     pinataContent: {
//       name: "Pinnie NFT",
//       description: "A nice NFT of Pinnie the Pinata",

//       image: "ipfs://QmaR49dq7oSbU5GATUooEStdJy41BBs36n1bzC3jYGShs4",
//     },
//     pinataMetadata: {
//       name: "metadata.json",
//     },
//   });

//   try {
//     const res = await axios.post(
//       "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//       data,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: JWT,
//         },
//       }
//     );
//     console.log(res.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// pinJSONToIPFS();