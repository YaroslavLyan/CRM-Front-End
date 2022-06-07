import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import axios from '../../axios';
import OrderFormik from './order-formik';

import './order-form.css';



const OrderForm = (props) => {
    


    const [data, setOrder] = useState({});//хранилище данных
    const [initialValues, setInitialValues] = useState();
    //list admins in the filter
    useEffect(() => {//аналог дом дерева (загружать когда загрузиться дерево)
        axios.get(`/api/order/${props.id}`)
        .then(
        async ({ data }) => {
            
            setOrder(data.order)
            console.log(data.order);
            setInitialValues((state) => ({...state, ...data.order}))      
        });
    }, [])//[] если занести переменную то при любом изменении будет перезапускаться функция
    
    
    // const {id, close_date, name, addr, client_fio, tel, recived_summ, 
    //     base_summ, executor_name, card_num, card_summ, 
    //     satisfaction_rating, resume, admin_name} = data[0];
        console.log(data.name);
    return (<OrderFormik initState={initialValues} />)

}

export default OrderForm;