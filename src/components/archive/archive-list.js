import { useEffect, useState } from 'react';
import axios from '../../axios';

import { format } from 'date-fns';

import ArchiveListItem from "./archive-list-item";
import ArchiveFilter from "./archive-filter";


import './archive-list.css';

const ArchiveList = () => {

  const [data, setOrders] = useState([]);
  useEffect(() => {
    axios.get('/api/orders/archive', {
      params: {
        dateFrom: format(new Date().setDate(1), 'uuuu-MM-dd'),
        dateBefore: format(new Date(), 'uuuu-MM-dd'),
        mmb: 'all',
        manager: 'all'
      }
    }).then(
      async ({ data }) => {
      setOrders(data.orders)    
    });
  }, [])

  //sorting through all orders
  const elements = data.map(item => {
    return (
      <ArchiveListItem key={item.id} {...item}/>
    )
  })
   
  
  //cash flow for the period
  const getSumColumn = (arr, column) => (arr.reduce((prev, el) => prev += el[column], 0))

  //cash costs for the period
  const getSumCost = (arr, column) => (arr.reduce((prev, el) => prev += el[column], 0))

  const countOrders = data.length;
  return (
    <>

    <div className='filter-form'>
      <ArchiveFilter onSetOrders={setOrders} />
    </div>
    <div className="card">
      
      <div className="card-header">
        Статистика
      </div>
      <div className="card-body">
        <p>Кол-во проектов: {countOrders}</p>
        <p>Оборот: {getSumColumn(data, 'recived_summ')}</p>
        <p>Прибыль: {getSumColumn(data, 'recived_summ') - getSumCost(data, 'base_summ')}</p>
      </div>  
    </div>
    
    <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">ЗАКРЫТ</th>
            <th scope="col">НАЗВАНИЕ ПРОЕКТА</th>
            <th scope="col">АДРЕС</th>
            <th scope="col">КЛИЕНТ</th>
            <th scope="col">АВ/ОПЛ</th>
            <th scope="col">ЗАТРАТЫ</th>
            <th scope="col">ММБ</th>
            <th scope="col">БОНУСЫ</th>
            <th scope="col">ПРИБЫЛЬ</th>
            <th scope="col">Р.У.</th>
            <th scope="col">РЕЗЮМЕ</th>
            <th scope="col"><i className="fa-solid fa-user"></i></th>

          </tr>
        </thead>
        <tbody>
          {elements}
        </tbody>
    </table>
    </>
  )
}

export default ArchiveList;