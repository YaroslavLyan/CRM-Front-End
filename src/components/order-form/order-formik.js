import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import axios from '../../axios';

import './order-form.css';



const OrderForm = ({ initState }) => {
    if (!initState) {
        return null
    }
    console.log(initState)
    return(
        <Formik 
        initialValues = {initState}
        validationSchema = {Yup.object({
            name: Yup.string()
                    .min(5, 'Min 2 simvol')
                    .required('Обязательное поле'),
            email: Yup.string()
                        .email('email error')
                        .required('Обязательное поле'),
            tel: Yup.number()
                        .min(5, 'min 5')
                        .required('Обязательное поле'),
            description: Yup.string()
                        .required('Change поле'),
            terms: Yup.boolean()
                      .required('необходимо согласие')
                      .oneOf([true], 'необходимо согласие'),
        })}
        onSubmit = {values => console.log(JSON.stringify(values))}
        >
            
            <Form className="form">
                <div className='blok-order'>
                    <div className='name-cont'><h6>Описание клиента</h6></div>
                    <div className='form-line'>
                        <div>
                            <div>ID: 97</div> 23.02.2022 в 16:51
                        </div>
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
                            <div>Клиент</div>
                            Тарас 74 ген Троещина ☏ (067) 311-15-55
                            <button><i className="fa fa-address-book" aria-hidden="true"></i></button>
                        </div>
                    </div>
                    <div className='form-line'>
                    
                        <div className="input-cont">
                            <div>Адрес выполнения работ:</div>
                            <Field  id="addr" name="addr" type="text" className='input-title'></Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                        <div className="input-cont">
                        <div>Тип объекта</div>
                            <Field id="object_type" name="object_type" as="select" className='input-title'>
                                <option value='all'>Квартира</option>
                                <option value='all'>Все fffff</option>
                                <option value='all'>Все ssssss</option>
                            </Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                    </div>
                    <div className='form-line'>              
                        <div className="input-cont">
                            <div>Заказанные услуги:</div>
                            <Field id="service" name="service" className='input-title'></Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                    </div>
                    <div className='form-line'>                    
                        <div className="input-cont">
                            <div>Описание:</div>
                            <Field id="description" name="description" as="textarea" className='input-title'>
                            </Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
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
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                        <div className="input-cont">
                            <div>Форма оплаты:</div>
                                <Field id="payment_type" name="payment_type" as="select" className='input-title'>
                                    <option value='all'>Безнал</option>
                                    <option value='all'>нал</option>
                                </Field>
                                <ErrorMessage className="error" name="terms" component="div"/>
                            </div>
                        </div>
                    <div className='form-line'>                        
                        <div className="input-cont">
                            <div>Полученная оплата, грн:</div>
                            <Field id="base_summ" name="base_summ" className='input-title'></Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                        <div className="input-cont">
                            <div>Описание оплаты:</div>
                            <Field id="payment" name="payment" className='input-title'></Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                    </div>
                    <div className='form-line'>                        
                        <div className="input-cont">
                            <div>Затраты по проекту, грн:</div>
                            <Field id="recived_summ" name="recived_summ" className='input-title'></Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                        <div className="input-cont">
                            <div>Детализация затрат:</div>
                            <Field id="details" name="details" as="textarea" className='input-title'>                                
                            </Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
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
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                        <div className="input-cont">
                            <div>MMB:</div>
                        <Field id="mmb_pay" name="mmb_pay" as="select" className='input-title'>
                            <option value='all'>Dima</option>
                            <option value='all'>Yarik</option>
                        </Field>
                        <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                    </div>
                    <div className='form-line'>              
                        <div className="input-cont">
                            <div>Детализация:</div>
                            <Field id="details" name="details" as="textarea" className='input-title'>                                
                            </Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
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
                                <option value='all'>Доволен</option>
                                <option value='all'>Не доволен</option>
                            </Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                        <div className="input-cont">
                            <div>Ответственный менеджер:</div>
                            <Field id="manager_id" name="manager_id" as="select" className='input-title'>
                                <option value='all'>Yarik</option>
                                <option value='all'>Svetik</option>
                            </Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>      
                    </div>
                    <div className='form-line'>
                        <div className="input-cont">
                            <div>Резюме проекта:</div>
                            <Field id="resume" name="resume" as="textarea" className='input-title'>                                
                            </Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>            
                    </div>
                    <div className='form-line'>
                        <div className="input-cont">
                            <div>Номер бонусной карты:</div>
                            <Field id="card_num" name="card_num" className='input-title'></Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>
                        <div className="input-cont">
                            <div>Сумма на бонусной карте, грн:</div>
                            <Field id="card_summ" name="card_summ" className='input-title'></Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
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
                                <option value='all'>Дорого</option>
                                <option value='all'>Нашли других</option>
                            </Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>    
                        <div className="input-cont">
                            <div>Дата закрытия:</div>
                            <Field id="close_date" name="close_date" type="date" className='input-title'></Field>
                            <ErrorMessage className="error" name="terms" component="div"/>
                        </div>  
                    </div>
                </div>             
            
            </Form>
            
        </Formik>
        
    )
    }

export default OrderForm;