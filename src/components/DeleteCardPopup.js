import { useState } from 'react';
import Popup from './Popup';


function DeleteCardPopup({ isOpen, onClose, selectedCard, onDeleteCard, submitButtonText }) {
    const [isFormValid, setIsFormValid] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
      
        onDeleteCard(selectedCard);
    } 


    return (
        <Popup
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
            name='delete-card'
            title='Уверены?'
            submitButtonText={submitButtonText}
            isFormValid={isFormValid}
        >       

        </Popup>
    );
}

export default DeleteCardPopup;
