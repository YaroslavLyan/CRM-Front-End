import { Dropdown } from 'react-bootstrap';

import OrderModal from '../modal/order-modal'
import DeleteOrderModal from '../modal/order-delete';
import WaitOrderModal from '../modal/order-wait';
import ChangeDialStart from '../modal/change-deal-start';
import ChangeStartFinal from '../modal/change-start-final';

import './work-aoder.css';
import { format } from 'date-fns';



const DialOrdersItem = (props) => {

    const {id, future_contact_date, name, addr, fio, tel, description, 
        admin_name, status} = props;

    const futureData = (future_contact_date == null) ? null : format(new Date(future_contact_date), 'uuuu-MM-dd');

    if (status === 2) {
        return (
            <tr>
                {/* <td><Link to={`/order/${id}`}>{id}</Link></td> */}
                <td><OrderModal props={props} showModal={3}/></td>
                <td>{futureData}</td>
                <td>{name}</td>
                <td>{addr}</td>
                <td>{fio}{tel}</td>
                <td>{description}</td>
                <td>{admin_name}</td>
                <td><Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <i className="fa-solid fa-bars"></i>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        
                        <Dropdown.Item href="#/action-1"><OrderModal props={props} showModal={2}/></Dropdown.Item>
                        
                        <Dropdown.Item href="#/action-2"><ChangeDialStart {...props}/></Dropdown.Item>
                        <Dropdown.Item href="#/action-3"><ChangeStartFinal {...props}/></Dropdown.Item>
                        <Dropdown.Item href="#/action-3"><WaitOrderModal id={id} /></Dropdown.Item>
                        <Dropdown.Item href="#/action-3"><DeleteOrderModal id={id}  showModal={1}/></Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                </td>

            </tr>
        
        )     
    }
    
}

export default DialOrdersItem;