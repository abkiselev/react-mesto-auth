import logo from '../images/logo.svg';
import { useLocation, Link } from "react-router-dom";

function Header() {
    let location = useLocation();

    return (
          <header className="header">

                <Link to='/'><img className="logo" src={logo} alt="Место Россия" /></Link>
              
                <nav className="header__links">
                    {(location.pathname === '/sign-in') ? 
                        <Link className="header__link" to='/sign-up'>Регистрация</Link>
                        : (location.pathname === '/sign-up') ? 
                        <Link className="header__link" to='/sign-in'>Войти</Link>
                        : <>
                            <p className="header__email">email@mail.com</p> 
                            <Link className="header__link header__link_out" to='/'>Выйти</Link>
                        </>
                    }
                </nav>

          </header>
    );
}

export default Header;
