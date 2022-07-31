import React,{useState} from 'react'
import './Confirm.css'
import { Button, Card, Segment,Header,Form,Icon } from 'semantic-ui-react'

const base_url = process.env.REACT_APP_BASE_URL;

export default function ConfirmOrder() {
  console.log(base_url);

  const [modOpen,setmodOpen] = useState(false);
  const [number,setnumber] = useState('');
  const [date,setDate]  = useState('');
  const [reshedule,setReshedule] = useState(false);
  
  const handleopen = (e) => {
    setmodOpen(true);

    if(e.target.name === 'reshedule'){
      setReshedule(true);
    }
  }

  async function sendsms(){
    let message = `Your order has been confirmed and approching to you till tomorrow`;
    if(reshedule) message = `Your order has been rescheduled and approching to you till ${date}`;
    const response = await fetch(base_url+'sendsms',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          phone:number,
          message:message
        })
      })

    const data = await response.json();
    if(data.msg.includes('Sucessfully')){

      if(reshedule)
      alert(`Your order has been rescheduled and approching to you till ${date} and confirmation SMS has been sent to ${number}`);
      else
      alert(`Your order has been confirmed and approching to you till tomorrow and confirmation SMS has been sent to ${number}`);
      setDate('');
      setnumber('');
      setmodOpen(false);
    }
    else
    {
      alert(data.msg);
    }
  }

  const checkandcontinue = () => {
    if(reshedule)
    {
      if(date === '')
      {
        alert('Please enter date');
        return;
      }
    }
    if(number === '')
    {alert('Please enter phone number');return;}

    sendsms();
  }

  const handlechange = (e) => {
    if(e.target.name === 'number')
    setnumber(e.target.value);
    else
    setDate(e.target.value);
  }


    return (
      <div className='confirm'>
         {!modOpen &&
          <Segment stacked style={{alignItems:"center" ,height:"230px",margin:"auto auto"}}>
          <Header as='h3' color='teal' textAlign='center'>Your Order Coming tomorrow</Header>
          <Card>
              <Card.Content>
                <Card.Header></Card.Header>
                <Card.Meta>Tap to <strong>Confirm</strong> your order for tomorrow</Card.Meta>
                <Card.Description>
                <Card.Meta>Or <strong>Reshedule</strong> to earliest date</Card.Meta>
                </Card.Description>
              </Card.Content>
              <Card.Content >
                <div className='ui two buttons'>
                  <Button basic color='teal' onClick={handleopen}>
                    Confirm
                  </Button>
                  <Button basic color='teal' name="reshedule" onClick={handleopen}>
                    Reshedule
                  </Button>
                </div>
              </Card.Content>
            </Card>
        </Segment>
        }

        {
          modOpen &&
          <div className='confirm'>
            <Icon name='close' onClick={()=>setmodOpen(false)} style={{position:"absolute",height:"30px",width:"30px",top:"10px",right:"30px",zIndex:"100",color:"black",cursor:"pointer"}}/>
          <Segment stacked style={{alignItems:"center" ,minheight:"230px",margin:"auto auto",minWidth:"300px"}}>
          <Header as='h3' color='teal' textAlign='center'>{reshedule?"Reshedule your order":"Confirm your order"}</Header>
          <Form onSubmit={checkandcontinue}>
          <Form.Input fluid label="Mobile No."
          name="number"
          type="tel"
          value={number}
          onChange={handlechange}
          placeholder="Format +91-456XXXXXXX" 
          pattern="[+]{1}[0-9]{2}-[0-9]{10}"
          />
          {
            reshedule &&
            <Form.Input fluid label="Date"
            name="date"
            type="date"
            value={date}
            pattern="[01-12]{2}/[01-31]{2}/[1000-9999]{4}"
            onChange={handlechange}
            />
          }
          
          <Button color='teal' fluid>{reshedule?"Reshedule":"Confirm"}</Button>
          </Form>
          </Segment>
          </div>
        }
            
        <div className='confirm-content'>
        </div>
      </div>
    )
  
}
