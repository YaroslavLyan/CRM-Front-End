
import { useEffect, useState } from 'react';
import axios from '../../axios';
import { format } from 'date-fns';

import ListAdminFilter from "./list-admin-filter";



const LidListItem = ({ onSetOrders }) => {
   
    const [data, setAdmins] = useState([]);
    const [param, setFilter] = useState({
        dateFrom: format(new Date().setDate(1), 'uuuu-MM-dd'),
        dateBefore: format(new Date(), 'uuuu-MM-dd'),
        mmb: 'all',
        manager: 'all'
    });
  
    //list admins in the filter
  useEffect(() => {
    axios.get('/api/admins/admins', {
    }).then(
      async ({ data }) => {
      setAdmins(data.admins)      
    });
  }, [])

  //list admins in the filter
  const listAdminFilter = data.map(item => {
      return (
          <ListAdminFilter key={item.id} {...item}/>
      )
  })

    //change values filter
    const onValueChange = (e) => {
        setFilter((prevState) => ({
            ...prevState,
        [e.target.name]: e.target.value
        }))
        
    }

    //get param filter on Backend
    const onFilterButtom = () => {
      
        axios.get('/api/orders/archive', {
            params: {
            ...param
            }
        }).then(
          async ({ data }) => {
            onSetOrders(data.orders)       
        });
    }
 
    return (
        <div className="row g-3" >
            <div className="col-md-4">
                <label>Дата с</label>
                <input type="date" onChange={onValueChange} name="dateFrom" className="form-control" id="inputZip" value={param.dateFrom}/>
            </div>
            <div className="col-md-4">
                <label>Дата по</label>
                <input type="date" onChange={onValueChange} name="dateBefore" className="form-control" id="myDate" value={param.dateBefore}/>
            </div>
            <div className="col-md-4">
                <label>ММБ</label>
                <select id="inputState" onChange={onValueChange} name="mmb" className="form-select">
                <option value='all'>Все</option>
                {listAdminFilter}
                </select>
            </div>
            <div className="col-md-4">
                <label>Менеджер</label>
                <select id="inputState" onChange={onValueChange} name="manager" className="form-select">
                <option value='all'>Все</option>
                {listAdminFilter}
                </select>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary" onClick={onFilterButtom}><i className="fa fa-filter" aria-hidden="true"></i></button>
            </div>
        </div>
        
        )
        
    
    
}

export default LidListItem;