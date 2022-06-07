import { Button, Modal, FloatingLabel, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import axios from '../../axios';
import './modal-win.css'

const DeleteOrderModal = ({id, showModal}) => {

    const status = useSelector((state) => state.orders.orderStatus);

    const [show, setShow] = useState(false);
    const [paramDel, setParamDel] = useState();
    const [commentDel, setCommentDel] = useState();

    
      
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    const delOrders = (e) => {
        e.preventDefault()
        axios.post('/api/work/del', {
            id,
            status: paramDel,
            comment: commentDel
        }).catch(e => {
            console.log(e);
        });
        handleClose()
    }

    const onValueRadio = (e) => {
        setParamDel(e.target.value);
    }

    const onValueChange = (e) => {
        setCommentDel(e.target.value);
    }

    const statusDel = status.map(item => {
        if (item.param === 'delete_reason') {
        return (
            <div key={item.id}>
            <input type="radio" id={item.id} 
            name='statusdel' value={item.id} onChange={onValueRadio}/>
            {item.value}
            </div>       
            
        )
        }
    })

    
    return (
        <>
            <div className={showModal===1 ? 'show-btm vertikal-menu' : 'block-btm'}>   
            <Button variant="primary" onClick={handleShow}>
                <i className="fa fa-trash" aria-hidden="true"></i> Отмена
            </Button></div>

            <div className={showModal===2 ? 'show-btm' : 'block-btm'}>   
            <button variant="primary" onClick={handleShow} className='btm-delete-modal'>
                <i className="fa fa-trash" aria-hidden="true"></i>
            </button></div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Удалить заказ {id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {statusDel}
                    </div>    
                    <FloatingLabel controlId="floatingTextarea" label="Comments" className="mb-3">
                        <Form.Control as="textarea" placeholder="Leave a comment here" 
                        onChange={onValueChange} required/>
                    </FloatingLabel>
                </Modal.Body>
                <Modal.Footer>

                <Button variant="primary" onClick={delOrders} className='del-order'>
                    Удалить
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteOrderModal;