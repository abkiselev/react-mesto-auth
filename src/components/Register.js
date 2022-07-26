import React, { useEffect } from 'react';
import UseValidation from '../hooks/UseValidation';
import Forma from './Forma';
import { Link } from "react-router-dom";

function Register({ isOpen, onClose, onAddPlace, submitButtonText, loggedIn }) {
    const { isFormValid, values, handleValues, errors, setInitialValues } = UseValidation();
    
    useEffect(() => {
        setInitialValues({email: '', pass: ''}) 
    }, [])


    function handleSubmit(e) {
        e.preventDefault();     
        onAddPlace({ email: values.email, pass: values.pass});
    } 


    return (
        <>
        
        <Forma
                loggedIn={loggedIn}
                onSubmit={handleSubmit}
                name='login'
                title='Регистрация'
                submitButtonText='Зарегистрироваться'
                isFormValid={isFormValid}
            >       
                
            <fieldset className="popup__inputs">
                <input 
                value={values.email || ''}
                onChange={handleValues}
                name="email"
                id="email"
                className="static-form__input" 
                type="email" 
                placeholder="Email" 
                noValidate
                required
                />
                <p className="popup__error">{errors.email}</p>

                <input 
                value={values.pass || ''}
                onChange={handleValues}
                name="pass"
                id="pass"
                className="static-form__input" 
                type="text" 
                minLength="6"
                maxLength="30"
                placeholder="Пароль" 
                noValidate
                required
                />
                <p className="popup__error">{errors.pass}</p>
            </fieldset>
                        
        </Forma>

        <p className="static-form__undertext">Уже зарегистрированы? <Link className="header__link header__link_place_form" to='/sign-in'>Войти</Link></p>
        
        </>
    );
}

export default Register;
