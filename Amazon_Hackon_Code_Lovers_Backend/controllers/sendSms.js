const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const myphone  = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

exports.sender = async(req,res)=>{
    const { phone, message } = req.body;
    client.messages
      .create({
        body: message,
        from: myphone,
        to: phone
      })
      .then(res.send({msg:"Message sent Sucessfully"}))
      .catch((err)=>{
        res.send({msg: "Failed",errMsg:err.message})
      })
 
}