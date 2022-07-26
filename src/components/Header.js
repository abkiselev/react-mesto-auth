import logo from '../images/logo.svg';
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

function Header() {
    let location = useLocation();

    const [isBurgerOpen, setIsBurgerOpen] = useState(false);

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
                                    <p className="header__email">email@mail.com</p> 
                                    <Link className="header__link header__link_out" to='/'>Выйти</Link>
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

export default Header;
