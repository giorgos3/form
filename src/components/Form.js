import { useState } from 'react';
import { Context } from './context';
import {Form, Button} from 'react-bootstrap';
import Input from './Input';
import Checkbox from './Checkbox'
import Table from './Table'
import inputsData from '../json/inputsData.json';
import contact_via from '../json/contact-via.json';

const FormInfo = () => {

  const [values, setValues] = useState(
    { 
    name : "",
    surname: "",
    email: "",
    age: "",
    color: "",
    contact : []
  }
  );

  const [data, setData] = useState([]);

  const [errorContact , setErrorContact] = useState(null)


  const inputs = inputsData; 
  const colors = ["red", "green", "blue", 'white', "black"];
  const contact = contact_via;

     console.log(values) 
 
    const handleSubmit = (e) =>{
      e.preventDefault()

      if (!values.contact.length) {
        setErrorContact('Please select at least one Contact Preference')
        return false
      }
        setErrorContact(null);
        setData(value=> [...value, values]);
    
 

    } 

  const onChange = (type) => (e) => {
    switch (type) {
      case 'input':
        
        setValues(prevState => ({ ...prevState, [e.target.name] : e.target.value}));
        break;

      case 'option':
        setValues(prevState => ({ ...prevState, color: e.target.value}));
        break;

      case 'checkbox':

          if(e.target.checked){
            
          setErrorContact(null)
          setValues(prevState => ({...prevState,  contact : [...prevState.contact, e.target.value]   }))
          }
          else{
            setValues(prevState => {
              return {...prevState, contact : [...prevState.contact.filter(item => item !== e.target.value)]}
            })
          }
        break;

      default:
        setValues({...values, [e.target.name]: e.target.value});
    }
  }

 

    return(
      <Context.Provider value={data}>

            <div className="container">
              <div className="row pt-5">
                  <div className="col-12">
                  <Form onSubmit={handleSubmit}>

                  {
                    inputs.map(input =>(
                      <Input key={input.id} {...input} value={values[input.name]} onChange={onChange('input')}/>
                    ))
                  }

                  <div className="d-flex flex-column pt-3 pb-3">
                    
                      <label>Select Color</label>
                   
                    <select className='form-control' onChange={onChange('option')}>
                  {
                    colors.map((option, i) =>(
                      <option key={i} value={option}>{option}</option>
                    ))
                  }
                  </select>
                  </div>
                 
                    <div className='pt-3'>
                    <label>Select Contact Preference</label>
                    {
                      contact.map((contact,i) =>(
                        <>
                        
                        <Checkbox key={i}  {...contact} onChange={onChange('checkbox')}/>
                        </>
                      ))
                  }
                    {<span className='text-danger'>{errorContact}</span>}
                    </div>
                 
                  <div className="text-right">
                  <Button variant="primary" className="btn btn-success btn-lg" type="submit" >
                    Submit
                  </Button>
                  </div>
                </Form>
                  </div>
              
              <div className='col-12 mt-5 mb-5'>
                {
                  data.length === 0 ? 
                  <div className="wrapper">
                    <div className="alert alert-warning" role="alert">
                      No data
                  </div> 
                </div> 
                :
                <Table data={{"title":Object.keys(values),"data":data}}/>
                }
              </div>
              </div>
            </div>
      </Context.Provider>
    );

}

export default FormInfo;