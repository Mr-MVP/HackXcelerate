const express = require('express');
const ethers = require('ethers');
const abi = require('./contract/abi.json');
const bodyParser = require('body-parser');
require('dotenv').config({override: true});
app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes'));

// const rpcprov = new ethers.JsonRpcProvider(process.env.RPC);
// const address = "0x621Ae105e30A01d0C3DB8C271fF4B95C50F3e31D";
// const contract = new ethers.Contract(address,abi,rpcprov);

// const wallet = new ethers.Wallet("6f7ea5671b722eda642a65ad447cd0d672a0c71ffae84c13d58df29ff626d31b");
// app.locals.contractlocal = contract;
app.listen(6969, async ()=>{
    console.log("Server listening on port 6969");
    // const contract2 = new ethers.Contract(address, abi, wallet);
    // app.locals.contractbrowser = contract2;
    // console.log(await contract.balanceOf("0xdaDD30aAEe8E15F925b3b0F0e18f84E6FE62C6f9"));
});