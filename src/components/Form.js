import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Form, Button} from 'react-bootstrap';
import showModal from './Modal'



const FormInfo = () => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [contactWith , getContactWith] = useState([]);
  const [data, setData] = useState([]);
  //Error
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorAge, setErrorAge] = useState(null);
  const [errorContact, setErrorContact] = useState(null);
  

  const colors = ["red", "green", "blue", 'white', "black"];
  const contact = ["by email", "by phone call", "via SMS"];
  

  function isValidEmail(email) {
    const correct = /\S+@\S+\.\S+/.test(email);

        if(!correct){

          setErrorEmail('Email is invalid');
        return false
        }
       else {
        setErrorEmail(null);
        return true
      }
    
  }
  

  function isAge(ageIs){
 
    if(ageIs >= 120){
        setErrorAge('Age must be lower than 120')
        return false
    }
    else {
      setErrorAge(null)
      return true
    }
  }

  function isContact(hasContact){
    if(hasContact.length === 0){

      setErrorContact('Please select Contact Preference');
      return false;
    } 
    else{
      setErrorContact(null);
      return true;
    } 
  
  }


    const handleSubmit = (e) =>{
      e.preventDefault()


      if (!isValidEmail(email) || !isAge(age) || !isContact(contactWith)) {
          return false
     } 
     else{
      setData(data => [...data, 
       {

        "firstName" : firstName,
        "lastName": lastName,
        "email": email,
        "age": age,
        "contact" : contactWith
        }]
        )
      
        
     }
     
  } 







  

    return(
            <div className="container">
              <div className="row">
                  <div className="col-12">
                  <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Enter your Name:</Form.Label>
                    <Form.Control type="text" id="name" value={firstName} 
                        onChange={e => setFirstName(e.target.value) }
                        required
                                  />
                  </Form.Group>


                  <Form.Group>
                    <Form.Label>Enter your Surname:</Form.Label>
                    <Form.Control type="text" value={lastName} id="surname"
                      onChange={e => setLastName(e.target.value) }
                      required
                          />
                  </Form.Group>


                  <Form.Group>
                    <Form.Label>Enter your Email</Form.Label>
                    <Form.Control type="text" id="email" value={email}
                    onChange={e => setEmail(e.target.value) }
                    required
                    />
                    {errorEmail && <span style={{color: 'red'}}>{errorEmail}</span>}
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Enter your Age</Form.Label>
                    <Form.Control type="text" id="age" value={age}
                    onChange={e => setAge(e.target.value) }
                    required
                    />
                    {errorAge && <span style={{color: 'red'}}>{errorAge}</span>}
                  </Form.Group>
                  <Form.Group>
                  <ul className="list-group">
                      {colors.map((color , i )=> (
                      
                      <li
                      className="list-group-item"
                        key={i}
                        name={color}
                        id={`color-${color}`}
                        style={{paddingLeft:"10px"}}
                        >
                          {color}
                        </li>

                      ) 
                      )}
                  </ul>
                  </Form.Group>
                  <Form.Group>
                  
                  <span>Contact Preference</span>
                      
                        
                      {contact.map((contact , i )=> (
                        <div className="form-check" key={i}>
                        
                        <input
                          type="checkbox"
                          name={contact}
                          value={contact}
                          onClick={e => getContactWith(contactWith => [contactWith == [], e.target.value])}
                          />
                            <Form.Label style={{paddingLeft:"10px"}}>{contact}</Form.Label>

                          </div>
                      ) 
                      )}
              {errorContact && <span style={{color: 'red'}}>{errorContact}</span>}
                  </Form.Group>

                  <Button variant="primary" type="submit" >
                    Submit
                  </Button>
        </Form>
                  </div>
              </div>
              <div className='col-12'>
                {
                  data.length === 0 ? 
                  <div className="alert alert-warning" role="alert">
                  No data
                </div> 
                :
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Surname</th>
                      <th scope="col">Email</th>
                      <th scope="col">Age</th>
                      <th scope="col">Contact Preference</th>
                    </tr>
                </thead>
                <tbody>
                  {  data.map((data,i) =>(
                     <tr key={i}>
                        <td>{data.firstName}</td>
                        <td>{data.lastName}</td>
                        <td>{data.email}</td>
                        <td>{data.age}</td>
                        <td>{data.contact.map((contact)=>(contact))}</td>
                        <td><Button className='btn btn-danger'>Delete</Button></td>
                     </tr> 
                  ))}
                </tbody>
                </table>
                }
              </div>
            </div>

    );



}


export default FormInfo;