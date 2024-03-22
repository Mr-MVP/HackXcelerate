const express = require('express');
const ethers = require('ethers');
const abi = require('./Contract/abi.json');
app = express();
const rpcprov = new ethers.JsonRpcProvider("nrE3KEDKbgK0fnizjqOW-0rgow0Xon4c");
const address = "0x621Ae105e30A01d0C3DB8C271fF4B95C50F3e31D";
const contract = new ethers.Contract(address,abi,rpcprov);
app.listen(6969, ()=>{
    console.log("Server listening on port 6969");
    console.log(contract.balanceOf("0xdaDD30aAEe8E15F925b3b0F0e18f84E6FE62C6f9"));
});