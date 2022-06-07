import { useEffect } from 'react';
import axios from '../../axios';
import LidListItem from "./lid-list-item";
import { useSelector, useDispatch } from 'react-redux';
import { dial, status } from '../../reducers/reducer';

const LidList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.orders.orderDial);
  
  //get full list orders
  useEffect(() => {
    axios.get('/api/orders/all', {
    }).then(
      async ({ data }) => {
        dispatch(dial(data.orders));     
    });
  }, [])

  //get all list status
  useEffect(() => {
    axios.get('/api/work/status', {
    }).then(
      async ({ data }) => {
        dispatch(status(data.status))   
    });
  }, [])
  
  const elements = data.map(item => {    
    if (item.status === 1)  {
      return (
          <LidListItem key={item.id} {...item}/>
      )
    }
  })

  return (
    
    <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">Дата</th>
            <th scope="col">Название</th>
            <th scope="col">Клиент</th>
            <th scope="col">Описание</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
    </table>
  )
}

export default LidList;