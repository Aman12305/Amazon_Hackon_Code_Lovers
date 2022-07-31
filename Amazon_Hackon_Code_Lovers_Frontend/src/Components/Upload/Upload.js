import React,{useState,useEffect} from 'react'
import { Button, Form, Grid, Header, Segment,Modal,Message} from 'semantic-ui-react'
import { initializeApp } from "firebase/app";
import {getStorage,ref,getDownloadURL,uploadBytesResumable} from "firebase/storage"


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

const base_url = process.env.REACT_APP_BASE_URL;
// Initialize Firebase
const app = initializeApp(firebaseConfig)

const storage = getStorage();

export default function Upload({setActiveItem}) {
    
    const [imageLink,setImageLink] = useState("");
    const [button,setbutton] = useState(true);
    const [data,setData] = useState(null);

    const uploadImage = async(file,type) =>{
      const name  = file.name;
      const metadata = {
          name: name,
          contentType:file.type
      }
  
      const storageRef = ref(storage, 'documents/amazoncutomerID/'+ file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
  
  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
    }, 
    (error) => {
      // console.log(error.message);
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        // console.log('File available at', downloadURL);
        if(type==="image"){
          setImageLink(downloadURL);
        }
      });
    }
  );
  
  }

  async function sendimagetobackend(){
    const response = await fetch(base_url+"upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        imagelink:imageLink
      })
    })
    const data1 = await response.json();
    if(data1.msg.includes("Successfully"))
    {
          alert("Successfully Uploaded");
          setImageLink("");
          setActiveItem("");
    }
    else
        {
          alert("Error Uploading");
        }
    

  }

    const handleimage = (e) =>{
      uploadImage(e.target.files[0],"image")
    }

    
    useEffect(() => {
      if(imageLink){
        setbutton(false);
      }

    },[imageLink]);

    const saveandcontinue = () =>{
      sendimagetobackend();
    }

  
  return (
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <br/>
      <br/>

      <Form size='large' onSubmit={saveandcontinue}>
        <Segment stacked>
          <p>Please provide a image which you received</p>
          <Form.Input 
            fluid 
            name="image"
            placeholder='Provide a Image Link' 
            onChange={handleimage}
            type='file'
          />
          {imageLink && <img src={imageLink} alt="preview" style={{width:"100px",height:"100px"}}/>}
    
          <Button color='teal' fluid size='large' disabled={button} type="submit">Submit</Button>
        </Segment>
      </Form>
    </Grid.Column>
  </Grid>
    
  )
}



