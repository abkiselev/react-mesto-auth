import { useState } from 'react';
import PopupWithForm from './PopupWithForm';


function DeleteCardPopup({ isOpen, onClose, selectedCard, onDeleteCard, submitButtonText }) {
    const [isFormValid, setIsFormValid] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
      
        onDeleteCard(selectedCard);
    } 


    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            name='delete-card'
            title='Уверены?'
            submitButtonText={submitButtonText}
            isFormValid={isFormValid}
        >       

        </PopupWithForm>
    );
}

export default DeleteCardPopup;
