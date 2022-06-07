import { useState } from 'react';
import axios from '../../axios';

const AdminAdd = () => {

    const [admin, setAdmin] = useState({
        name: '',
        tel: '',
        email: '',
        passw: '',
        rule: 0,
        active: 0,

    });

    const [error, setError] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/admins/addAdmin', {
            body: admin
        }).catch(e => {
            setError(e.response.data)
        });
    }

    const onValueChange = (e) => {
        let newValue = e.target.value;
        if (e.target.name === 'active'){
            newValue = e.target.checked ? 1 : 0;
        }
        setAdmin((prevState) => ({
            ...prevState,
           [e.target.name]: newValue
        }))
    }


    return (
        <form className="row g-3" onSubmit = {onSubmit}>
            <h2>Создать пользователя</h2>
            <h2>{error}</h2>
            <div className="col-md-2">
                <label>Имя</label>
                <input type="text" className="form-control"
                    name="name" id="inputEmail4"
                    onChange={onValueChange}/>
            </div>
            <div className="col-md-2">
                <label>Телефон</label>
                <input type="text" className="form-control"
                    name="tel" id="inputEmail4"
                    onChange={onValueChange}/>
            </div>
            <div className="col-md-2">
                <label>Email</label>
                <input type="email" className="form-control"
                    name="email" id="inputEmail4"
                    onChange={onValueChange}/>
            </div>
            <div className="col-md-2">
                <label>Password</label>
                <input type="password" className="form-control"
                    name="passw" id="inputPassword4"
                    onChange={onValueChange}/>
            </div>
            <div className="col-md-2">
                <label>Права</label>
                <input type="numeric" className="form-control"
                    name="rule" id="inputPassword4"
                    onChange={onValueChange}/>
            </div>
         
            <div className="col-12">
                <div className="form-check">
                <input className="form-check-input" type="checkbox"
                    name="active" id="gridCheck"
                    onChange={onValueChange}/>
                <label className="form-check-label">
                    Активный
                </label>
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className="btn btn-primary">Sign in</button>
            </div>
        </form>

    )
  
}

export default AdminAdd;