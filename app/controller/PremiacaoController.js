const PremiacaoModel = require("../model/PremiacaoModel");
const Utils = require("./utils");

exports.insertPremiacao = function (params, rifaID) {
    params.forEach(element => {
        element.rifaID = rifaID;
        PremiacaoModel.insertPremiacao(element);
    });
};

exports.selectPremiacao = function (rifaID, callback) {
    PremiacaoModel.selectPremiacao(rifaID, callback);
};