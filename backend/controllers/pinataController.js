const { pinFileToIPFS } = require("../utils/pinata");
module.exports.pinata = async(req, res) => {
    let src = req.body.src;
    let filename = req.body.filename;
    return await pinFileToIPFS(src, filename);
}