import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { auth, loading } from '../../reducers/auth-reducer';
import axios from '../../axios';


const ControlAuth = (props) => {

    const token = window.localStorage.getItem('token');

    const dispatch = useDispatch();
    
    useEffect(() => {
        if (token) {
          axios.get('/api/check').then(
            async ({ data }) => {
              dispatch(auth(data))
            }
          ).finally(() => {
            dispatch(loading(false))
          })
        } else {
          dispatch(loading(false))
        }
    }, [token, dispatch])
}
export default ControlAuth;