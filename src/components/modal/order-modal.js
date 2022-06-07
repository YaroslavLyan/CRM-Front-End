import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

import { dial } from '../../reducers/reducer'
import AddClient from './add-client';

import axios from '../../axios';
import './modal-win.css'

const OrderModal = ({props, showModal}) => {
    
    // get list admins
    const [admins, setAdmins] = useState([]);
  
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
    //-----------------------------

    // get list "reason for deletion"
    const [delReason, setDelReason] = useState([]);//хранилище данных
  
    useEffect(() => {
        
        axios.get('/api/status/statusdel', {
        }).then(
        async ({ data }) => {
            setDelReason(data.status)  
               
        });
    }, [])
    const DeleteReason = delReason.map(item => {
        
        return (
            <option key={item.id} value={item.value}>{item.value}</option>            
        )
    })
    //----------------------------------------------

    
    const [newClient, setNewClient] = useState({});

    //add new data from form
    const editFormOrder = (order) => {
        axios.post('/api/order/editOrders', {
            order_id: props.id,
            order,
            new_clientId: newClient.id
        }).catch(e => { console.log(e); });
        updateOrdersList()//updata orders in the store
        handleClose();//close form
    }

    //updata orders in the store
    const dispatch = useDispatch();//dispatch - метод который обновляет store
    const updateOrdersList = () => {
        axios.get('/api/orders/all').then(
            async ({ data }) => {
              dispatch(dial(data.orders))     
          });
    }
    //----------------------------------------

    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    const create_date = new Date(props.create_date)
    const futureData = (props.future_contact_date == null) ? null : format(new Date(props.future_contact_date), 'uuuu-MM-dd');
    const closeData = (props.close_date == null) ? null : format(new Date(props.close_date), 'uuuu-MM-dd');
    const startData = (props.start_date == null) ? null : format(new Date(props.start_date), 'uuuu-MM-dd');

    return (
        <>
        <div className={showModal===2 ? 'show-btm vertikal-menu' : 'block-btm'}>     
        <Button variant="primary" onClick={handleShow} >
            <i className="fas fa-business-time"></i>Проект
        </Button></div>

        <div className={showModal===1 ? 'show-btm' : 'block-btm'}>     
        <button className='btm-card-event' variant="primary" onClick={handleShow}>
        <i className="fa fa-eye" aria-hidden="true" title='Подробнее'></i></button></div>

        <div className={showModal===3 ? 'show-btm' : 'block-btm'}> 
        <button type="button" className="btn btn-warning mt-1"
            variant="primary" onClick={handleShow}>{props.id}</button></div>

        <Modal show={show} onHide={handleClose} size="lg">
            <Formik 
                initialValues = {{
                    client_id: props.client_id,
                    addr: props.addr,
                    service: props.service,
                    calc_summ: props.calc_summ,
                    start_date: startData,
                    details: props.details,
                    recived_summ: props.recived_summ,
                    mmb_pay: props.mmb_pay,
                    satisfaction_rating: props.satisfaction_rating,
                    card_summ: props.card_summ,
                    card_num: props.card_num,
                    resume: props.resume,
                    base_summ: props.base_summ,
                    base_summ_details: props.base_summ_details,
                    future_contact_date: futureData,
                    name: props.name,
                    description: props.description,
                    payment: props.payment,
                    close_date: closeData,

                }}

                onSubmit = {(order) => editFormOrder(order)}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Проект ID: {props.id}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='blok-change-status'>
                            <div className='blok-order'>
                                <div className='name-cont'><h6>Описание клиента</h6></div>
                                <div className='form-line'>
                                    <div>
                                        {create_date.toLocaleString()}
                                    </div>
                                    <div>
                                        <div>Дата следующего контакта:</div>
                                        <Field id="future_contact_date" name="future_contact_date" type="date"></Field>
                                        <ErrorMessage className="error" name="future_contact_date" component="div"/>
                                    </div>
                                    <p>Статус: {props.status_value}</p>
                                </div>
                                <div className='form-line'>
                                
                                    <div className="input-cont">
                                        <div>Название проекта</div>
                                        <Field id="name" name="name" type="text" className='input-title'></Field>
                                        <ErrorMessage className="error" name="name" component="div"/>
                                    </div>
                                    <div className="input-cont">
                                    <div>Клиент/заказчик:</div>
                                                <Field value={(newClient.id) ? (newClient.fio + newClient.tel) : (props.fio + props.tel)} id="client_id" name="client_id" className='input-title' readOnly="readOnly"></Field>
                                                <AddClient addClient={setNewClient}/>
                                                <ErrorMessage className="error" name="client_id" component="div"/>
                                    </div>
                                </div>
                                <div className='form-line'>
                                
                                    <div className="input-cont">
                                        <div>Адрес выполнения работ:</div>
                                        <Field  id="addr" name="addr" type="text" className='input-title'></Field>
                                        <ErrorMessage className="error" name="addr" component="div"/>
                                    </div>
                                    <div className="input-cont">
                                    <div>Тип объекта</div>
                                        <Field id="object_type" name="object_type" as="select" className='input-title'>
                                            <option value={props.object_type}>{props.object_value ? props.object_value : 'Не выбрано'}</option>
                                            <option value='11'>Офис</option>
                                            <option value='12'>Квартира</option>
                                            <option value='13'>Дом</option>
                                        </Field>
                                        <ErrorMessage className="error" name="terms" component="div"/>
                                    </div>
                                </div>
                                <div className='form-line'>              
                                    <div className="input-cont">
                                        <div>Заказанные услуги:</div>
                                        <Field id="service" name="service" className='input-title'></Field>
                                        <ErrorMessage className="error" name="service" component="div"/>
                                    </div>
                                </div>
                                <div className='form-line'>                    
                                    <div className="input-cont">
                                        <div>Описание:</div>
                                        <Field id="description" name="description" as="textarea" className='input-title'>
                                        </Field>
                                        <ErrorMessage className="error" name="description" component="div"/>
                                    </div>                       
                                </div>                
                            </div>
    {/* ---------------------------- */}
                            <div className='blok-order'>
                                <div className='name-cont'><h6>Финансы</h6></div>
                                <div className='form-line'>                    
                                    <div className="input-cont">
                                        <div>Рассчетная стоимость, грн:</div>
                                        <Field id="calc_summ" name="calc_summ" className='input-title'></Field>
                                        <ErrorMessage className="error" name="calc_summ" component="div"/>
                                    </div>
                                    <div className="input-cont">
                                        <div>Форма оплаты:</div>
                                            <Field id="payment_type" name="payment_type" as="select" className='input-title'>
                                                <option value={props.payment_type}>{props.value}</option>
                                                <option value='20'>Безнал</option>
                                                <option value='19'>Нал</option>
                                            </Field>
                                            <ErrorMessage className="error" name="payment_type" component="div"/>
                                        </div>
                                    </div>
                                <div className='form-line'>                        
                                    <div className="input-cont">
                                        <div>Полученная оплата, грн:</div>
                                        <Field id="base_summ" name="base_summ" className='input-title'></Field>
                                        <ErrorMessage className="error" name="base_summ" component="div"/>
                                    </div>
                                    <div className="input-cont">
                                        <div>Описание оплаты:</div>
                                        <Field id="payment" name="payment" className='input-title'></Field>
                                        <ErrorMessage className="error" name="payment" component="div"/>
                                    </div>
                                </div>
                                <div className='form-line'>                        
                                    <div className="input-cont">
                                        <div>Затраты по проекту, грн:</div>
                                        <Field id="recived_summ" name="recived_summ" className='input-title'></Field>
                                        <ErrorMessage className="error" name="recived_summ" component="div"/>
                                    </div>
                                    <div className="input-cont">
                                        <div>Детализация затрат:</div>
                                        <Field id="base_summ_details" name="base_summ_details" as="textarea" className='input-title'>                                
                                        </Field>
                                        <ErrorMessage className="error" name="base_summ_details" component="div"/>
                                    </div>
                                </div>          
                            </div>
                        
        {/* --------------------------- */}
                            <div className='blok-order'>
                                <div className='name-cont'><h6>Детализация проекта</h6></div>
                                <div className='form-line'>
                                    <div className="input-cont">
                                        <div>Дата старта:</div>
                                        <Field id="start_date" name="start_date" type="date"></Field>
                                        <ErrorMessage className="error" name="start_date" component="div"/>
                                    </div>
                                    <div className="input-cont">
                                        <div>MMB:</div>
                                        <Field id="mmb_pay" name="mmb_pay" as="select" className='input-title'>
                                            <option>Не выбрано</option>
                                            {adminsList}
                                        </Field>
                                        <ErrorMessage className="error" name="mmb_pay" component="div"/>
                                    </div>
                                </div>
                                <div className='form-line'>              
                                    <div className="input-cont">
                                        <div>Детализация:</div>
                                        <Field id="details" name="details" as="textarea" className='input-title'>                                
                                        </Field>
                                        <ErrorMessage className="error" name="details" component="div"/>
                                    </div>        
                                </div>
                            </div>
        {/* ------------------------------------- */}

                            <div className='blok-order'>
                                <div className='name-cont'><h6>Завершение</h6></div>
                                <div className='form-line'>
                                    <div className="input-cont">
                                        <div>Удовлетворенность клиента:</div>
                                        <Field id="satisfaction_rating" name="satisfaction_rating" as="select" className='input-title'>
                                                    <option>{props.satisfaction_rating ? props.satisfaction_rating : 'Не выбранно'}</option>
                                                    <option value='1'>Не доволен</option>
                                                    <option value='2'>Не известно</option>
                                                    <option value='3'>Доволен</option>
                                                </Field>
                                        <ErrorMessage className="error" name="terms" component="div"/>
                                    </div>
                                    <div className="input-cont">
                                        <div>Ответственный менеджер:</div>
                                        <Field id="manager_id" name="manager_id" as="select" className='input-title'>
                                            <option>{props.manager_id}</option>
                                            {adminsList}
                                        </Field>
                                        <ErrorMessage className="error" name="terms" component="div"/>
                                    </div>      
                                </div>
                                <div className='form-line'>
                                    <div className="input-cont">
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
        {/* ---------------------------------- */}

                            <div className='blok-order'>
                                <div className='name-cont'><h6>Другое</h6></div>
                                <div className='form-line'>
                                    <div className="input-cont">
                                        <div>Причина удаления/ожидания:</div>
                                        <Field id="delete_reason" name="delete_reason" as="select" className='input-title'>
                                            <option value={props.delete_reason}>{props.delete_reason ? props.delete_reason : 'Не выбранно'}</option>
                                            {DeleteReason}
                                        </Field>
                                        <ErrorMessage className="error" name="delete_reason" component="div"/>
                                    </div>    
                                    <div className="input-cont">
                                        <div>Дата закрытия:</div>
                                        <Field id="close_date" name="close_date" type="date" className='input-title'></Field>
                                        <ErrorMessage className="error" name="close_date" component="div"/>
                                    </div>  
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

export default OrderModal;