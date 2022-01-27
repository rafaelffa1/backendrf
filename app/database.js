const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database("./db/sample.db");

const TABELA_CATEGORIAS =
  "CREATE TABLE categorias (ID INTEGER PRIMARY KEY AUTOINCREMENT, nome_categoria varchar(255), imagem VARCHAR(255), status NUMBER)";
db.run(TABELA_CATEGORIAS);

const TABELA_RIFAS =
  "CREATE TABLE rifas (ID INTEGER PRIMARY KEY AUTOINCREMENT,titulo_rifa varchar(255), desc_rifa varchar(255), imagem varchar(255), valor REAL, tempo_sorteio varchar(255), usuarioID INTEGER, status INTEGER, quant_cotas INTEGER, quant_ganhadores INTEGER, categoria INTEGER, data_criacao varchar(255), data_aceite varchar(255), data_sorteio varchar(255))";
db.run(TABELA_RIFAS);

const TABELA_ENDERECOS =
  "CREATE TABLE enderecos (ID INTEGER PRIMARY KEY AUTOINCREMENT, cep varchar(255), estado varchar(255), cidade varchar(255), bairro varchar(255), endereco varchar(255), numero varchar(255), lat varchar(255), long varchar(255), usuarioID INTEGER) ";
db.run(TABELA_ENDERECOS);

const TABELA_USUARIOS =
  "CREATE TABLE usuarios (ID INTEGER PRIMARY KEY AUTOINCREMENT, email varchar(255), celular varchar(255), senha varchar(255), nome varchar(255), sobrenome varchar(255),  cpf INT,  rg varchar(255), orgao_emissor varchar(255), tipo INT, enderecoID INTEGER, imagem varchar(255), tokenLogin varchar(255), socialID varchar(255), tokenDevice varchar(255), ficha REAL)";
db.run(TABELA_USUARIOS);

const TABELA_COTAS =
  "CREATE TABLE cotas (ID INTEGER PRIMARY KEY AUTOINCREMENT, rifaID NUMBER, usuario_vendedor number, usuario_comprador number, cotaHash varchar(255), data_criacao varchar(255))";
db.run(TABELA_COTAS);

// - tipo daPremiacao => 1 - envio, 2 - resgate
// - status => 1 - Ativa, 0 - inativa
const TABELA_PREMIACAO =
  "CREATE TABLE premiacoes (ID INTEGER PRIMARY KEY AUTOINCREMENT, rifaID NUMBER, titulo varchar(255), descricao varchar(255), usuarioGanhador NUMBER, usuarioCriador NUMBER, posicaoUsuarioGanhador NUMBER, enderecoID NUMBER, tipo NUMBER, status NUMBER, data_criacao varchar(255))";
db.run(TABELA_PREMIACAO);

db.close();
