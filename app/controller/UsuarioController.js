const UsuariosModel = require("../model/UsuariosModel");
const fs = require('fs');
const bcrypt = require('bcryptjs');

exports.selectAllUsuarios = function (callback) {
  UsuariosModel.selectAllUsuarios(callback);
};

exports.selectIdUsuario = function (callback, usuarioID) {
  UsuariosModel.selectIdUsuario(callback, usuarioID);
};

exports.selectUsuarioAdmin = function (callback, usuarioID) {
  UsuariosModel.selectUsuarioAdmin(callback, usuarioID);
};

exports.insertUsuarios = async function (data, senha, tipo, enderecoID, nomeFotoUsuario) {
  return await UsuariosModel.insertUsuarios(data, senha, tipo, enderecoID, nomeFotoUsuario);
}

exports.insertUsuariosMobile = async function (data, callback) {

  function callbackModel(usuarioID) {
    UsuariosModel.selectIdUsuario(callback, usuarioID);
  }

  const saltRounds = 12;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(String(data.senha), salt, function (err, hash) {
      data.senhaB = hash;
      if (data.foto === undefined) {
        data.foto = null
      }
      if (data.socialID === undefined) {
        data.socialID = null
      }
      UsuariosModel.insertUsuariosMobile(data, callbackModel);
    });
  });
}

exports.salvarFotos = async function (fotos) {
  fs.writeFile(`app/public/img/usuarios/${fotos[0].name}`, fotos[0].b64, { encoding: 'base64' }, function (err) {
    console.log(err);
    console.log('File created');
  });
}

exports.deleteUsuarios = async function (idProduto) {
  UsuariosModel.deleteUsuarios(idProduto);
}

exports.atualizarUsuario = function (data) {
  UsuariosModel.atualizarUsuario(data);
};

exports.loginUsuario = async function (email, senha, callback) {

  function usuarioCallback(row) {
    if (row !== undefined) {
      if (row.senha === '') {
        callback(3);
      } else {
        bcrypt.compare(senha, row.senha, function (err, result) {
          if (result) {
            callback(1, row.ID);
          } else {
            callback(2);
          }
        });
      }
    } else {
      callback(2);
    }
  }

  UsuariosModel.loginUsuario(email, usuarioCallback);

}

exports.loginUsuarioMobile = async function (celular, senha, callback) {

  function usuarioCallback(row) {
    if (row !== undefined) {
      bcrypt.compare(senha, row.senha, function (err, result) {
        if (result === true) {
          callback(result, row);
        } else {
          callback(result, []);
        }
      });
    } else {
      callback(false, [])
    }
  }

  UsuariosModel.loginUsuarioMobile(celular, usuarioCallback);
}

exports.validarUsuarioCelular = async function (celular, callback) {
  UsuariosModel.validarUsuarioCelular(celular, callback);
}

exports.validarUsuarioEmail = async function (email, callback) {
  UsuariosModel.validarUsuarioEmail(email, callback);
}

exports.validarUsuarioSocialID = async function (socialID, callback) {
  UsuariosModel.validarUsuarioSocialID(socialID, callback);
}

exports.atualizarUsuarioMobile = async function (usuarioObj) {
  UsuariosModel.atualizarUsuarioMobile(usuarioObj);
}

exports.verificarLogin = async function (token, callback) {

  function callbackVerificarLogin(row) {
    if (row === undefined) {
      callback({ "status": false })
    } else {
      callback({ "status": true, "usuario": row })
    }
  }

  UsuariosModel.verificarLogin(token, callbackVerificarLogin)
}

exports.gerarsenha = async function (email, senha, callback) {

  function callbackLogin(row) {
    if (row !== undefined) {
      const saltRounds = 12;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(String(senha), salt, function (err, hash) {
          UsuariosModel.salvarSenha(hash, row.ID);
          callback(1)
        });
      });
    }
  }

  UsuariosModel.loginUsuario(email, callbackLogin);
}

exports.gerarTokenLogin = async function (usuarioID, callback) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 50; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  let tokenFinal = 'rabbit1597' + result + 'djoqp23&F3r7rs';
  UsuariosModel.salvarTokenLogin(usuarioID, tokenFinal);
  callback(tokenFinal);
}

exports.redefinirSenha = async function (email, callback) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  let senha = 'mineiro_' + result;
  const saltRounds = 12;

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(String(senha), salt, function (err, hash) {
      UsuariosModel.atualizarUsuarioSenha(email, hash);
      callback(email, senha);
    });
  });

  console.log(`NOVA SENHA ${senha}`)
}