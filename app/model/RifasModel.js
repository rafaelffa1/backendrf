const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
const util = require('util')
var moment = require('moment');

// Table rifas
// ID INTEGER PRIMARY KEY AUTOINCREMENT,
// titulo_rifa varchar(255),
// desc_rifa varchar(255),
// imagem varchar(255),
// valor REAL,
// tempo_sorteio,
// usuarioID INTEGER,
// status INTEGER,
// quant_cotas INTEGER
// quant_ganhadores INTEGER,
// categoria INTEGER, 

let db = new sqlite3.Database(dbPath);

function calculatePagination() {

}

exports.insertRifas = function (params, callback) {
    db.run(
        `INSERT INTO rifas (
            titulo_rifa,
            desc_rifa,
            imagem,
            valor, 
            tempo_sorteio,
            usuarioID, 
            status,
            quant_cotas,
            quant_ganhadores, 
            categoria, 
            data_criacao,
            data_aceite,
            data_sorteio) 
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [params.titulo_rifa,
        params.desc_rifa,
            "",
        params.valor,
        params.tempo_sorteio,
        params.usuarioID,
            1,
        params.quant_cotas,
        params.quant_ganhadores,
        params.categoria,
        moment().format('MMMM Do YYYY, h:mm:ss a')],
        null,
        null,
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            callback(this.lastID);
        }
    );
};

exports.selecionarTodasRifas = function (callback, limite) {
    db.serialize(function () {
        if (limite) {
            db.all("SELECT * FROM rifas LIMIT 10 where status == 1", function (err, allRows) {
                if (err != null) {
                    console.log(err);
                }
                callback(allRows);
            });
        } else {
            db.all("SELECT * FROM rifas where status == 1", function (err, allRows) {
                if (err != null) {
                    console.log(err);
                }
                callback(allRows);
            });
        }
    });
}

exports.selecionarTodasRifasPaginado = function (page, callback) {

    let min = 0;
    let max = 0;

    if (page === 1) {
        min = 0;
        max = page * 10;
    } else {
        min = (page - 1) * 10;
        max = page * 10;
    }

    db.serialize(function () {
        db.all(`SELECT  
            rifas.ID,
            rifas.titulo_rifa,
            rifas.desc_rifa,
            rifas.imagem,
            rifas.valor,
            rifas.tempo_sorteio,
            rifas.data_criacao,
            rifas.status,
            rifas.quant_cotas,
            rifas.quant_ganhadores,
            usuarios.ID as usuarioID,
            usuarios.nome,
            usuarios.sobrenome,
            usuarios.imagem as usuario_imagem,
            usuarios.email,
            usuarios.socialID,
            categorias.nome_categoria,
            categorias.imagem as categoria_imagem,
            categorias.ID as categoriaID
        FROM rifas
        INNER JOIN usuarios ON rifas.usuarioID = usuarios.ID
        INNER JOIN categorias ON rifas.categoria = categorias.ID LIMIT ${min}, ${max}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectPesquisaRifas = function (callback, titulo, page) {

    let min = 0;
    let max = 0;

    if (page === 1) {
        min = 0;
        max = page * 10;
    } else {
        min = (page - 1) * 10;
        max = page * 10;
    }

    db.serialize(function () {
        db.all(`SELECT  
            rifas.ID,
            rifas.titulo_rifa,
            rifas.desc_rifa,
            rifas.imagem,
            rifas.valor,
            rifas.tempo_sorteio,
            rifas.data_criacao,
            usuarios.ID as usuarioID,
            usuarios.nome,
            usuarios.sobrenome,
            usuarios.imagem,
            usuarios.email,
            usuarios.socialID,
            categorias.nome_categoria,
            categorias.imagem,
            categorias.ID as categoriaID
        FROM rifas
        INNER JOIN usuarios ON rifas.usuarioID = usuarios.ID
        INNER JOIN categorias ON rifas.categoria = categorias.ID WHERE titulo_rifa LIKE '%${titulo}%' LIMIT ${min}, ${max}`,
            function (err, allRows) {
                if (err != null) {
                    console.log(err);
                }
                callback(allRows);
            });
    });
}

exports.selectRifasUsuarioPaginado = function (callback, usuarioID, page) {

    let min = 0;
    let max = 0;

    if (page === 1) {
        min = 0;
        max = page * 10;
    } else {
        min = (page - 1) * 10;
        max = page * 10;
    }

    db.serialize(function () {
        db.all(`SELECT  
            rifas.ID,
            rifas.titulo_rifa,
            rifas.desc_rifa,
            rifas.imagem,
            rifas.valor,
            rifas.tempo_sorteio,
            rifas.data_criacao,
            usuarios.ID as usuarioID,
            usuarios.nome,
            usuarios.sobrenome,
            usuarios.email,
            usuarios.socialID,
            categorias.nome_categoria,
            categorias.imagem as categoriaImagem,
            categorias.ID as categoriaID
        FROM rifas
        INNER JOIN usuarios ON rifas.usuarioID = usuarios.ID
        INNER JOIN categorias ON rifas.categoria = categorias.ID WHERE usuarios.ID == ${usuarioID} LIMIT ${min}, ${max}`,
            function (err, allRows) {
                if (err != null) {
                    console.log(err);
                }
                callback(allRows);
            });
    });
}

exports.selectRifaStatusPaginado = function (callback, status, page) {

    let min = 0;
    let max = 0;

    if (page === 1) {
        min = 0;
        max = page * 10;
    } else {
        min = (page - 1) * 10;
        max = page * 10;
    }

    db.serialize(function () {
        db.all(`SELECT  
            rifas.ID,
            rifas.titulo_rifa,
            rifas.desc_rifa,
            rifas.imagem,
            rifas.valor,
            rifas.tempo_sorteio,
            rifas.data_criacao,
            rifas.status,
            rifas.quant_cotas,
            rifas.quant_ganhadores,
            usuarios.ID as usuarioID,
            usuarios.nome,
            usuarios.sobrenome,
            usuarios.email,
            usuarios.socialID,
            categorias.nome_categoria,
            categorias.imagem as categoriaImagem,
            categorias.ID as categoriaID
        FROM rifas
        INNER JOIN usuarios ON rifas.usuarioID = usuarios.ID
        INNER JOIN categorias ON rifas.categoria = categorias.ID WHERE rifas.status == ${status} LIMIT ${min}, ${max}`,
            function (err, allRows) {
                if (err != null) {
                    console.log(err);
                }
                callback(allRows);
            });
    });
}

exports.selectRifaCategoriaPaginado = function (callback, categoria, page) {

    let min = 0;
    let max = 0;

    if (page === 1) {
        min = 0;
        max = page * 10;
    } else {
        min = (page - 1) * 10;
        max = page * 10;
    }

    db.serialize(function () {
        db.all(`SELECT  
            rifas.ID,
            rifas.titulo_rifa,
            rifas.desc_rifa,
            rifas.imagem,
            rifas.valor,
            rifas.tempo_sorteio,
            rifas.data_criacao,
            usuarios.ID as usuarioID,
            usuarios.nome,
            usuarios.sobrenome,
            usuarios.email,
            usuarios.socialID,
            categorias.nome_categoria,
            categorias.imagem as categoriaImagem,
            categorias.ID as categoriaID
        FROM rifas
        INNER JOIN usuarios ON rifas.usuarioID = usuarios.ID
        INNER JOIN categorias ON rifas.categoria = categorias.ID WHERE rifas.categoria == ${categoria} LIMIT ${min}, ${max}`,
            function (err, allRows) {
                if (err != null) {
                    console.log(err);
                }
                callback(allRows);
            });
    });
}

exports.selectRifasID = function (callback, rifaID) {
    db.serialize(function () {
        db.all(`SELECT * FROM rifas WHERE ID == ${rifaID}`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectUsuarioRifas = function (callback, usuarioID) {
    db.serialize(function () {
        db.all(`SELECT * FROM rifas WHERE usuarioID == ${usuarioID} AND status != 0`, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectRifaDoUsuario = function (callback, params) {
    db.serialize(function () {
        db.all(`SELECT * FROM rifas WHERE usuarioID == ${params.usuarioID} AND ID == ${params.rifaID} `, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.selectRifaCategoria = function (categoriaID, callback) {
    db.serialize(function () {
        db.all(`SELECT * FROM rifas WHERE categoria == ${categoriaID} `, function (err, allRows) {
            if (err != null) {
                console.log(err);
            }
            callback(allRows);
        });
    });
}

exports.deleteRifas = function (rifaID) {
    db.run(`UPDATE rifas SET status = 0 WHERE ID == ${rifaID}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}

//TODO
exports.atualizarImagem = function (rifaID, pathsObject) {
    db.run(`UPDATE rifas SET imagem = '${pathsObject}' WHERE ID == ${rifaID}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}

exports.atualizarRifa = function (titulo_rifa,
    desc_rifa,
    imagem,
    valor,
    tempo_sorteio,
    quant_cotas,
    quant_ganhadores) {
    db.run(`UPDATE rifas SET titulo_rifa = "${titulo_rifa}", desc_rifa = ${desc_rifa}, imagem = "${imagem}", valor = ${valor}, tempo_sorteio = ${tempo_sorteio}, quant_cotas = ${quant_cotas}, quant_ganhadores = ${quant_ganhadores} WHERE ID == ${produtoID}`, function (err) {
        if (err != null) {
            console.log(err);
        }
    });
}

exports.atualizarStatusRifa = function (rifaID, codigoStatus) {
    db.run(`UPDATE rifas SET status = ${codigoStatus} WHERE ID == ${rifaID}`, function (err) {
        if (err != null) {
            console.log(err);
        }
        console.log('Status atualizado');
    });
}


