import { useEffect, useState } from 'react';
import axios from '../../axios';
import AdminsListItem from "./admins-list-item";
import AdminAdd from "./admin-add";



const AdminsList = () => {

  const [data, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/admins/admins', {
    }).then(
      async ({ data }) => {
      setOrders(data.admins)      
    });
  }, [])

  
  const elements = data.map(item => {
      
    return (
        <AdminsListItem key={item.id} {...item}/>
    )
  })

  return (
      <>
    <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">ИМЯ</th>
            <th scope="col">ТЕЛЕФОН</th>
            <th scope="col">ПАРОЛЬ</th>
            <th scope="col">EMAIL</th>
            <th scope="col">ПРАВА</th>
            <th scope="col">АКТИВ.</th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
    </table>
    <AdminAdd/>
    </>
  )
}

export default AdminsList;