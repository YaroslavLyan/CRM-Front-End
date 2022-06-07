import { useState } from 'react';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import axios from '../../axios';
import OrderModal from '../modal/order-modal';
import DeleteOrderModal from '../modal/order-delete';
import { dial } from '../../reducers/reducer';

import './lid-list.css';

const LidListItem = (props) => {
    const dispatch = useDispatch();
    
    const [inpAc, setInpAc] = useState('activ');
    const [inp, setInp] = useState('lid-displ');

    //activ cell table for change
    const onChangeClass = () => {
        setInpAc('lid-displ');
        setInp('activ');       
    }

    //change name order
    const onOrdersNameChange = async (e) => {
        
        setInpAc('activ');
        setInp('lid-displ');
        
        await axios.post('/api/lid/editName', {
            body: {
                name: e.target.value,
                id: props.id
            },
        })
        updateOrders();
    } 

    //change status and add id meneger
    const updateOrders = () => {
        axios.get('/api/orders/all', {
          }).then(
            async ({ data }) => {
              dispatch(dial(data.orders));     
        });
    }

    //get all list status
    const onChangStatus = (id) => {
        axios.post(`/api/lid/inDial/${id}`)
    } 
 
    
        
    const {id, create_date, name, fio, tel, description, status} = props;
    // console.log(new Date(Number(create_date)))
    const date = format(new Date(Number(create_date)), 'uuuu-MM-dd');
    // console.log(new Date(() => create_date))
    
    return (
        <tr>
            <td><OrderModal props={props} showModal={3}/></td>
            <td type="data">{date}</td>
            <td><div className={inpAc} onClick={onChangeClass}>{name}</div>
                <div className={inp}><input type="text"
                name={id} defaultValue={name} onBlur={onOrdersNameChange} 
                onKeyDown={ev => {
                    ev.key === 'Enter' && ev.target.blur()
                    }} /></div>
            </td>
            <td>{fio}{tel}</td>
            <td>{description}</td>
            <td><button type="button"
                    className="btn-to-dial" 
                    name={id} 
                    onClick={() => onChangStatus(id)}>
                    <i className="fa-solid fa-file-circle-plus"></i>
                </button></td>
            <td><DeleteOrderModal id={id} showModal={2}/>
            </td>
        </tr>
    
    )
    
    
    
}

export default LidListItem;