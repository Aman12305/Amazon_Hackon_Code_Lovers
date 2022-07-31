import React from 'react'
import { Button, Card, Segment,Header} from 'semantic-ui-react'

const base_url = process.env.REACT_APP_BASE_URL;

export default function Claim({setActiveItem}) {

  async function claimcalled(){
    const response = await fetch(base_url+"claim", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: "Claim called"
      })
  })
  const data1 = await response.json();
  if(data1.msg.includes("Successfully"))
  {
        alert("Your claim request has been sent to the admin");
        setActiveItem("");
  }
}
  const handleopen = (e) => {
    console.log(e.target.name);
    if(e.target.name==="close")
    {
      setActiveItem("");
    }
    else
    {
      claimcalled();
    }
  }

    return (
      <div className='confirm'>
        <Segment stacked style={{alignItems:"center" ,height:"230px",margin:"auto auto"}}>
          <Header as='h3' color='teal' textAlign='center'>If your order is defective</Header>
          <Card>
              <Card.Content>
                <Card.Header></Card.Header>
                <Card.Meta>Tap to <strong>Claim</strong> for placing a claim request </Card.Meta>
                <Card.Description>
                <Card.Meta>Or <strong>Close</strong> it</Card.Meta>
                </Card.Description>
              </Card.Content>
              <Card.Content >
                <div className='ui two buttons'>
                  <Button basic color='teal' onClick={handleopen}>
                    Confirm
                  </Button>
                  <Button basic color='teal' name="close" onClick={handleopen}>
                    Close
                  </Button>
                </div>
              </Card.Content>
            </Card>
        </Segment>

      </div>
      
    )
  
}
