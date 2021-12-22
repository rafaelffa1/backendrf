'use strict';

const e = React.createElement;

class MenuDashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ul className="sidebar-menu">
        <li className="header">MENU</li>
        <li className="treeview">
          <a href="index.html">
            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
          </a>
        </li>
        <li className="header">PRODUTO</li>
        <li className="treeview">
          <a href={`http://${window.location.host}/panel/cadastro_produtos?token=${localStorage.getItem("token_login_portec")}`}>
            <i className="fa fa-dashboard"></i> <span>Cadastrar</span>
          </a>
        </li>
        <li className="treeview">
          <a href={`http://${window.location.host}/panel/lista_produtos?token=${localStorage.getItem("token_login_portec")}`}>
            <i className="fa fa-dashboard"></i> <span>listar</span>
          </a>
        </li>

        <li className="header">USUÁRIO</li>
        <li className="treeview">
          <a href={`http://${window.location.host}/panel/cadastro_usuarios?token=${localStorage.getItem("token_login_portec")}`}>
            <i className="fa fa-dashboard"></i> <span>Cadastrar</span>
          </a>
        </li>
        <li className="treeview">
          <a href={`http://${window.location.host}/panel/lista_usuarios?token=${localStorage.getItem("token_login_portec")}`}>
            <i className="fa fa-dashboard"></i> <span>listar</span>
          </a>
        </li>

      </ul>
    );
  }
}

const domContainer = document.querySelector('#menu_dashboard');
ReactDOM.render(e(MenuDashboard), domContainer);