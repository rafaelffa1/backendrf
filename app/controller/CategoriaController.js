
const CategoriaModel = require("../model/CategoriaModel");
const fs = require('fs');

exports.selectAllCategorias = function (callback) {
  CategoriaModel.selectAllCategorias(callback);
};
