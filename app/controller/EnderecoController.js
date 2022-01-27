const EnderecosModel = require("../model/EnderecosModel");
const UsuariosModel = require("../model/UsuariosModel");
const fs = require("fs");

exports.selectAllEnderecos = function (callback) {
  EnderecosModel.selectAllEnderecos(callback);
};

exports.selectIdEndereco = function (callback, produtoId) {
  EnderecosModel.selectIdEnderecos(callback, produtoId);
};

exports.insertEndereco = function (data, callback) {
  EnderecosModel.insertEnderecos(data, callback);
};

exports.atualizarEndereco = function (data) {
  EnderecosModel.atualizarEndereco(data);
};

exports.deleteEndereco = async function (idProduto) {
  EnderecosModel.deleteEnderecos(idProduto);
};

exports.insertEnderecoUsuarios = async function (params) {
  function callbackInsert(enderecoID) {
    UsuariosModel.atualizarEnderecoUsuario(enderecoID, params.usuarioID);
  }
  EnderecosModel.insertEnderecos(params, callbackInsert);
};
