exports.claim = async(req,res)=>{
    const {message} = req.body;
    res.send({msg:"Message sent Successfully",message});
}