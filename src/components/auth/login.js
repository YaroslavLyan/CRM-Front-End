import { useState } from 'react';

import axios from '../../axios';

import './login.css';

const LoginInSystem = () => {

    const [inputPhone, setInputPhone] = useState();
    const [inputPassw, setInputPassw] = useState();

    const onLogin = (e) => {
        axios.post('/api/auth', {
            tel: inputPhone,
            passw: inputPassw 
        }).then(
        async (res) => {
            if(res.status === 200) {
                const login = await res.data.token;
                window.localStorage.setItem('token', `${login}`);
                window.location.href = "/";
            }     
        }).catch(e => {
            if(e.response.status === 400) {alert('Email or password not correct')}
            console.log(e)
        }); 
    }

   
    return (
        <div className='page-login'>
            <h3 className='text-top'>Авторизация</h3>
            <div className='input-div-auth'>
                <div>Номер телефона:</div>
                <input className='input-auth' type="text" data-format="+38 (ddd) ddd-dd-dd" onChange={(e) => setInputPhone(e.target.value)}></input>
            </div>
            <div className='input-div-auth'>
                <div>Пароль:</div>
                <input type="password" className="input-auth" onChange={(e) => setInputPassw(e.target.value)}></input>
            </div>
            <button className="btn-auth" onClick={onLogin} >ВХОД</button>

        </div>
    )
}

export default LoginInSystem;