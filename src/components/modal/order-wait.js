import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { useState } from 'react';

import axios from '../../axios';
import './modal-win.css'

const WaitOrderModal = (props) => {


    const [show, setShow] = useState(false);
    const [dateWait, setDateWait] = useState();
    const [commentWait, setCommentWait] = useState();

    
      
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    const waitOrders = (e) => {
        e.preventDefault()
        axios.post('/api/work/wait', {
            id: props.id,
            future_contact_date: dateWait,
            comment: commentWait
        }).catch(e => {
            console.log(e);
        });
        handleClose()
    }

    const onValueDate = (e) => {
        setDateWait(e.target.value);
    }

    const onValueComment = (e) => {
        setCommentWait(e.target.value);
    }

   
    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                <i className="fa-solid fa-scale-balanced"></i> Ожидание
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Отправить в ожидание заказ {props.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                        <div>Дата следующего контакта: </div>
                        <input id="future_contact_date" name="future_contact_date" type="date" onChange={onValueDate}></input>
                        <p></p>    
                    <FloatingLabel controlId="floatingTextarea" label="Причина переноса в ожидание:" className="mb-3">
                        <Form.Control as="textarea" placeholder="Leave a comment here" 
                        onChange={onValueComment} required/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>

                <Button variant="primary" onClick={waitOrders} className='del-order'>
                    В ожидание
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default WaitOrderModal;