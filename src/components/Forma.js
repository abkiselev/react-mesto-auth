import { useState, useEffect } from 'react';

function Forma({ children, title, name, onSubmit, isFormValid, submitButtonText, onClose, loggedIn }) {    
    const viewPopup = {
        container: 'popup__container',
        title: 'popup__title',
        form: `${name} popup__form`,
        button: 'popup__button',
        buttonDisabled: 'popup__button_disabled',
        closeButton: 'popup__close',
    }
    
    const viewStatic = {
        container: 'static-form',
        title: 'static-form__title',
        form: `${name} static-form__form`,
        button: 'static-form__button',
        buttonDisabled: 'static-form__button_disabled',
        closeButton: '_not_visible',
    }
    
    const [formState, setFormState] = useState({});
    
    useEffect(() => {
        if(!loggedIn){
            setFormState(viewStatic)
        } else {setFormState(viewPopup)}
    }, []);
    
    
    
    return (
            
            <div className={formState.container}>
                <h2 className={formState.title}>
                {title}
                </h2>
                <form name={name} className={formState.form} onSubmit={onSubmit} noValidate>

                    {children}

                    <button type="submit" className={`${formState.button} ${!isFormValid && `${formState.buttonDisabled}`}`}>{submitButtonText}</button>
                </form>
                <button className={formState.closeButton} type="button" onClick={onClose} />
            </div>
                
    );
}

export default Forma;