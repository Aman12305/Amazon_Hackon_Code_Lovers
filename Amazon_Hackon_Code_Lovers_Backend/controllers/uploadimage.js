
exports.uploadimage = (req, res) =>{
    const {imagelink} = req.body;
    res.send({msg:"Image uploaded Successfully",imagelink});
}