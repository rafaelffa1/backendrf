const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const dbPath = path.resolve(__dirname, "../db/sample.db");
let db = new sqlite3.Database(dbPath);

//  ID INTEGER PRIMARY KEY AUTOINCREMENT,
//  email varchar(255),
//  celular varchar(255),
//  senha varchar(255),
//  nome varchar(255),
//  sobrenome varchar(255),
//  cpf INT,
//  rg varchar(255),
//  orgao_emissor varchar(255),
//  tipo INT,
//  enderecoID INTEGER
//  imagem varchar(255)

// Desmembrar usuario do painel do usuario do app;
exports.insertUsuarios = function (data, senha, tipo, enderecoID, imagem) {
  db.run(
    `INSERT INTO usuarios (email, celular, senha, nome, sobrenome, cpf, rg, orgao_emissor, tipo, enderecoID, imagem, tokenLogin, socialID) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.email,
      data.celular,
      senha,
      data.nome,
      data.sobrenome,
      data.cpf,
      data.rg,
      data.orgao_emissor,
      tipo,
      enderecoID,
      imagem,
      null,
      null,
      null,
    ],
    function (err) {
      if (err) {
        return console.log(err.message);
      } else {
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        // return this.lastID
      }
    }
  );
};

exports.insertUsuariosMobile = function (data, callback) {
  db.run(
    `INSERT INTO usuarios (email, celular, senha, nome, sobrenome, cpf, rg, orgao_emissor, tipo, enderecoID, imagem, tokenLogin, socialID, tokenDevice) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      data.email,
      data.celular,
      data.senhaB,
      data.nome,
      null,
      null,
      null,
      null,
      4,
      null,
      data.foto,
      null,
      data.socialID,
      data.tokenDevice,
    ],
    function (err) {
      if (err) {
        return console.log(err.message);
      } else {
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        callback(this.lastID);
      }
    }
  );
};

exports.selectAllUsuarios = function (callback) {
  db.serialize(function () {
    db.all("SELECT * FROM usuarios", function (err, allRows) {
      if (err != null) {
        console.log(err);
      }
      callback(allRows);
    });
  });
};

exports.selectIdUsuario = function (callback, usuarioID) {
  db.serialize(function () {
    db.all(
      `SELECT * FROM usuarios WHERE ID == ${usuarioID}`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      }
    );
  });
};

exports.deleteUsuarios = function (idProduto) {
  db.run(`DELETE FROM usuarios WHERE ID == ${idProduto}`, function (err) {
    if (err != null) {
      console.log(err);
    }
  });
};

exports.logoffUsuario = function (usuario) {
  db.run(
    `UPDATE usuarios SET acesso = 0 WHERE ID == ${usuario.ID}`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};

exports.loginUsuario = function (email, callback) {
  db.serialize(function () {
    db.all(
      `SELECT * FROM usuarios WHERE email == '${email}'`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows[0]);
      }
    );
  });
};

exports.loginUsuarioMobile = function (celular, callback) {
  db.serialize(function () {
    db.all(
      `SELECT * FROM usuarios WHERE celular == '${celular}'`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows[0]);
      }
    );
  });
};

exports.salvarTokenLogin = function (usuarioID, token) {
  db.run(
    `UPDATE usuarios SET tokenLogin = '${token}' WHERE ID == ${usuarioID}`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};

exports.salvarSenha = function (senha, usuarioID) {
  db.run(
    `UPDATE usuarios SET senha = '${senha}' WHERE ID == ${usuarioID}`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};

exports.verificarLogin = function (token, callback) {
  db.serialize(function () {
    db.all(
      `SELECT email, nome, sobrenome, enderecoID, imagem, restauranteID FROM usuarios WHERE tokenLogin == '${token}'`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows[0]);
      }
    );
  });
};

exports.validarUsuarioCelular = function (celular, callback) {
  db.serialize(function () {
    db.all(
      `SELECT ID, email, nome, celular FROM usuarios WHERE celular == '${celular}' AND tipo == 4`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows[0]);
      }
    );
  });
};

exports.validarUsuarioEmail = function (email, callback) {
  db.serialize(function () {
    db.all(
      `SELECT ID, email, nome, celular FROM usuarios WHERE email == '${email}' AND tipo == 4`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows[0]);
      }
    );
  });
};

exports.validarUsuarioSocialID = function (socialID, callback) {
  db.serialize(function () {
    db.all(
      `SELECT ID, email, nome, celular, imagem FROM usuarios WHERE socialID == '${socialID}' AND tipo == 4`,
      function (err, allRows) {
        if (err != null) {
          console.log(err);
        }
        callback(allRows);
      }
    );
  });
};

exports.selectUsuarioAdmin = function (callback, token) {
  db.serialize(function () {
    db.all(
      `SELECT ID, email, nome, sobrenome, imagem, tipo FROM usuarios WHERE usuarios.tokenLogin = '${token}'`,
      function (err, allRows) {
        if (allRows.length === 0) {
          callback({ status: false, row: null });
        } else {
          callback({ status: true, row: allRows[0] });
        }
      }
    );
  });
};

exports.atualizarUsuario = function (data) {
  db.run(
    `UPDATE usuarios SET
    email = '${data.email}',
    celular = '${data.celular}',
    nome = '${data.nome}',
    sobrenome = '${data.sobrenome}',
    cpf = '${data.cpf}',
    rg = '${data.rg}',
    orgao_emissor = '${data.orgao_emissor}'
    WHERE ID == ${data.usuarioID}`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};

exports.atualizarUsuarioMobile = function (data) {
  db.run(
    `UPDATE usuarios SET
    email = '${data.email}',
    nome = '${data.nome}'
    WHERE ID == ${data.usuarioID}`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};

exports.atualizarUsuarioSenha = function (email, senha) {
  db.run(
    `UPDATE usuarios SET
    senha = '${senha}'
    WHERE email == '${email}'`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};

exports.atualizarEnderecoUsuario = function (enderecoID, usuarioID) {
  db.run(
    `UPDATE usuarios SET
    enderecoID = '${enderecoID}'
    WHERE ID == '${usuarioID}'`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};

exports.updateFichaUsuario = function (ficha, usuarioID) {
  db.run(
    `UPDATE usuarios SET
    ficha = ${ficha}
    WHERE ID == ${usuarioID}`,
    function (err) {
      if (err != null) {
        console.log(err);
      }
    }
  );
};

exports.selectFichaUsuario = function (usuarioID, callback) {
  db.serialize(function () {
    db.all(
      `SELECT ficha FROM usuarios WHERE usuarios.ID = '${usuarioID}'`,
      function (err, allRows) {
        if (allRows.length === 0) {
          callback({ status: false, row: null });
        } else {
          callback(allRows[0]);
        }
      }
    );
  });
};
