const CotasModel = require("../model/CotasModel");
const Utils = require("./utils");

exports.insertCotas = function (jsonReceived, callback) {
    Utils.gerarCotaHash(10, callbackhash);

    function callbackhash(hashCotas) {
        jsonReceived.hashCode = hashCotas;
        CotasModel.insertCotas(jsonReceived, callback);
    }
};

exports.getCotaRifa = function (rifaID, callback) {
    CotasModel.getCotaRifa(rifaID, callback);
};

