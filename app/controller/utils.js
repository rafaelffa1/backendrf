const fs = require('fs');

exports.salvarFotos = async function (fotoB64, path, pathClient, callback) {
    let pathsObject = '';
    fs.mkdir(`${path}`, function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("New directory successfully created.");
            fotoB64.forEach(async element => {
                const mimeType = element.mime.split('/');
                let count = 0;
                fs.writeFile(`${path}/${element.name}_${count}.${mimeType[1]}`, element.b64, { encoding: 'base64' }, function (err) {
                    console.log('File created');
                });
                pathsObject += `${pathClient}/${element.name}_${count}.${mimeType[1]}` + ';';
                count++
            });
            callback(pathsObject)
        }
    })
}

exports.atualizarImagem = async function (produtoID, fotoB64, deletar) {
    if (deletar === false) {
        let base64String = fotoB64.b64.toString()
        let base64foto = base64String.split(',');
        var mime = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
        let extension = mime[1].slice(6);

        fs.writeFile(`app/public/img/produtos/${produtoID}produto.${extension}`, base64foto[1], { encoding: 'base64' }, function (err) {
            if (err == null) {
                console.log('File created');
            }
        });

        ProdutosModel.atualizarImagem(produtoID, `produto.${extension}`);

    } else {

        fs.unlink(`app/public${fotoB64.name.toString()}`, function (err) {
            console.log('File deleted');
        });

        ProdutosModel.apagarImagemProduto(produtoID);
    }

}

exports.gerarCotaHash = async function (tamanhoDoHash, callbackhash) {
    var length = tamanhoDoHash;
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    callbackhash(`#${result.toUpperCase()}`)
}