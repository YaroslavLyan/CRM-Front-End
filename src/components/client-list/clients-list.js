import { useEffect, useState } from 'react';
import {Button} from 'react-bootstrap';

import axios from '../../axios';
import ClientsListItem from "./clients-list-item";

import './clients-list.css';

const ClientsList = () => {

  const [data, setCliends] = useState([]);

  const [param, setFilter] = useState({
    limit: 5,
    offset: 0,
    charEnded: true,
});
  
  useEffect(() => {
    axios.get('/api/clients/clients', {
      params: {
        ...param
      }
    }).then(
      async ({ data }) => {
        changeOffset(data)
        
    });
  }, [])

  const onRequest = () => {
    axios.get('/api/clients/clients', {
      params: {
        ...param
      }
    }).then(
      async ({ data }) => {
        changeOffset(data)
        
    });
    
  }

  
  const changeOffset = (newData) => {
    let ended = false;
        if(newData.clients.length < 5) {
        ended = true;
        }

    setCliends((data) => ([...data, ...newData.clients]))
    param.offset = param.offset +5;
    param.charEnded = ended;
  }

  const elements = data.map(item => {
      
    return (
        <ClientsListItem key={item.id} {...item}/>
        
    )
  })

// find client by tel
const [paramFilter, setParamFilter] = useState();

let timerId;



function activBtm(e) {
  setParamFilter(e.target.value)
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(findlistClients, 500);
}

  function findlistClients() {
    axios.get('/api/clients/findClient', {
        paramFilter,
      })
      // .then(async res => {
      //     const obj = await res.json();
          
      // });   
  }

  return (
    <>
      <div className='seach-client'>
        <div>Поиск/фильтр</div>
        <input className="seach-client-input" placeholder="Введите что-то" onChange={activBtm}/>
       
      </div>
      <table className="table table-striped">
      
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">ФИО</th>
            <th scope="col">ТЕЛЕФОН</th>
            <th scope="col">EMAIL</th>
            <th scope="col">МЕССЕНДЖЕРЫ</th>
            <th scope="col">КАРТА</th>
            <th scope="col">ИНФО</th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
        
    </table>
    <Button style={{'margin': '5px', 'width':'400px', 'display': param.charEnded ? 'none' : 'block'}} variant="outline-secondary"
      onClick={onRequest}>Подгрузить еще...</Button>
    </>
  )
}

export default ClientsList;