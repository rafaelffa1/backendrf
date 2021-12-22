'use strict';

const e = React.createElement;

class ListaProdutos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produtos: []
    }
    this.verificarLogin(localStorage.getItem("token_login_portec"))
  }

  componentDidMount = () => {
    this.fetchProdutos();
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

  fetchProdutos = () => {
    $.ajax({
      type: "GET",
      url: `http://${window.location.host}/produto/listar`,
      success: (produtos) => {
        this.setState({ produtos });
      }
    })
  }

  onClickDelteProduto = (produtoID) => {
    var returnConfirm = confirm(`Você realmente deseja apagar o produto do indice ${produtoID}?`);
    if (returnConfirm) {
      $.ajax({
        type: "DELETE",
        url: `http://${window.location.host}/produto/deletar/${produtoID}`,
        success: (produtos) => {
          this.fetchProdutos();
        }
      })
    }
  }

  render() {
    const { produtos } = this.state;
    return (
      <div className="main-page">
        <div className="tables">
          <h2 className="title1">Lista de produtos</h2>
          <div className="panel-body widget-shadow">
            <h4>Produtos:</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Categoria</th>
                  <th>Descrição</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {
                  produtos.map(produto => {
                    return (
                      <tr>
                        <th scope="row">{produto.ID}</th>
                        <td>{produto.nome_produto}</td>
                        <td>{produto.categoria}</td>
                        <td style={{ maxWidth: '100px', maxHeight: '100px', overflow: 'scroll' }}>
                          {produto.desc_produto}
                        </td>
                        <td>
                          <button onClick={() => this.onClickDelteProduto(produto.ID)} >x</button>
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