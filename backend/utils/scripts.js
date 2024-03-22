const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const JWT =
  "";

const pinFileToIPFS = async () => {
  const formData = new FormData();
  const src = "jaja.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: "File name",
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: "Infinity",
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
pinFileToIPFS();

// gateway : https://beige-added-swift-852.mypinata.cloud

//res.data : 
/*
{
  IpfsHash: 'Qmef1UvwNzrUnpuk4cPqJMgbHgSPCWvVjD77t3LGufpVRs',
  PinSize: 1041905,
  Timestamp: '2024-03-21T14:15:37.934Z'
}
*/