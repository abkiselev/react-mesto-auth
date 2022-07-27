import logo from '../images/logo.svg';
import { useLocation, Link, withRouter } from "react-router-dom";
import { useState } from "react";

function Header(props) {
    let location = useLocation();

    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

    function logOut(){
        setIsBurgerOpen(false)
        props.signOut()
    }

    return (
        <>
            <div className={`${'header__top'} ${isBurgerOpen && 'header__top_visible'}`}></div>
            <header className="header">

                    <Link to='/'><img className="logo" src={logo} alt="Место Россия" /></Link>
                
                    <nav className="header__links">
                        {(location.pathname === '/sign-in') ? 
                            <Link className="header__link" to='/sign-up'>Регистрация</Link>
                            : (location.pathname === '/sign-up') ? 
                            <Link className="header__link" to='/sign-in'>Войти</Link>
                            : <div className="header__loggedin">
                                <nav className={`${'header__loggedin_links'} ${isBurgerOpen && 'header__loggedin_links_visible'}`}>
                                    <p className="header__email">{props.userEmail}</p> 
                                    <button className="header__link header__link_out" to='#' onClick={logOut}>Выйти</button>
                                </nav>
                                
                                <label htmlFor='burger' className="burger" >
                                    <input type="checkbox" name="burger" id="burger" className="burger__checkbox" onChange={()=>setIsBurgerOpen(!isBurgerOpen)}/>
                                    <span htmlFor='burger' className="burger__icon" />                          
                                </label>
                                
                            </div>
                        }
                    </nav>

            </header>
          </>
    );
}

export default withRouter(Header);
