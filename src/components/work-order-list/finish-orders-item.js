import { Dropdown } from 'react-bootstrap';

import WaitOrderModal from '../modal/order-wait';
import OrderModal from '../modal/order-modal';
import CloseOrderModal from '../modal/order-close';

const FinishOrdersItem = (props) => {
     
     const {id, future_contact_date, name, addr, fio, tel, base_summ, recived_summ, payment,
         admin_name, status, resume, card_num, card_summ, satisfaction_rating, executor_name} = props;
 
     if (status === 5) {
         return (
             <tr>
                 <td><OrderModal props={props} showModal={3}/></td>
                 <td>{future_contact_date}</td>
                 <td>{name}</td>
                 <td>{addr}</td>
                 <td>{fio}{tel}</td>
                 <td>{recived_summ}{payment}</td>
                 <td>{base_summ}</td>
                 <td>{recived_summ - base_summ}</td>
                 <td>{card_num}({card_summ})</td>
                 <td>{satisfaction_rating}</td>
                 <td>{resume}</td>
                 <td>{admin_name}</td>
                 <td>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <i className="fa-solid fa-bars"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1"><OrderModal props={props} showModal={2}/></Dropdown.Item>
                            <Dropdown.Item href="#/action-1"><CloseOrderModal {...props}/></Dropdown.Item>
                            <Dropdown.Item href="#/action-3"><WaitOrderModal id={id} /></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    </td>
 
             </tr>
         
         )     
     }
     
 }
 
 export default FinishOrdersItem;