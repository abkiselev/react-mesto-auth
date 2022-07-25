function PopupWithForm(props) {

    return (
            <section id={`${props.name}-popup`} className={`popup popup_type_${props.name} ${props.isOpen && 'popup_active'}`}>
                <div className="popup__container">
                    <h2 className="popup__title">
                    {`${props.title}`}
                    </h2>
                    <form name={props.name} className={`${props.name} popup__form`} onSubmit={props.onSubmit} noValidate>
                        {props.children}
                        <button type="submit" className={`popup__button ${!props.isFormValid && 'popup__button_disabled'}`}>{props.submitButtonText}</button>
                    </form>
                    <button className="popup__close" type="button" onClick={props.onClose} />
                </div>
                <div className="popup__bg" onClick={props.onClose} />
            </section>
    );
}

export default PopupWithForm;














