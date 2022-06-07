
import { useState } from 'react';
import {Container} from 'react-bootstrap';
import { Transition } from 'react-transition-group';

import OrderModal from '../modal/order-modal';
import OrderForm from '../order-form/order-form';

import './archive-list.css';



const ArchiveListItem = (props) => {

    const Modal = (props) => {
        
        const duration = 300;

        const defaultStyle = {
            transition: `${duration}ms ease-in-out`,
        }

        const transitionStyles = {
            entering: { opacity: 1, visibility: 'visible' },
            entered:  { opacity: 1, visibility: 'visible' },
            exiting:  { opacity: 0, visibility: 'hidden' },
            exited:  { opacity: 0, visibility: 'hidden' },
        };

        return (
            <Transition  in={props.show} 
                timeout={duration} 
                mountOnEnter unmountOnExit>
                {state => (
                <div className="modal d-block" style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    <div className="m-order">
                        <div className="modal-content modal-content1">
                            <div className="modal-header">
                                <h5 className="modal-title">Заказ № {id}</h5>
                                <button onClick={() => props.onClose(false)} type="button" className="btn-close" aria-label="Close"></button>
                            </div>
                            <div className='content-form'>
                                <OrderForm id={id} />
                            </div>
                                
                            <div className="modal-footer">
                                <button onClick={() => props.onClose(false)} type="button" className="btn btn-secondary">Close</button>
                                <button onClick={() => props.onClose(false)} type="button" className="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </Transition>
        )
    }

    const [showModal, setShowModal] = useState(false);
   
        
    const {id, close_date, name, addr, fio, tel, recived_summ, 
        base_summ, executor_name, card_num, card_summ, 
        satisfaction_rating, resume, admin_name} = props;
    return (
        <tr>
            <td>
                <Container>
                <Modal show={showModal} onClose={setShowModal}/>
                <OrderModal props={props} showModal={3}/>
                </Container>
            </td>
            <td>{close_date}</td>
            <td>{name}</td>
            <td><i className="fa-solid fa-location-dot" title={addr}></i></td>
            <td>{fio}{tel}</td>
            <td>{recived_summ}</td>
            <td>{base_summ}</td>
            <td>{executor_name}</td>
            <td>{card_num}{card_summ}</td>
            <td>{recived_summ - base_summ}</td>
            <td>{satisfaction_rating}</td>
            <td><i className="fa-solid fa-file-lines" title={resume}></i></td>
            <td>{admin_name}</td>

        </tr>
        
        )     
    
    
}

export default ArchiveListItem;