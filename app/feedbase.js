const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database('./db/sample.db');

const insertChinesa =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Alimentos', 'chinesa.png', 1)"
db.run(insertChinesa);

const insertOfertas =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Açougue', 'acougue.png', 1)"
db.run(insertOfertas);

const insertAlcool =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Bebidas', 'alcool.png', 1)"
db.run(insertAlcool);

const insertAsiatica =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Cosmeticos', 'cosmeticos.jpg', 1)"
db.run(insertAsiatica);

const insertBrasileira =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Limpeza', 'limpeza.jpg', 1)"
db.run(insertBrasileira);

const insertCaldos =
  "INSERT INTO categorias (nome_categoria, imagem, status) VALUES ('Hortifruit', 'hortifruit.jpg', 1)"
db.run(insertCaldos);

const INSERIR_ADMIN =
  "INSERT INTO usuarios (email, celular, senha, nome, sobrenome,  cpf,  rg, orgao_emissor, tipo, enderecoID, imagem, tokenLogin, socialID) VALUES ('rafaelffa1@hotmail.com', '9964240543', '$2y$12$ywOtwG1c5zq0g6hnAaJLluGkG7Dv49ptTRTA5NZz2Ccfos4Fu7aei', 'Rafael', 'Almeida', '04372866143', '3051620', 'SSP/DF', 0, 1, '', '','')"
db.run(INSERIR_ADMIN);

db.close();