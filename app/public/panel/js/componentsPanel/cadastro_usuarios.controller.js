'use strict';

const e = React.createElement;
let tempFoto = '';

class CadastroUsuario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeUsuario: '',
      sobrenomeUsuario: '',
      email: '',
      tipoUsuario: 1,
      senha: '',
      confirmeSenha: '',
      foto: []
    };
    tempFoto = this.functionTempFoto;
    this.verificarLogin(localStorage.getItem("token_login_portec"))
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
        if (resp.result !== true) {
          window.location.href = `http://${window.location.host}/panel`
        }
      }
    })
  }

  onChangeNomeUsuario = (nomeUsuario) => {
    this.setState({ nomeUsuario: nomeUsuario.target.value })
  }

  onChangeSobrenomeUsuario = (sobrenomeUsuario) => {
    this.setState({ sobrenomeUsuario: sobrenomeUsuario.target.value })
  }

  onChangeTipoUsuario = (tipoUsuario) => {
    this.setState({ tipoUsuario: tipoUsuario.target.value })
  }

  onChangeEmailUsuario = (email) => {
    this.setState({ email: email.target.value })
  }

  onChangeSenhaUsuario = (senha) => {
    this.setState({ senha: senha.target.value })
  }

  onChangeConfirmeSenhaUsuario = (confirmeSenha) => {
    this.setState({ confirmeSenha: confirmeSenha.target.value })
  }

  functionTempFoto = (foto, idContainerUploadFoto, dadosDoUpload) => {
    let fotoTemp = this.state.foto.slice();
    fotoTemp[idContainerUploadFoto] = {
      name: dadosDoUpload.name,
      b64: foto,
      type: dadosDoUpload.type,
      size: dadosDoUpload.size
    }
    this.setState({ foto: fotoTemp });
  }

  adicionarUploadFoto = (e) => {
    e.preventDefault();
    let adicionandoContainer = [{}, ...this.state.containerUploadFoto];
    this.setState({ containerUploadFoto: adicionandoContainer });
    console.log(this.state.containerUploadFoto);
  }

  onChangeFotosProdutos = async (foto, idContainerUploadFoto) => {
    let fotoBase64 = foto.target.files[0];

    if (fotoBase64.type === "image/png" || fotoBase64.type === "image/jpeg") {
      var reader = new FileReader();
      reader.onload = (function (theFile) {
        return function (e) {
          var binaryData = e.target.result;
          tempFoto(window.btoa(binaryData), idContainerUploadFoto, fotoBase64)
        }
      })(fotoBase64);
      reader.readAsBinaryString(fotoBase64);
    } else {
      alert('Só é permitido arquivos nas extensões .png ou .jpeg')
    }

  }

  onClickSubmit = (e) => {
    e.preventDefault();

    const {
      senha,
      confirmeSenha,
      nomeUsuario,
      tipoUsuario,
      foto,
      sobrenomeUsuario,
      email } = this.state;

    if (
      senha === '' ||
      confirmeSenha === '' ||
      nomeUsuario === '' ||
      sobrenomeUsuario === '' ||
      email === '') {
      alert('Por favor preencha os campos obrigatorios (*)');
    } else {
      if (senha === confirmeSenha) {
        $.ajax({
          type: "POST",
          url: `http://${window.location.host}/usuario/cadastrar`,
          data: {
            nome: nomeUsuario + ' ' + sobrenomeUsuario,
            email: email,
            tipo: tipoUsuario,
            senha: senha,
            foto: foto
          },
          success: () => {
            alert('Adicionado com sucesso');
            window.location.reload();
          }
        })
      } else {
        alert('A senha não está igual a confiração da senha');
      }
    }


  }

  render() {
    const {
      nomeUsuario,
      sobrenomeUsuario,
      email,
      senha,
      confirmeSenha,
      foto
    } = this.state;
    return (
      <div className="form-grids row widget-shadow" data-example-id="basic-forms">
        <div className="form-title">
          <h4>Usuário :</h4>
        </div>
        <div className="form-body">
          <form>
            <div className="form-group"> <label>Nome <span style={{ color: 'red' }}>*</span> </label>
              <input type="text" className="form-control" onChange={(e) => this.onChangeNomeUsuario(e)} value={nomeUsuario} placeholder="Nome" />
            </div>
            <div className="form-group"> <label>Sobrenome <span style={{ color: 'red' }}>*</span></label>
              <input type="text" className="form-control" onChange={(e) => this.onChangeSobrenomeUsuario(e)} value={sobrenomeUsuario} placeholder="Sobrenome" />
            </div>
            <div className="form-group"> <label>Email <span style={{ color: 'red' }}>*</span></label>
              <input type="email" className="form-control" onChange={(e) => this.onChangeEmailUsuario(e)} value={email} placeholder="email" />
            </div>
            <div className="form-group">
              <label>Tipo de usuário</label>
              <select defaultValue='1' onChange={(e) => this.onChangeTipoUsuario(e)} className="form-control">
                <option value="1">Administrador</option>
              </select>
            </div>
            <div className="form-group"> <label>Senha <span style={{ color: 'red' }}>*</span></label>
              <input type="password" className="form-control" onChange={(e) => this.onChangeSenhaUsuario(e)} value={senha} placeholder="Senha" />
            </div>
            <div className="form-group"> <label>Confirme a senha <span style={{ color: 'red' }}>*</span></label>
              <input type="password" className="form-control" onChange={(e) => this.onChangeConfirmeSenhaUsuario(e)} value={confirmeSenha} placeholder="Confirme a senha" />
            </div>
            <div className="form-group">
              <label>Fotos do usuário</label>
              <div className="form-group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => this.onChangeFotosProdutos(e, 0)}
                />
                {
                  foto[0] !== undefined &&
                  <div style={{ width: 350 }}>
                    <img className="img-responsive" src={`data:${foto[0].type};base64,${foto[0].b64}`} />
                  </div>
                }
              </div>
            </div>
            <button type="submit" onClick={(e) => this.onClickSubmit(e)} className="btn btn-default">Cadastrar</button>
          </form>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#cadastro_usuarios');
ReactDOM.render(e(CadastroUsuario), domContainer);