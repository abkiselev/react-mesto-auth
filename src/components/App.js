import { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import ImagePopup from './ImagePopup';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
    const [currentUser, setCurrentUser] = useState([]);

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    const [isCardPopupOpen, setIsCardPopupOpenState] = useState(false);

    const [cards, setInitialCards] = useState([]);

    const [submitButtonText, setSubmitButtonText] = useState('Сохранить');
    const [submitDeleteButtonText, setSubmitDeleteButtonText] = useState('Да');


    useEffect(() => {
        api.getInitialCards()
            .then(res =>{
                setInitialCards(res)
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`));
    }, [])

    useEffect(() => {
        api.getProfileInfo()
            .then(res => setCurrentUser(res))
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`));
    }, [])


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        
        api.setCardLike(card._id, !isLiked ? 'PUT' : 'DELETE')
            .then((newCard) => {
                setInitialCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`));
    } 
    

    function handleCardDelete(card) {  
        setSubmitDeleteButtonText("Удаление...");

        api.deleteCard(card._id)
            .then((res) => {
                setInitialCards((newCards) => newCards.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`))
            .finally(() => {
                setSubmitDeleteButtonText("Да");
            })
    } 

    function handleAddPlaceSubmit({name, link}) {
        setSubmitButtonText("Сохранение...");

        api.createNewCard({name, link})
            .then(res => {
                setInitialCards([res, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`))
            .finally(() => {
                setSubmitButtonText("Сохранить");
            })
    }


    function handleUpdateUser({name, about}) {
        setSubmitButtonText("Сохранение...");

        api.changeProfileInfo({name, about})
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`))
            .finally(() => {
                setSubmitButtonText("Сохранить");
            })
    }

    function handleUpdateAvatar({avatar}) {
        setSubmitButtonText("Сохранение...");

        api.changeProfileAvatar({avatar})
            .then(res => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch(err => console.log(`${err.message}, Что-то пошло не так, попробуйте обновить страницу`))
            .finally(() => {
                setSubmitButtonText("Сохранить");
            })
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    function handleEditAvatarClick() {        
        setIsEditAvatarPopupOpen(true)
    }

    function handleCardClick(card) {
        setSelectedCard(card)
        setIsCardPopupOpenState(true)
    }

    function handleDeleteButtonClick(card) {
        setSelectedCard(card)
        setIsDeleteCardPopupOpen(true)
    }

    function closeAllPopups() {
        isEditProfilePopupOpen && setIsEditProfilePopupOpen(false)
        isAddPlacePopupOpen && setIsAddPlacePopupOpen(false)
        isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false) 

        if(isDeleteCardPopupOpen){
            setIsDeleteCardPopupOpen(false)
            setSelectedCard({}) 
        }

        if(isCardPopupOpen){
            setIsCardPopupOpenState(false)
            setSelectedCard({}) 
        }
        
    }


    return (
        <div className="container">
            <CurrentUserContext.Provider value={currentUser}>
                <Header />

                <Main
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleDeleteButtonClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick}
                    onCardClick={handleCardClick}
                />

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    submitButtonText={submitButtonText}
                />                 

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    submitButtonText={submitButtonText}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    submitButtonText={submitButtonText}
                />

                <DeleteCardPopup
                    selectedCard={selectedCard}
                    isOpen={isDeleteCardPopupOpen}
                    onClose={closeAllPopups}
                    onDeleteCard={handleCardDelete}
                    submitButtonText={submitDeleteButtonText}
                />

                <ImagePopup
                    selectedCard={selectedCard}
                    isOpen={isCardPopupOpen}
                    onClose={closeAllPopups}
                />

            </CurrentUserContext.Provider>
        </div>
    );
}

export default App;
