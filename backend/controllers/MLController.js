const formidable = require('formidable');
const fs = require('fs');
const axios = require('axios');
module.exports.predImage = async (req, res) => {
    let form = new formidable.IncomingForm();
    let path = "";
    form.parse(req, async function (err, fields, files) {
        // console.log(files.filetoupload[0].filepath);
        path = files.filetoupload[0].filepath;
        // console.log("thisispath",path);
        let pred = await axios.post("http://localhost:8000/toxicity/image", {
            image_path: path
        });
        if(pred.data.toxtypes.length == 0){
            return res.status(200).json({safe: true, message:"Provided image is safe"})
        }
        else return res.status(200).json({safe: false, message:"Provided image is unsafe"});
    });
}

module.exports.predText = async (req, res) => {
    let inp_text = req.body.text;

    let pref = await axios.post("http://localhost:8000/toxicity/text", {
        text: inp_text
    });

    if(pref.data.toxtypes.length == 0){
        return res.status(200).json({safe: true, message: "Provided text is safe"});
    }
    else return res.status(200).json({safe: false, message: "Provided text is unsafe"});
}