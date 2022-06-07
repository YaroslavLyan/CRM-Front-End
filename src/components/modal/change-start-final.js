import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import AddClient from './add-client';

import axios from '../../axios';
import './modal-win.css'

const ChangeStartFinal = (props) => {

    const [newClient, setNewClient] = useState({});//хранилище данных
    const [dataOrder, setDataOrder] = useState(props);//хранилище данных
    console.log(dataOrder.client_id)
    const [admins, setAdmins] = useState([]);//хранилище данных
  
    useEffect(() => {
        axios.get('/api/admins/admins', {
        }).then(
        async ({ data }) => {
            setAdmins(data.admins)      
        });
    }, [])

    const adminsList = admins.map(item => {
        
        return (
            <option key={item.id} value={item.id}>{item.name}</option>            
        )
    })



    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    const btmSaveStatus = (status) => {
        axios.post('/api/work/changeStatusToFinal', {
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
        <i className="fas fa-hourglass-end"></i>Финал
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Formik 
            initialValues = {{
                client_id: dataOrder.client_id,
                addr: dataOrder.addr,
                service: dataOrder.service,
                calc_summ: dataOrder.calc_summ,
                start_date: dataOrder.start_date,
                details: dataOrder.details,
                recived_summ: dataOrder.recived_summ,
                mmb_pay: dataOrder.mmb_pay,
                base_summ: dataOrder.base_summ,
                satisfaction_rating: dataOrder.satisfaction_rating,
                card_summ: dataOrder.card_summ,
                card_num: dataOrder.card_num,
                resume: dataOrder.resume,
                base_summ_details: dataOrder.base_summ_details,

            }}
            validationSchema = {Yup.object({
                client_id: Yup.number()
                        .required('Обязательное поле'),
                addr: Yup.string()
                        .required('Обязательное поле'),
                details: Yup.string()
                        .required('Обязательное поле'),
                calc_summ: Yup.number()
                            .required('Обязательное поле'),
                recived_summ: Yup.number()
                            .required('Обязательное поле'),
            })}
            onSubmit = {(status) => btmSaveStatus(status)}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>ID: {dataOrder.id} из "Сделка" в "Финал"</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='blok-change-status'>
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
                                <div className={(dataOrder.calc_summ > 0) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Рассчетная стоимость, грн:</div>
                                    <Field id="calc_summ" name="calc_summ" className='input-title'></Field>
                                    <ErrorMessage className="error" name="calc_summ" component="div"/>
                                </div>  
                                <div className="input-cont">
                                    <div>Полученная оплата, грн:</div>
                                    <Field id="recived_summ" name="recived_summ" className='input-title'></Field>
                                    <ErrorMessage className="error" name="recived_summ" component="div"/>
                                </div>
                            </div>
                            <div className='form-line'> 
                                <div className={(dataOrder.mmb_pay) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>MMB:</div>
                                        <Field id="mmb_pay" name="mmb_pay" as="select" className='input-title'>
                                            <option>Не выбрано</option>
                                            {adminsList}
                                        </Field>
                                <ErrorMessage className="error" name="mmb_pay" component="div"/>
                                </div>
                                <div className={(dataOrder.start_date) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Дата старта:</div>
                                    <Field id="start_date" name="start_date" type="date" className='input-title'></Field>
                                    <ErrorMessage className="error" name="start_date" component="div"/>
                                </div>     
                            </div>
                            <div className='form-line'>              
                                <div className={(dataOrder.details) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Детализация:</div>
                                    <Field id="details"  name="details" as="textarea" className='input-title'>
                                    </Field>
                                    <ErrorMessage className="error" name="details" component="div"/>
                                </div>          
                            </div>
                            <div className='form-line'>              
                                <div className={(dataOrder.satisfaction_rating) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Удовлетворенность клиента:</div>
                                    <Field id="satisfaction_rating" name="satisfaction_rating" as="select" className='input-title'>
                                        <option>Не выбранно</option>
                                        <option value='1'>Не доволен</option>
                                        <option value='2'>Не известно</option>
                                        <option value='3'>Доволен</option>
                                    </Field>
                                    <ErrorMessage className="error" name="satisfaction_rating" component="div"/>
                                </div> 
                                <div className={(dataOrder.base_summ > 0) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Затраты по проекту, грн:</div>
                                    <Field id="base_summ" name="base_summ" className='input-title'></Field>
                                    <ErrorMessage className="error" name="base_summ" component="div"/>
                                </div>       
                            </div>
                            <div className='form-line'>              
                                <div className={(dataOrder.details) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Детализация затрат:</div>
                                    <Field id="base_summ_details" name="base_summ_details" as="textarea" className='input-title'>                                
                                    </Field>
                                    <ErrorMessage className="error" name="base_summ_details" component="div"/>
                                </div>         
                            </div>
                            <div className='form-line'>              
                                <div className={(dataOrder.resume) ?  "input-cont input-hidden" : "input-cont"}>
                                    <div>Резюме проекта:</div>
                                    <Field id="resume" name="resume" as="textarea" className='input-title'>                                
                                    </Field>
                                    <ErrorMessage className="error" name="resume" component="div"/>
                                </div>           
                            </div>
                            <div className='form-line'>              
                                <div className="input-cont">
                                    <div>Номер бонусной карты:</div>
                                    <Field id="card_num" name="card_num" className='input-title'></Field>
                                    <ErrorMessage className="error" name="card_num" component="div"/>
                                </div>
                                <div className="input-cont">
                                    <div>Сумма на бонусной карте, грн:</div>
                                    <Field id="card_summ" name="card_summ" className='input-title'></Field>
                                    <ErrorMessage className="error" name="card_summ" component="div"/>
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

export default ChangeStartFinal;