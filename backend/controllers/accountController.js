// const ethers = require('ethers');
// const abi = require('../contract/abi.json');
// require('dotenv').config({override: true});
// const rpcprov = new ethers.JsonRpcProvider(process.env.RPC);
// const signer = await rpcprov.getSigner();
// const address = "0x621Ae105e30A01d0C3DB8C271fF4B95C50F3e31D";
// const contract = new ethers.Contract(address,abi,signer);

module.exports.createAccount = async (req, res) => {
    const userName = req.body.userName;
    const success = await app.locals.contractbrowser.createAccount(userName);
    if(success){
        console.log("Successful creation");
        return res.status(200).json({message: "Succesfully created an account"});
    }
    else{
        console.log("Failure in creating account");
        return res.status(400).json({message: "Failue to create account"});
    }
}