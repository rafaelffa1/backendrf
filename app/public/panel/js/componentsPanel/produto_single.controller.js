'use strict';

const e = React.createElement;

class ProdutoSingle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produto: [],
      produtoimg: [],
      naoTemProduto: false
    }

  }

  componentWillMount = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('produto');

    if (produtoId === null) {
      window.location.href = `http://${window.location.host}/portifolio`
    } else {
      this.fetchProduto(produtoId);
    }
  }

  fetchProduto = (idProduto) => {
    $.ajax({
      type: "GET",
      url: `http://${window.location.host}/produto/unidade/listar/${idProduto}`,
      success: (produto) => {
        if (produto.length === 0) {
          this.setState({ naoTemProduto: true });
        } else {
          let produtoimg = produto[0].imagem.split(',');
          this.setState({ produto, produtoimg });
        }
      }
    })
  }

  produtoAnterior = (id) => {
    window.location.href = `http://${window.location.host}/portifolio-single?produto=${id - 1}`
  }

  produtoSeguinte = (id) => {
    window.location.href = `http://${window.location.host}/portifolio-single?produto=${id + 1}`
  }

  render() {
    const { produto, produtoimg, naoTemProduto } = this.state;
    return (
      <div>
        <section className="page-header page-header-modern bg-color-light-scale-1 page-header-md ">
          <div className="container-fluid">


            {
              naoTemProduto === false ?
                <div className="row align-items-center">
                  <div className="col">
                    <a onClick={() => this.produtoAnterior(produto[0].ID)} style={{ cursor: 'pointer' }} className="portfolio-prev text-decoration-none d-block appear-animation"
                      data-appear-animation="fadeInRightShorter">
                      <div className="d-flex align-items-center line-height-1">
                        <i className="fas fa-arrow-left text-dark text-4 mr-3"></i>
                        <div className="d-none d-sm-block line-height-1">
                          <span className="text-dark opacity-4 text-1">PRODUTO ANTERIOR</span>
                          <h4 className="font-weight-bold text-3 mb-0"></h4>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div className="col">
                    <div className="row">
                      <div className="col-md-12 align-self-center p-static order-2 text-center">
                        <div className="overflow-hidden pb-2">
                          <h1 className="text-dark font-weight-bold text-9 appear-animation" data-appear-animation="maskUp"
                            data-appear-animation-delay="100">{produto.length !== 0 && produto[0].nome_produto}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col">
                    <a onClick={() => this.produtoSeguinte(produto[0].ID)} style={{ cursor: 'pointer' }} className="portfolio-next text-decoration-none d-block float-right appear-animation"
                      data-appear-animation="fadeInLeftShorter">
                      <div className="d-flex align-items-center text-right line-height-1">
                        <div className="d-none d-sm-block line-height-1">
                          <span className="text-dark opacity-4 text-1">PROXIMO PRODUTO</span>
                          <h4 className="font-weight-bold text-3 mb-0"></h4>
                        </div>
                        <i className="fas fa-arrow-right text-dark text-4 ml-3"></i>
                      </div>
                    </a>
                  </div>
                </div>
                :
                <div></div>
            }

          </div>
        </section>

        {
          naoTemProduto === false ?

            <div className="container py-4">

              <div class="row">
                <div class="col" style={{ minHeight: '250px' }}>
                  <div class="row portfolio-list lightbox" data-plugin-options="{'delegate': 'a.lightbox-portfolio', 'type': 'image', 'gallery': {'enabled': true}}">

                    <div class="col-12 col-sm-6 col-lg-6 appear-animation" data-appear-animation="expandIn" data-appear-animation-delay="200">
                      <div class="portfolio-item">
                        <span class="thumb-info thumb-info-lighten thumb-info-centered-icons border-radius-0">
                          <span class="thumb-info-wrapper border-radius-0">
                            <img src={`http://${window.location.host}/img/${produtoimg[0]} `} class="img-fluid border-radius-0" alt="" />
                            <span class="thumb-info-action">
                              <a href={`http://${window.location.host}/img/${produtoimg[0]}`} class="lightbox-portfolio">
                                <span class="thumb-info-action-icon thumb-info-action-icon-light"><i class="fas fa-search text-dark"></i></span>
                              </a>
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>

                    <div class="col-12 col-sm-6 col-lg-6 appear-animation" data-appear-animation="expandIn" data-appear-animation-delay="200">
                      <div class="portfolio-item">
                        <span class="thumb-info thumb-info-lighten thumb-info-centered-icons border-radius-0">
                          <span class="thumb-info-wrapper border-radius-0">
                            <img src={`http://${window.location.host}/img/${produtoimg[1]}`} class="img-fluid border-radius-0" alt="" />
                            <span class="thumb-info-action">
                              <a href={`http://${window.location.host}/img/${produtoimg[1]}`} class="lightbox-portfolio">
                                <span class="thumb-info-action-icon thumb-info-action-icon-light"><i class="fas fa-search text-dark"></i></span>
                              </a>
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>


                  </div>
                </div>
              </div>

              <div className="row pt-4 mt-2 mb-5">
                <div className="col-md-12 mb-4 mb-md-0">

                  <h2 className="text-color-dark font-weight-normal text-5 mb-2">Descrição <strong
                    className="font-weight-extra-bold">Produto</strong></h2>
                  <p>{produto.length !== 0 && produto[0].desc_produto}</p>
                  <hr className="solid my-5" />

                </div>


              </div>
            </div>
            :
            <div><h1>Produto não encontrado</h1></div>
        }


      </div >
    );
  }
}

const domContainer = document.querySelector('#produtosinglee');
ReactDOM.render(e(ProdutoSingle), domContainer);