import { useEffect, useState } from 'react';
import axios from '../../axios';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

import OrderModal from '../modal/order-modal'
import { events } from '../../reducers/reducer'

import './current-events.css';

const Events = () => {

    const dispatch = useDispatch();
    const listEvents = useSelector((state) => state.orders.orderEvents); 
    //get list orders   
    useEffect(() => {
    axios.get('/api/events/events', {
        params: {
        dateFrom: format(new Date()-259200000, 'uuuu-MM-dd'),
        dateBefore: format(new Date(), 'uuuu-MM-dd')
        },
    }).then(
        async ({ data }) => {
        dispatch(events(data.events))
    });
    }, []);

    
    const [newDateFuture, setNewDateFuture] = useState();
    const onValueChange = (e) => {
        setNewDateFuture(e.target.value);
    }
    
    const ErrorMessage = (message) => {
        alert (message)
    }

    //change date future
    const onNewDateFuture = async (id) => {
        if(newDateFuture >= format(new Date(), 'uuuu-MM-dd')){
            await axios.post(`/api/events/${newDateFuture}`, {
                id,
            });            
        } else {ErrorMessage('Дата не корректна')}
    }

    //delete date future
    const onDecidedOrder = async (id) => {
            await axios.post(`/api/events/decided/${id}`)
    }

    const EventsList = listEvents.map(item => {   
        const futureData = format(new Date(item.future_contact_date), 'uuuu-MM-dd');
        return (
             
            <div className="card-event" key={item.id} style={{
                backgroundColor: futureData < format(new Date(), 'uuuu-MM-dd') ? '#fffde7' : 'inherit'
            }}>
                <div>
                    <div>
                        <span><i className="fa-solid fa-briefcase"></i> {item.fio}</span>
                        <time className="right-data">{futureData}</time>
                    </div>
                    <div className="contact-event">
                        <span>☏ {item.tel}</span>
                        <blockquote className="card-discript">{item.name}</blockquote>
                    </div>
                </div>                    
                <div className="top-line-card">
                    <input type="date" onChange={onValueChange}/>                            
                            <OrderModal props={item} showModal={1}/>
                        <button className='btm-card-event' name={item.id} onClick={() => onNewDateFuture(item.id)}>
                            <i className="fa fa-calendar" aria-hidden="true" title='Задать новую дату'></i></button>
                         
                        <button className='btm-card-event'>
                            <i className="fa-solid fa-check" title='Решено' onClick={() => onDecidedOrder(item.id)}></i></button>
                </div>
            </div>   
            
        )
    })

    return (
        <div>
        {EventsList}
        </div>
    )

}
export default Events;