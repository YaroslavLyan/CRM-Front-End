import { Button, Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { useDispatch } from 'react-redux';

import { dial } from '../../reducers/reducer'
import AddClient from './add-client';

import axios from '../../axios';
import './modal-win.css'

const CreateNewOrder = () => {
    
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

   

    
    const [newClient, setNewClient] = useState({});

    //add new data from form
    const addNewOrder = (order) => {
        axios.post('/api/order/addOrder', {
            order,
            new_clientId: newClient.id,
            create_date: Date.parse(new Date())
        }).catch(e => { console.log(e); });
        updateOrdersList()//updata orders in the store
        handleClose();//close form
    }

    //updata orders in the store
    const dispatch = useDispatch();
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


    return (
        <>    
        
        <button className='btm-add-new-dial' variant="primary" onClick={handleShow}><i className="fa-solid fa-plus"></i></button>


        <Modal show={show} onHide={handleClose} size="lg">
            <Formik 
                initialValues = {{
                    client_id: 0,
                    addr: '',
                    service: '',
                    calc_summ: 0,
                    start_date: '',
                    details: '',
                    recived_summ: 0,
                    mmb_pay: 0,
                    base_summ: 0,
                    base_summ_details: '',
                    future_contact_date: '',
                    name: '',
                    description: '',
                    payment: '',
                    object_type: 13,
                    payment_type: 19,

                }}

                onSubmit = {(order) => addNewOrder(order)}
            >
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Новый проект</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='blok-change-status'>
                            <div className='blok-order'>
                                <div className='name-cont'><h6>Описание клиента</h6></div>
                                <div className='form-line'>
                                    <div>
                                        <div>Дата следующего контакта:</div>
                                        <Field id="future_contact_date" name="future_contact_date" type="date"></Field>
                                        <ErrorMessage className="error" name="future_contact_date" component="div"/>
                                    </div>
                                    <p>Статус: Сделка</p>
                                </div>
                                <div className='form-line'>
                                
                                    <div className="input-cont">
                                        <div>Название проекта</div>
                                        <Field id="name" name="name" type="text" className='input-title'></Field>
                                        <ErrorMessage className="error" name="name" component="div"/>
                                    </div>
                                    <div className="input-cont">
                                    <div>Клиент/заказчик:</div>
                                                <Field value={(newClient.fio) ? newClient.fio + newClient.tel : ''} id="client_id" name="client_id" className='input-title' readOnly="readOnly"></Field>
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
                                            <option value='null'>Не выбрано</option>
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
                                                <option value='null'>Не выбрано</option>
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

                        </div>             
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type='submit' variant="primary" className='del-order'>
                            Добавить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Formik>
        </Modal>
         
        </>
    )
}

export default CreateNewOrder;