'use strict';

const e = React.createElement;
let tempFoto = '';

class CadastroProduto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nomeProduto: '',
      descProduto: '',
      categoriaProduto: '',
      fotoProduto: [],
      containerUploadFoto: [{}]
    };
    tempFoto = this.functionTempFoto;
    this.countContainer = 1;
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

  onChangeNomeProduto = (nomeProduto) => {
    this.setState({ nomeProduto: nomeProduto.target.value })
  }

  onChangeCategoriaProduto = (categoriaProduto) => {
    this.setState({ categoriaProduto: categoriaProduto.target.value })
  }

  onChangeDescricaoProduto = (descProduto) => {
    this.setState({ descProduto: descProduto.target.value })
  }

  functionTempFoto = (fotoProduto, idContainerUploadFoto, dadosDoUpload) => {
    let foto = this.state.fotoProduto.slice();
    foto[idContainerUploadFoto] = {
      name: dadosDoUpload.name,
      b64: fotoProduto,
      type: dadosDoUpload.type,
      size: dadosDoUpload.size
    }
    this.setState({ fotoProduto: foto });
  }

  adicionarUploadFoto = (e) => {
    e.preventDefault();
    let adicionandoContainer = [{}, ...this.state.containerUploadFoto];
    this.setState({ containerUploadFoto: adicionandoContainer });
    console.log(this.state.containerUploadFoto);
  }

  onChangeFotosProdutos = async (fotoProduto, idContainerUploadFoto) => {
    let fotoBase64 = fotoProduto.target.files[0];

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
    const { fotoProduto, nomeProduto, descProduto, categoriaProduto } = this.state;
    $.ajax({
      type: "POST",
      url: `http://${window.location.host}/produto/cadastrar`,
      data: {
        nome: nomeProduto,
        descricao: descProduto,
        fotos: fotoProduto,
        categoria: categoriaProduto
      },
      success: () => {
        alert('Adicionado com sucesso');
        window.location.reload();
      }
    })
  }

  render() {
    const { nomeProduto, descProduto, fotoProduto, containerUploadFoto } = this.state;
    return (
      <div className="form-grids row widget-shadow" data-example-id="basic-forms">
        <div className="form-title">
          <h4>Produtos :</h4>
        </div>
        <div className="form-body">
          <form>
            <div className="form-group"> <label>Nome do produto</label>
              <input type="text" className="form-control" onChange={(e) => this.onChangeNomeProduto(e)} value={nomeProduto} placeholder="Nome do produto" />
            </div>
            <div className="form-group">
              <label>Categoria</label>
              <input type="text" className="form-control" onChange={(e) => this.onChangeCategoriaProduto(e)} placeholder="Categoria" />
            </div>
            <div className="form-group">
              <label>Descrição do produto</label>
              <textarea className="form-control" rows="4" cols="50" value={descProduto} onChange={(e) => this.onChangeDescricaoProduto(e)}></textarea>
            </div>
            <div className="form-group">
              <label>Fotos dos Produtos</label>
              {
                containerUploadFoto.map((container, index) => {
                  return (
                    <div className="form-group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => this.onChangeFotosProdutos(e, index)}
                      />
                      {
                        fotoProduto[index] !== undefined &&
                        <div style={{ width: 350 }}>
                          <img className="img-responsive" src={`data:${fotoProduto[index].type};base64,${fotoProduto[index].b64}`} />
                        </div>
                      }
                    </div>
                  )
                })
              }
              <button onClick={(e) => this.adicionarUploadFoto(e)}>+</button>
            </div>

            <button type="submit" onClick={(e) => this.onClickSubmit(e)} className="btn btn-default">Enviar</button>
          </form>
        </div>
      </div>
    );
  }
}

const domContainer = document.querySelector('#cadastro_produtos');
ReactDOM.render(e(CadastroProduto), domContainer);