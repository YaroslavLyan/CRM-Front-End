import { Button, Modal, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';

import axios from '../../axios';
import './modal-win.css'

const AddClient = ({addClient}) => {

    
    const [faundClient, setFaundClient] = useState([]);


    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault()
        setShow(true)
    };

    const waitOrders = (client) => {
        axios.post('/api/clients/addClient', {
            client
        }).then(
            async ({ data }) => {
                const {fio, tel} = client;
                addClient({id: data.id, fio, tel}); 
                             
        }).catch(e => {
            console.log(e);
        });

        handleClose();
    }

    const changeClient = (id, fio, tel) => {
        addClient({id, fio, tel})
        handleClose()
    }
  
    let timerId;
    function activBtm() {
        
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(findlistClients, 500);
    }

    // let elements;
    function findlistClients() {
        let tel = document.getElementById("tel").value;
        axios.post('/api/clients/findClient', {
            tel: tel
          }).then(
            async ({ data }) => {
                setFaundClient(data.clients || []) 
                             
        }); 
        
    }

    
    
    
    
        

    return (
        <>
        
        <button variant="primary" onClick={handleShow}>
            <i className="fa-solid fa-plus"></i>
        </button>

        <Formik 
        initialValues = {{
            tel: '',
            fio: '',
            email: '',
            site: '',
            messanger: '',
            card_num: '',
            card_summ: '',
            comment: ''

        }}
        validationSchema = {Yup.object({
            fio: Yup.string()
                    .min(5, 'Min 2 simvol')
                    .required('Обязательное поле'),
            // email: Yup.string()
            //             .email('email error')
            //             .required('Обязательное поле'),
            tel: Yup.number()
                        .min(5, 'min 5')
                        .required('Обязательное поле'),
            // description: Yup.string()
            //             .required('Change поле'),
            // terms: Yup.boolean()
            //         .required('необходимо согласие')
            //         .oneOf([true], 'необходимо согласие'),
        })}
        onSubmit = {(client) => waitOrders(client)}
        >
            
            <Modal show={show} onHide={handleClose}>
            <Form>
                <Modal.Header closeButton>
                    <Modal.Title>Новый клиент</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='blok-add-order'>
                        <div className='form-line'>
                            <div className="input-cont">
                                <div>Телефон*:</div>
                                <Field id="tel" name="tel" className='input-title' onInput={activBtm}></Field>
                                <ErrorMessage className="error" name="tel" component="div"/>
                            </div> 
                            <div className="input-cont">
                                <div>ФИО*:</div>
                                <Field id="fio" name="fio" className='input-title'></Field>
                                <ErrorMessage className="error" name="fio" component="div"/>
                            </div> 
                            <div className="input-cont">
                                <div>E-mail:</div>
                                <Field id="email" name="email" className='input-title'></Field>
                                <ErrorMessage className="error" name="email" component="div"/>
                            </div>
                        </div>
                        
                        {faundClient.map(item => {
                            return (
                                <ListGroup horizontal key={item.id} className="modal-add-client-list">
                                    <ListGroup.Item className="modal-add-client-item">{item.fio}</ListGroup.Item>
                                    <ListGroup.Item className="modal-add-client-item-btm">{item.tel}</ListGroup.Item>
                                    <ListGroup.Item className="modal-add-client-item-btm"><Button onClick={()=>changeClient(item.id, item.fio, item.tel)} variant="primary" className='btm-add-client-list'>
                                    <i className="fa-solid fa-circle-chevron-right"></i>
                                </Button></ListGroup.Item></ListGroup>
                            )
                            })}
                        <div className='form-line'>              
                            <div className="input-cont">
                                <div>Сайт:</div>
                                <Field id="site" name="site" className='input-title'></Field>
                                <ErrorMessage className="error" name="site" component="div"/>
                            </div>  
                            <div className="input-cont">
                                <div>Мессенджеры:</div>
                                <Field id="messanger" name="messanger" className='input-title'></Field>
                                <ErrorMessage className="error" name="messanger" component="div"/>
                            </div>  
                            <div className="input-cont">
                                <div>Номер карты:</div>
                                <Field id="card_num" name="card_num" className='input-title'></Field>
                                <ErrorMessage className="error" name="card_num" component="div"/>
                            </div>   
                            <div className="input-cont">
                                <div>Баланс, грн:</div>
                                <Field id="card_summ" name="card_summ" className='input-title'></Field>
                                <ErrorMessage className="error" name="card_summ" component="div"/>
                            </div>    
                        </div>
                        <div className='form-line'>              
                            <div className="input-cont">
                                <div>Коментарии и заметки:</div>
                                <Field id="comment" name="comment" as="textarea" className='input-title'>
                                </Field>
                                <ErrorMessage className="error" name="comment" component="div"/>
                            </div>          
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Отмена
                </Button>
                <Button type='submit' variant="primary" className='del-order'>
                    Сохранить и выбрать
                </Button>
                </Modal.Footer>
                </Form>
            </Modal>
            
        </Formik>
        </>
    )
}

export default AddClient;