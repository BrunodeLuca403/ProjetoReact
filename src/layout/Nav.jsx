import { NavLink } from 'react-router-dom';

function Nav(){
return (
    <nav>
    <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/cadastrosCarros">Cadastros Carros</NavLink></li>
        <li><NavLink to="/cadastrosClientes">Cadastro Cliente</NavLink></li>
        <li><NavLink to="/locacao">Locacão</NavLink></li>
        <li><NavLink to="/pagamento">Pagamento</NavLink></li>
    </ul>
    </nav>
  );
}

export default Nav;