'use strict';

const e = React.createElement;

class MenuUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario_logado: {}
    }
    // this.usuario_logado = {};
  }

  componentWillMount = () => {
    this.getUserLocalStorage();
  }

  getUserLocalStorage = () => {
    const userLocalStorage = localStorage.getItem("user_portec");
    const objectUserb64 = window.atob(userLocalStorage);
    const usuario_logado = JSON.parse(window.atob(objectUserb64.slice(7)));
    this.usuario_logado = usuario_logado;
    this.setState({ usuario_logado: usuario_logado });
  }

  onClickLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token_login_portec');
    localStorage.removeItem('user_portec');
    window.location.href = `http://${window.location.host}/panel`;
  }

  render() {
    const { usuario_logado } = this.state;
    console.log(usuario_logado);
    return (
      <div className="sticky-header header-section" style={{ padding: '10px' }}>
        <div className="header-left">
          <button id="showLeftPush"><i className="fa fa-bars"></i></button>
        </div>
        <div className="header-right">
          <div className="profile_details">
            <ul>
              <li className="dropdown profile_details_drop">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                  <div className="profile_img">
                    <span className="prfil-img">
                      <img style={{ height: 40, width: 40 }} className="img-responsive" src={`http://${window.location.host}/img/usuarios/${usuario_logado.foto}`} alt="profile_picture" />
                    </span>
                    <div className="user-name">
                      <p>{usuario_logado.nome}</p>
                      {/* {usuario_logado.tipo === 1 && <span>Administrator</span>} */}
                      <span>Administrator</span>
                    </div>
                    <i className="fa fa-angle-down lnr"></i>
                    <i className="fa fa-angle-up lnr"></i>
                    <div className="clearfix"></div>
                  </div>
                </a>
                <ul className="dropdown-menu drp-mnu">
                  <li>
                    <a onClick={(e) => this.onClickLogout(e)} href="#">
                      <i className="fa fa-sign-out"></i>
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div >
    );
  }
}

const domContainer = document.querySelector('#menu_usuario');
ReactDOM.render(e(MenuUsuario), domContainer);