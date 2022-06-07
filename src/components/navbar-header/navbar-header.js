import React from 'react';
import { useNavigate, Link, NavLink } from "react-router-dom";
import {Offcanvas} from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

import Events from '../current-events/current-events'
import './navbar-header.css';

const NavbarHeader = () => {

    const user = useSelector((state) => state.auth.userAuth);
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showEvents, setShowEvents] = useState(false);

    const onShowEvents = () => setShowEvents(true);
    const onCloseEvents = () => setShowEvents(false);


    const ref = useRef(null);

 
    useEffect(() => {
 
        function handleClickOutside(event) {
        if (showEvents && ref.current && !ref.current.contains(event.target)) {
            onCloseEvents();
        }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, showEvents]);

    return (
        <>
            <nav className="nav">
                <Link to="" variant="primary" className="n-link" onClick={handleShow}>
                    <span className="fa-solid fa-bars"></span>
                </Link>
                <Offcanvas show={show} onHide={handleClose} className='offcanvas-body'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title><i className="fa-solid fa-user"></i> {user?.name}</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Link to="/admins" className="nav-link" onClick={() => {navigate('/admins'); handleClose()}}>
                            Пользователи
                        </Link>
                        <Link to="/clients" className="nav-link" onClick={() => {navigate('/clients'); handleClose()}}>
                            Клиенты
                        </Link>
                        <div className='logaut'>
                        <Link to="/login" className="nav-link" onClick={() => {navigate('/login'); 
                            window.localStorage.clear(); handleClose()}}>
                            Выйти
                        </Link>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>

                <ul className="nav nav-left">
                    <li className="nav-item">
                        <NavLink end 
                                className={({ isActive }) => "n-link" + (isActive ? " nav-menu" : "")}
                                to=""  aria-current="page" href="/">Лиды</NavLink>
                    </li>

                    <li className="n-item">
                        <NavLink end 
                                className={({ isActive }) => "n-link" + (isActive ? " nav-menu" : "")}
                                to="/work" onClick={() => navigate('/work')}>В работе</NavLink>
                    </li>
                    
                    <li className="n-item">
                        <NavLink end 
                                className={({ isActive }) => "n-link" + (isActive ? " nav-menu" : "")}
                                to="/archive" onClick={() => navigate('/archive')}>Архив</NavLink>
                    </li>
                    <li className="n-item">
                        <NavLink end 
                                className={'n-link'}
                                to="#!" onClick={onShowEvents}>События</NavLink>
                    </li> 
                    
                </ul>
            
            </nav>  
            <div className='modal-massege' ref={ref} style={{display: showEvents ? 'block' : 'none'}}>
                <div className='header-event-modal'><b>Текущие задания</b>
                    <button type="button" className="popup_close" onClick={onCloseEvents}>
                        <strong><i className="fa fa-times" aria-hidden="true"></i></strong>
                    </button>
                </div>
                <Events/>
            </div>  
        </>
    );
      
}



export default NavbarHeader;