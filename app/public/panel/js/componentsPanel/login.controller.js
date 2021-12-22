'use strict';

const e = React.createElement;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: ''
    }
    this.verificarLogin(localStorage.getItem("token_login_portec"))
  }

  verificarLogin = (token) => {
    $.ajax({
      type: "POST",
      url: `http://${window.location.host}/verificar_login`,
      data: { token },
      success: (resp) => {
        if (resp.result === true) {
          window.location.href = `http://${window.location.host}/panel/cadastro_produtos?token=${token}`
        }
      }
    })
  }

  onChangeEmail = (email) => {
    this.setState({ email: email.target.value })
  }

  onChangeSenha = (senha) => {
    this.setState({ senha: senha.target.value })
  }

  onCLickLogin = (e) => {
    const { email, senha } = this.state;
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: `http://${window.location.host}/panel/login`,
      data: {
        email: email,
        senha: senha
      },
      success: (resp) => {
        if (resp.result === false) {
          alert('Email ou senha incorreto');
        } else {
          let objectConvertB64 = '154stj%' + window.btoa(JSON.stringify({ id: resp.usuario.ID, nome: resp.usuario.nome_usuario, foto: resp.usuario.foto }));
          localStorage.setItem("token_login_portec", resp.result);
          localStorage.setItem("user_portec", window.btoa(objectConvertB64));
          window.location.href = `http://${window.location.host}/panel/cadastro_produtos?token=${resp.result}`
        }
      }
    })
  }

  render() {
    const { email, senha } = this.state;
    return (
      <div className="sub-main-w3">
        <div className="wthree-pro">
          <h2>Login</h2>
        </div>
        <form action="#" method="post">
          <div className="pom-agile">
            <input placeholder="E-mail" value={email} onChange={(e) => this.onChangeEmail(e)} name="Name" className="user" type="email" required="" />
            <span className="icon1"><i className="fa fa-user" aria-hidden="true"></i></span>
          </div>
          <div className="pom-agile">
            <input placeholder="Password" value={senha} onChange={(e) => this.onChangeSenha(e)} name="Password" className="pass" type="password" required="" />
            <span className="icon2"><i className="fa fa-unlock" aria-hidden="true"></i></span>
          </div>
          <div className="sub-w3l">
            <div className="right-w3l">
              <input type="submit" onClick={(e) => this.onCLickLogin(e)} value="Login" />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const domContainer = document.querySelector('#login_form');
ReactDOM.render(e(Login), domContainer);