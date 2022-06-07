import { Dropdown } from 'react-bootstrap';

import DelataOrderModal from '../modal/order-delete';
import WaitOrderModal from '../modal/order-wait';
import ChangeStartFinal from '../modal/change-start-final';
import OrderModal from '../modal/order-modal';

const StartOrdersItem = (props) => {
     
     const {id, start_date, name, addr, fio, tel, calc_summ, recived_summ, payment,
         admin_name, status, value, details} = props;
 
     if (status === 4) {
         return (
             <tr>
                 <td><OrderModal props={props} showModal={3}/></td>
                 <td>{start_date}</td>
                 <td>{name}</td>
                 <td>{addr}</td>
                 <td>{fio}{tel}</td>
                 <td>{calc_summ}</td>
                 <td>{recived_summ}{payment}</td>
                 <td>{value}</td>
                 <td>{details}</td>
                 <td>{admin_name}</td>
                 <td>
                    <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <i className="fa-solid fa-bars"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1"><OrderModal props={props} showModal={2}/></Dropdown.Item>
                        <Dropdown.Item href="#/action-3"><ChangeStartFinal {...props}/></Dropdown.Item>
                        <Dropdown.Item href="#/action-3"><WaitOrderModal id={id} /></Dropdown.Item>
                        <Dropdown.Item href="#/action-3"><DelataOrderModal id={id} /></Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </td>
 
             </tr>
         
         )     
     }
     
 }
 
 export default StartOrdersItem;