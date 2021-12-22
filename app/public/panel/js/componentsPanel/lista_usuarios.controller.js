'use strict';

const e = React.createElement;

class ListaProdutos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: []
    }

    this.verificarLogin(localStorage.getItem("token_login_portec"))
  }

  componentDidMount = () => {
    this.fetchUsuarios();
  }

  verificarLogin = (token) => {
    if (token === null) {
      window.location.href = `http://${window.location.host}/panel`
      return
    }
    $.ajax({
      type: "POST",
      url: `http://${window.location.host}/verificar_login`,
      data: { token },
      success: (resp) => {
        console.log(resp.result)
        if (resp.result !== true) {
          window.location.href = `http://${window.location.host}/panel`
        }
      }
    })
  }

  fetchUsuarios = () => {
    $.ajax({
      type: "GET",
      url: `http://${window.location.host}/usuario/listar`,
      success: (usuarios) => {
        this.setState({ usuarios });
      }
    })
  }

  onClickDeleteUsuario = (usuarioID) => {
    var returnConfirm = confirm(`Você realmente deseja apagar o usuario do indice ${usuarioID}?`);
    if (returnConfirm) {
      $.ajax({
        type: "DELETE",
        url: `http://${window.location.host}/usuario/deletar/${usuarioID}`,
        success: (usuarios) => {
          this.fetchUsuarios();
        }
      })
    }
  }

  render() {
    const { usuarios } = this.state;
    return (
      <div className="main-page">
        <div className="tables">
          <h2 className="title1">Lista de usuários</h2>
          <div className="panel-body widget-shadow">
            <h4>Usuários:</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Foto</th>
                  <th>Nome</th>
                  <th>Tipo de usuário</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {
                  usuarios.map(usuario => {
                    return (
                      <tr>
                        <th scope="row">{usuario.ID}</th>
                        <td style={{ height: '70px', width: '70px' }} >
                          <img className="img-responsive" src={`/img/usuarios/${usuario.foto}`} />
                        </td>
                        <td>{usuario.nome_usuario}</td>
                        {usuario.tipo === 1 && <td>{'Administrador'}</td>}
                        <td>
                          <button onClick={() => this.onClickDeleteUsuario(usuario.ID)} >x</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#lista_produtos');
ReactDOM.render(e(ListaProdutos), domContainer);