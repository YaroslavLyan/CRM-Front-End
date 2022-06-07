import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import AddClient from './add-client';

import axios from '../../axios';
import './modal-win.css'

const ChangeDialStart = (props) => {

    const [newClient, setNewClient] = useState({});//хранилище данных
    const [dataOrder, setDataOrder] = useState(props);//хранилище данных
    

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    const btmSaveStatus = (status) => {
        axios.post('/api/work/changeStatus', {
            status,
            clientId: newClient.id,
            id: dataOrder.id
        }).catch(e => {
            console.log(e);
        });
        handleClose();
    }
    

    return (
        <>
        
        <Button variant="primary" onClick={handleShow}>
        <i className="fa-solid fa-star"></i>Старт
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Formik 
            initialValues = {{
                client_id: dataOrder.client_id,
                addr: dataOrder.addr,
                service: dataOrder.service,
                calc_summ: dataOrder.calc_summ,
                start_date: dataOrder.start_date,
                details: dataOrder.details

            }}
            validationSchema = {Yup.object({
                client_id: Yup.number()
                        .required('Обязательное поле'),
                start_date: Yup.string()
                        .required('Обязательное поле'),
                addr: Yup.string()
                        .required('Обязательное поле'),
                details: Yup.string()
                        .required('Обязательное поле'),
                calc_summ: Yup.number()
                            .required('Обязательное поле'),
            })}
            onSubmit = {(status) => btmSaveStatus(status)}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>ID: {dataOrder.id} из "Сделка" в "Старт"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='blok-add-order'>
                            <div className='form-line'>
                                <div className={(dataOrder.client_id) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Клиент/заказчик:</div>
                                    <Field value={(newClient.id) ? (newClient.fio + newClient.tel) : (dataOrder.fio + dataOrder.tel)} id="client_id" name="client_id" className='input-title' readOnly="readOnly"></Field>
                                    <AddClient addClient={setNewClient}/>
                                    <ErrorMessage className="error" name="client_id" component="div"/>
                                </div> 
                                <div className={(dataOrder.addr) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Адрес выполнения работ:</div>
                                    <Field type="text" id="addr" name="addr" className='input-title'></Field>
                                    <ErrorMessage className="error" name="addr" component="div"/>
                                </div> 
                            </div>
                            <div className={(dataOrder.service) ?  "input-cont input-hidden" : "input-cont"}>              
                                <div className="input-cont">
                                    <div>Заказанные услуги:</div>
                                    <Field id="service" name="service" className='input-title'></Field>
                                    <ErrorMessage className="error" name="service" component="div"/>
                                </div>  
                                    
                            </div>
                            <div className='form-line'>              
                                <div className="input-cont">
                                    <div>Рассчетная стоимость, грн:</div>
                                    <Field id="calc_summ" name="calc_summ" className='input-title'></Field>
                                    <ErrorMessage className="error" name="calc_summ" component="div"/>
                                </div>  
                                <div className="input-cont">
                                    <div>Дата старта:</div>
                                    <Field id="start_date" name="start_date" type="date" className='input-title'></Field>
                                    <ErrorMessage className="error" name="start_date" component="div"/>
                                </div>     
                            </div>
                            <div className='form-line'>              
                                <div className="input-cont">
                                    <div>Детализация:</div>
                                    <Field id="details"  name="details" as="textarea" className='input-title'>
                                    </Field>
                                    <ErrorMessage className="error" name="details" component="div"/>
                                </div>          
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    <Button type='submit' variant="primary" className='del-order'>
                        Сохранить
                    </Button>
                    </Modal.Footer>
                    </Form>
                </Formik>
            </Modal>
         
        </>
    )
}

export default ChangeDialStart;