const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");


module.exports.pinFileToIPFS = async (src, filename) => {
    const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNzgzYjZiYi03YjhlLTQzMDgtYjZlMi1jZDJkOTM3NjY1NDMiLCJlbWFpbCI6ImNvb2xpZXNhbGF4YXJpZXN4b0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjUyZWNjZDA0YWQzMGFjZGIzMTEiLCJzY29wZWRLZXlTZWNyZXQiOiI3MGFjZjJiNjg4MzJiNDdlYWNmYTVhYjY4MjViNDU1Yzk2MWQwZGE1MTJmNTk3NDM3ZmFlNDQ4ZjBlZDMzYmY4IiwiaWF0IjoxNzA5MzExODg3fQ.iwh6p1LU8RXScow_kX_0iQNZCBchX3r_x0RKRZ68Uao";
    const formData = new FormData();
//   const src = "jaja.png";

  const file = fs.createReadStream(src);
  formData.append("file", file);

  const pinataMetadata = JSON.stringify({
    name: filename,
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
          "Content-Type": `multipart/form-data boundary=${formData._boundary}`,
          Authorization: `Bearer ${JWT}`
        },
      }
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
// pinFileToIPFS();
// module.exports = pinFileToIPFS;