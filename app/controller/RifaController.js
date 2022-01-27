const RifasModel = require("../model/RifasModel");
const CotasModel = require("../model/CotasModel");
const { salvarFotos } = require("./utils");
const fs = require("fs");
var moment = require("moment");

exports.selecionarTodasRifas = function (callback, limite = false) {
  RifasModel.selecionarTodasRifas(callback, limite);
};

exports.selecionarTodasRifasPaginado = function (page, callback) {
  RifasModel.selecionarTodasRifasPaginado(page, callback);
};

exports.selectPesquisaRifas = function (callback, titulo, page = 1) {
  RifasModel.selectPesquisaRifas(callback, titulo, page);
};

exports.selectRifasUsuarioPaginado = function (callback, usuarioID, page = 1) {
  RifasModel.selectRifasUsuarioPaginado(callback, usuarioID, page);
};

exports.selectRifaStatusPaginado = function (callback, status, page = 1) {
  RifasModel.selectRifaStatusPaginado(callback, status, page);
};

exports.selectRifaCategoriaPaginado = function (callback, status, page = 1) {
  RifasModel.selectRifaCategoriaPaginado(callback, status, page);
};

exports.selectRifasID = function (callback, rifaID) {
  RifasModel.selectRifasID(callback, rifaID);
};

exports.selectUsuarioRifas = function (callback, usuarioID) {
  RifasModel.selectUsuarioRifas(callback, usuarioID);
};

exports.selectRifaCategoria = function (categoriaID, callback) {
  RifasModel.selectRifaCategoria(categoriaID, callback);
};

exports.selectRifaCategoriaPage = function (categoriaID, page, callback) {
  RifasModel.selectRifaCategoriaPage(categoriaID, page, callback);
};

exports.insertRifas = function (params, callback) {
  function callbackController(rifaID) {
    const pathServerImageRifa = `./app/public/img/rifas/${rifaID}`;
    const pathClientImageRifa = `/img/rifas/${rifaID}`;
    const fotos = params.imagem;
    function callbackPath(pathsObject) {
      RifasModel.atualizarImagem(rifaID, String(pathsObject));
      callback(rifaID);
    }
    salvarFotos(fotos, pathServerImageRifa, pathClientImageRifa, callbackPath);
  }
  RifasModel.insertRifas(params, callbackController);
};

exports.atualizarRifa = function (
  titulo_rifa,
  desc_rifa,
  imagem,
  valor,
  tempo_sorteio,
  usuarioID,
  status,
  quant_cotas,
  quant_ganhadores,
  categoria
) {
  RifasModel.atualizarRifa(
    titulo_rifa,
    desc_rifa,
    imagem,
    valor,
    tempo_sorteio,
    usuarioID,
    status,
    quant_cotas,
    quant_ganhadores,
    categoria
  );
};

exports.deleteRifas = async function (rifaID) {
  RifasModel.deleteRifas(rifaID);
};

exports.atualizarStatusRifa = function (obj) {
  if (obj.status == 2) {
    const today = moment().format();
    const drawDate = moment().add(5, "days").format();

    RifasModel.atualizarStatusAceiteRifa(obj.rifa, obj.status, today, drawDate);
    return;
  }

  RifasModel.atualizarStatusRifa(obj.rifa, obj.status);
};

exports.verificacaoSorteioRifas = async function () {
  function callbackVerificacao(rifas) {
    const today = moment().format();
    rifas.map((rifa) => {
      const verification = moment(today).isAfter(rifa.data_sorteio);
      if (verification) {
        CotasModel.getCotaRifa(rifa.ID, callbackCotas);
      }
    });

    function callbackCotas(cotas) {
      if (cotas.length === 0) return;
      const pickOne = cotas[Math.floor(Math.random() * cotas.length)];
      RifasModel.atualizarCotaVencedora(pickOne);
    }
  }

  RifasModel.selectRifasVerificacaoSorteio(callbackVerificacao);
};
