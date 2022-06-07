import { useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import axios from '../../axios';
import CreateNewOrder from '../modal/create-order';
import { dial, status } from '../../reducers/reducer';
import DialOrdersItem from './dial-orders-item';
import StartOrdersItem from './start-orders-item';
import FinishOrdersItem from './finish-orders-item';

import './work-aoder.css';

const WorkOrderList = () => {
    const dispatch = useDispatch();
    const orders = useSelector((state) => state.orders.orderDial);

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

  const ordersDial = orders.map(item => {
    return (
        <DialOrdersItem key={item.id} {...item}/>
        
    )
  })

  const startOrders = orders.map(item => {
    return (
        <StartOrdersItem key={item.id} {...item}/>
        
    )
  })

  const finishOrders = orders.map(item => {
    return (
        <FinishOrdersItem key={item.id} {...item}/>
        
    )
  })

  return (
    <div>
    <Tabs className='work-tab'>
      
      <Tab eventKey="home" title="СДЕЛКА">
      <table className="table table-striped table-work">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">КОНТАКТ</th>
            <th scope="col">НАЗВАНИЕ ПРОЕКТА</th>
            <th scope="col">АДРЕС</th>
            <th scope="col">КЛИЕНТ</th>
            <th scope="col">ОПИСАНИЕ</th>
            <th scope="col">МЕНЕДЖЕР</th>
            <th scope="col"></th>

          </tr>
        </thead>
        <tbody>
          {ordersDial}
        </tbody>
    </table>
      </Tab>
      <Tab eventKey="profile" title="СТАРТ">
      <table className="table table-striped table-work">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">СТАРТ</th>
            <th scope="col">НАЗВАНИЕ ПРОЕКТА</th>
            <th scope="col">АДРЕС</th>
            <th scope="col">КЛИЕНТ</th>
            <th scope="col">СУММА</th>
            <th scope="col">АВ/ОПЛ</th>
            <th scope="col">ФО</th>
            <th scope="col">ДЕТАЛИЗАЦИЯ</th>
            <th scope="col">МЕНЕДЖЕР</th>
            <th scope="col"></th>

          </tr>
        </thead>
        <tbody>
          {startOrders}
        </tbody>
    </table>
      </Tab>
      <Tab eventKey="contact" title="ФИНАЛ">
      <table className="table table-striped table-work">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">КОНТАКТ</th>
            <th scope="col">НАЗВАНИЕ ПРОЕКТА</th>
            <th scope="col">АДРЕС</th>
            <th scope="col">КЛИЕНТ</th>
            <th scope="col">АВ/ОПЛ</th>
            <th scope="col">ЗАТРАТЫ</th>
            <th scope="col">ПРИБЫЛЬ</th>
            <th scope="col">БОНУСЫ</th>
            <th scope="col">Р.У.</th>
            <th scope="col">РЕЗЮМЕ</th>
            <th scope="col">МЕНЕДЖЕР</th>
            <th scope="col"></th>

          </tr>
        </thead>
        <tbody>
          {finishOrders}
        </tbody>
    </table>
      </Tab>
      
    </Tabs>
    <div className='btm-add-new-dial'><CreateNewOrder /></div>
    </div>
  )

}
export default WorkOrderList;