import { useState, useContext } from 'react';
import { Context } from './context';


import {Button} from 'react-bootstrap';
import Dialog from './Modal';


const Table = (props) =>{

    const { title} = props.data;

    const data = useContext(Context);

    console.log(data)

    const [openModal , isOpenModal] = useState(false)
    const [indexData, setIndexData] = useState()

    const showModal = (index) =>{
        setIndexData(index)
        isOpenModal(!openModal);

    }

    const messages = 
        {"header":"Warning",
         "title":"Are you sure you want to delete this item?",
         "buttons":{
            "confirm":"Confirm",
            "cancel":"Cancel"
            }
        }

    const exportData = ()  =>{

        alert(JSON.stringify(data))

    }    

    return(
        <div>
            
              {openModal && <Dialog data={{"visible": openModal ,"item": indexData ,"messages":messages}}/>}
        <div className='table-responsive'>
        <table className="table table-hover">
           
        <thead>
          <tr>
            {title.map((header,i) =>(
                <th key={i} scope="col">{header}</th>  
            ))}
            <th scope="col"></th>
          </tr>
      </thead>
      <tbody>
        { 

        data.map((data,i) =>(
          
           <tr key={i}>
              <td>{data.name}</td>
              <td>{data.surname}</td>
              <td>{data.email}</td>
              <td>{data.age}</td>
              <td>{data.color}</td>
              <td>{data.contact.toString().replace(/-/g, ' ')}</td>
              <td><Button className='btn btn-danger' onClick={() => showModal(i)}>Delete</Button></td>
             
           </tr> 
        ))}
      </tbody>
      
      </table>
      </div>
      <div className='text-right'>
      <Button className='btn btn-warning btn-lg' onClick={() => exportData()}>Export</Button>
      </div>
      </div>
      
        
    )


}

export default Table;