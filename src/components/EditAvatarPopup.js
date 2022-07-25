import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm';
import UseValidation from '../hooks/UseValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, submitButtonText}) {  
    const inputRef = useRef();    
    const { isFormValid, values, handleValues, errors, setInitialValues } = UseValidation(); 

    useEffect(() => {
        if(isOpen){
            setInitialValues({ avatar: '' })
        }
    }, [isOpen])


    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({ avatar: inputRef.current.value });
    }


    return (
        <PopupWithForm
                    onSubmit={handleSubmit}
                    onClose={onClose}
                    isOpen={isOpen}
                    name='edit-avatar'
                    title='Обновить аватар'
                    submitButtonText={submitButtonText}
                    isFormValid={isFormValid}
                >       
                    
                    <fieldset className="popup__inputs">
                        <input 
                        ref={inputRef}
                        value={values.avatar || ''}
                        onChange={handleValues}
                        name="avatar"
                        id="edit-avatar-url"
                        className="popup__input popup__input_type_mesto-url" 
                        type="url" 
                        placeholder="Ссылка на картинку" 
                        noValidate
                        required
                        />
                        <p className="popup__error edit-avatar-url-error">{errors.avatar}</p>
                    </fieldset>
                
                </PopupWithForm>
    );
}

export default EditAvatarPopup;
