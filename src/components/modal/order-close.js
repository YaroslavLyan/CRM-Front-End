import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { format } from 'date-fns';

import axios from '../../axios';
import './modal-win.css'

const CloseOrderModal = (props) => {
    
    const [calcSumm, setCalcSumm] = useState(props.calc_summ);
    const [recivedSumm, setRecivedSumm] = useState(props.recived_summ);
    const [futureDate, setFutureDate] = useState(props.future_contact_date);
    const [closeDate, setCloseDate] = useState(props.close_date);

    
    const [show, setShow] = useState(false); 
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    const closeOrder = (e) => {
        e.preventDefault()
        axios.post('/api/work/close', {
            id: props.id,
            calc_summ: calcSumm,
            recived_summ: recivedSumm,
            future_contact_date: futureDate,
            close_date: closeDate
        }).catch(e => {
            console.log(e);
        });
        handleClose()
    }

    const onCalcSumm = (e) => {
        setCalcSumm(e.target.value);
    }

    const onRecivedSumm = (e) => {
        setRecivedSumm(e.target.value);
    }

    const onFutureDate = (e) => {
        setFutureDate(e.target.value);
    }

    const onCloseDate = (e) => {
        setCloseDate(e.target.value);
    }
    
    const FullSumm = () => {
        if (props.calc_summ > +props.recived_summ) {
            return (
                <div>
                    <div className='form-line'>
                        <div className="input-cont">
                            <div>Рассчетная стоимость, грн:</div>
                            <input id="calc_summ" name="calc_summ" type="number" 
                                onChange={onCalcSumm} value={calcSumm}></input> 
                        </div> 
                        <div className="input-cont">
                            <div>Полученная оплата, грн:</div>
                            <input id="recived_summ" name="recived_summ" type="number" 
                                onChange={onRecivedSumm} value={recivedSumm}></input> 
                        </div> 
                    </div>
                    <h5>Внимание! Полученная оплата меньше рассчетной стоимости проекта!</h5>   
                </div>
            )
        }
    }

    const fData = (props.future_contact_date == null) ? null : format(new Date(futureDate), 'uuuu-MM-dd');
    const cData = (props.close_date == null) ? null : format(new Date(closeDate), 'uuuu-MM-dd');

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
            <i className="fa-brands fa-expeditedssl"></i> Закрыть
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Закрыть заказ {props.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FullSumm />    
                    
                    <div className='form-line'>
                        <div className="input-cont">
                            <div>Дата следующего контакта:</div>
                            <input id="calc_summ" name="calc_summ" type="date" 
                                onChange={onFutureDate} value={fData}></input> 
                        </div> 
                        <div className="input-cont">
                            <div>Дата закрытия:</div>
                            <input id="recived_summ" name="recived_summ" type="date" 
                                onChange={onCloseDate} value={cData}></input> 
                        </div> 
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeOrder} className='del-order'>
                    Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default CloseOrderModal;