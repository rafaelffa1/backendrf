const EnderecosModel = require("../model/EnderecosModel");
const fs = require('fs');

exports.selectAllEnderecos = function (callback) {
  EnderecosModel.selectAllEnderecos(callback);
};

exports.selectIdEndereco = function (callback, produtoId) {
  EnderecosModel.selectIdEnderecos(callback, produtoId);
};

exports.insertEndereco = function (data, callback) {
  EnderecosModel.insertEnderecos(data, callback)
}

exports.atualizarEndereco = function (data) {
  EnderecosModel.atualizarEndereco(data)
}

exports.deleteEndereco = async function (idProduto) {
  EnderecosModel.deleteEnderecos(idProduto);
}