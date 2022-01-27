const express = require("express");
const router = express.Router();
const path = require("path");
const CategoriaController = require("./controller/CategoriaController");
const RifaController = require("./controller/RifaController");
const CotasController = require("./controller/CotasController");
const UsuarioController = require("./controller/UsuarioController");
const EnderecoController = require("./controller/EnderecoController");
const PremiacaoController = require("./controller/PremiacaoController");
const PagSeguro = require("node-pagseguro");
const request = require("request");
const xmlParser = require("xml2json");

const TextMessageService = require("comtele-sdk").TextMessageService;
const {
  findConnections,
  findConnectionsRestaurant,
  sendMessage,
} = require("./websocket");
const admin = require("firebase-admin");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const http = require("http");

app.use((req, res, next) => {
  //Cria um middleware onde todas as requests passam por ele
  if ((req.headers["x-forwarded-proto"] || "").endsWith("http"))
    //Checa se o protocolo informado nos headers é HTTP
    res.redirect(`https://${req.headers.host}${req.url}`);
  //Redireciona pra HTTPS
  //Se a requisição já é HTTPS
  else next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});

router.use(
  "/",
  express.static(path.join(__dirname + "/public")),
  function (req, res, next) {
    next();
  }
);

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function* (next) {
  //Evitando CORS
  this.set("Access-Control-Allow-Origin", this.request.header.origin || "*");
  this.set(
    "Access-Control-Allow-Headers",
    this.request.header["access-control-request-headers"] || "*"
  );
  this.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  this.set("Access-Control-Allow-Credentials", "true");
  this.set("Allow", "POST, GET, OPTIONS, PUT, DELETE");
  this.set("Server", "ApiServer");
  if (this.method === "OPTIONS") {
    this.body = "";
    return;
  }
});

router.get("/payments", (req, res) => {
  res.sendFile(path.join(__dirname + "/pag.html"));
});

router.post("/returnCreditCardToken", (req, res) => {
  const cardToken = req.body.suggest.card.token;
  const senderHash = req.body.senderHash;

  function cb(resp) {
    res.json(resp);
  }

  var payment = new PagSeguro({
    email: "rafaelffa1@hotmail.com",
    token: "8AB95E25A4144C50BBC42EEB95820798",
    sandbox: true,
    sandbox_email: "v32072130196663099765@sandbox.pagseguro.com.br",
  });

  payment.setSender({
    name: "Rafael Almeida",
    email: "rafael.ferreira.felix.almeida@gmail.com",
    cpf_cnpj: "04372866143",
    area_code: "61",
    phone: 56273440,
    birth_date: "10/01/1990", //formato dd/mm/yyyy
  });

  payment.setShipping({
    street: "Ed. Madison Aguas Claras",
    number: "28",
    district: "Aguas Claras",
    city: "Brasilia",
    state: "DF",
    postal_code: "71906500",
    same_for_billing: true,
  });

  payment.addItem({
    qtde: 1,
    value: 118,
    description: "Blusa",
  });

  payment.sendTransaction(
    {
      method: "creditCard", //'boleto' ou 'creditCard'
      credit_card_token: cardToken, //token do cartão de crédito
      value: 118,
      installments: 1, //opcional, padrão 1
      hash: senderHash, //senderHash gerado pela biblioteca do PagSeguro
    },
    function (err, data) {
      payment.transactionStatus(data.code, function (resp, status) {
        console.log({ data, status });
        cb({ status, data });
      });
    }
  );
});

router.get("/sessiontoken/pagseguro", (req, res) => {
  // Configurando ususario do pagseguro
  var payment = new PagSeguro({
    email: "rafaelffa1@hotmail.com",
    token: "8AB95E25A4144C50BBC42EEB95820798",
    sandbox: true,
    sandbox_email: "v32072130196663099765@sandbox.pagseguro.com.br",
  });

  payment.sessionId(function (err, session_id) {
    console.log("Session Token :" + session_id);
    res.json(session_id);
  });
});

router.post("/cancelTransactions/pagseguro/:email/:token", (req, res) => {
  function cb(resp) {
    res.json(resp);
  }

  let cancelTransaction = request.post(
    {
      url: `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/cancels?email=${req.params.email}&token=${req.params.token}`,
      form: { transactionCode: req.body.transactionCode },
    },
    function (err, response, body) {
      if (err) {
        cb(err);
      } else if (response.statusCode == 200) {
        const json = JSON.parse(xmlParser.toJson(body));
        cb(json);
      } else {
        const json = JSON.parse(xmlParser.toJson(body));
        if (json.errors && json.errors.error) {
          cb(json.errors.error);
        }
      }
    }
  );

  res.json(cancelTransaction);
});

router.post("/reverseTransactions/pagseguro/:email/:token", (req, res) => {
  function cb(resp) {
    res.json(resp);
  }

  let reverseTransactions = request.post(
    {
      url: `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions/refunds?email=${req.params.email}&token=${req.params.token}`,
      form: { transactionCode: req.body.transactionCode },
    },
    function (err, response, body) {
      if (err) {
        cb(err);
      } else if (response.statusCode == 200) {
        const json = JSON.parse(xmlParser.toJson(body));
        cb(json);
      } else {
        const json = JSON.parse(xmlParser.toJson(body));
        if (json.errors && json.errors.error) {
          cb(json.errors.error);
        }
      }
    }
  );

  res.json(reverseTransactions);
});

router.get("/consultTransactions/pagseguro/:email/:token", (req, res) => {
  const currentTimeTmp = new Date();
  let currentTimeNumber = currentTimeTmp.setDate(currentTimeTmp.getDate() - 1);
  const currentTime = new Date(currentTimeNumber);

  let rangeTimeTmp = new Date();
  let rangeTimeNumber = rangeTimeTmp.setDate(currentTime.getDate() - 15);
  const rangeTime = new Date(rangeTimeNumber);

  function cb(resp) {
    res.json(resp);
  }

  // https://ws.pagseguro.uol.com.br/v2/transactions

  let consultTransactions = request.get(
    {
      url: `https://ws.sandbox.pagseguro.uol.com.br/v2/transactions?email=${
        req.params.email
      }&token=${
        req.params.token
      }&initialDate=${rangeTime.toISOString()}&finalDate=${currentTime.toISOString()}`,
    },
    function (err, response, body) {
      if (err) {
        cb(err);
      } else if (response.statusCode == 200) {
        const json = JSON.parse(xmlParser.toJson(body));
        cb(json);
      } else {
        const json = JSON.parse(xmlParser.toJson(body));
        if (json.errors && json.errors.error) {
          cb(json.errors.error);
        }
      }
    }
  );
});

router.get("/consultOneTransaction/pagseguro/:email/:token", (req, res) => {
  function cb(resp) {
    res.json(resp);
  }

  let consultTransactions = request.get(
    {
      url: `https://ws.sandbox.pagseguro.uol.com.br/v3/transactions/45E7271C88154145B8260D48E2187D3A?email=${req.params.email}&token=${req.params.token}}`,
    },
    function (err, response, body) {
      if (err) {
        cb(err);
      } else if (response.statusCode == 200) {
        console.log("teste deu certo");
        const json = JSON.parse(xmlParser.toJson(body));
        cb(json);
      } else {
        const json = JSON.parse(xmlParser.toJson(body));
        if (json.errors && json.errors.error) {
          cb(json.errors.error);
        } else {
          cb(json);
        }
      }
    }
  );
});

// ===================== Ações ============================================

router.post("/verificar_login", (req, res) => {
  callback = (result) => {
    res.json(result);
  };

  UsuarioController.verificarLogin(req.body.token, callback);
});

router.post("/notification/status/pedido", (req, res) => {
  admin.messaging().sendMulticast({
    tokens: [req.body.token], // ['token_1', 'token_2', ...]
    notification: {
      title: "Status do pedido",
      body: req.body.message,
    },
  });
  res.sendStatus(200);
});

// FIREBASE API
router.post("/firebase/token", (req, res) => {
  admin.messaging().sendMulticast({
    tokens: [req.body.token], // ['token_1', 'token_2', ...]
    notification: {
      title: "Basic Notification",
      body: "This is a basic notification sent from the server!",
      imageUrl:
        "https://i.pinimg.com/originals/71/72/16/7172161b580470deb78078669236d2c1.jpg",
    },
  });

  res.sendStatus(200);
});

// COMETELE API
router.post("/enviar/sms", (req, res) => {
  let result = null;
  let text = req.body.text;
  let phone = req.body.phone;

  const apiKey = "76ce5cd6-66a3-496f-a082-fab1c44357e7";

  try {
    var textMessageService = new TextMessageService(apiKey);
    textMessageService.send(
      "my_id", // Sender: Id de requisicao da sua aplicacao para ser retornado no relatorio, pode ser passado em branco.
      text, // Content: Conteudo da mensagem a ser enviada.
      [phone], // Receivers: Numero de telefone que vai ser enviado o SMS.
      (result) => {
        console.log(result);
        result;
      }
    );

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/envio_email", (req, res) => {
  const transporter = nodemailer.createTransport({
    host: "smtpi.portecportas.com.br",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "siteatendimento@portecportas.com.br",
      pass: "Portec2020",
    },
    tls: { rejectUnauthorized: false },
  });

  const mailOptions = {
    from: "siteatendimento@portecportas.com.br",
    to: "portec.tec@gmail.com",
    subject: "E-mail Fale Conosco Site Portec",
    text: "",
    html: `
    <strong>Nome:</strong> ${req.body.name} <br />
    <strong>Email:</strong> ${req.body.email} <br />
    <strong>Assunto:</strong> ${req.body.subject} <br />
    <strong>Telefone:</strong> ${req.body.telefone} <br />
    <strong>Mensagem:</strong> ${req.body.text}
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    console.log(error);
    console.log(info);
    if (error) {
      console.log(error);
      res.json({ result: error });
    } else {
      res.json({ result: true });
      console.log("Email enviado: " + info.response);
    }
  });
});

router.post("/login", (req, res) => {
  function callback(row, usuarioID) {
    if (row == 1) {
      UsuarioController.gerarTokenLogin(usuarioID, callbackToken);
    } else if (row == 2) {
      res.json({ status: 2 });
    } else {
      res.json({ status: 3 });
    }

    function callbackToken(token) {
      res.json({ status: 1, token });
    }
  }

  UsuarioController.loginUsuario(req.body.email, req.body.senha, callback);
});

router.post("/login/mobile", (req, res) => {
  function callback(status, row) {
    res.json({ status: status, row });
  }
  UsuarioController.loginUsuarioMobile(
    req.body.celular,
    req.body.senha,
    callback
  );
});

router.post("/usuario/logado", (req, res) => {
  const { token } = req.body;
  UsuarioController.selectUsuarioAdmin(callbackUsuarioRestaurante, token);
  function callbackUsuarioRestaurante(usuario) {
    res.json({ usuario: usuario.row });
  }
});

router.post("/usuario/redefinir", (req, res) => {
  function callback(email, senha) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "rafael.ferreira.felix.almeida@gmail.com",
        pass: "Rafalindo1",
      },
    });

    const mailOptions = {
      from: "rafael.ferreira.felix.almeida@gmail.com",
      to: email,
      subject: "Redefinição de senha Mercado Mineiro",
      text: "",
      html: `
      <strong>Mercado Mineiro:</strong> <br />
      <strong>Nova senha:</strong> ${senha} <br />
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      console.log(error);
      console.log(info);
      if (error) {
        console.log(error);
        res.json({
          text: "Não foi possivel enviar o email, por favor tente novamente mais tarde.",
          status: false,
        });
      } else {
        console.log("Email enviado: " + info.response);
        res.json({
          text: "Verifique sua caixa de spam e lixeira.",
          status: true,
        });
      }
    });
  }
  UsuarioController.redefinirSenha(req.body.email, callback);
});

// ========================================================================

router.post("/gerarsenha", (req, res) => {
  function callback(status) {
    res.json({ status });
  }
  UsuarioController.gerarsenha(req.body.email, req.body.senha, callback);
});

// ===================== Categorias ============================================
router.get("/categorias", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  CategoriaController.selectAllCategorias(callback);
});
// ========================================================================

// ===================== Endereço =========================================
router.post("/enderecos", function (req, res) {
  EnderecoController.insertEndereco(
    req.body.cep,
    req.body.estado,
    req.body.cidade,
    req.body.bairro,
    req.body.endereco,
    req.body.numero,
    req.body.lat,
    req.body.long
  );

  res.sendStatus(200);
});

router.get("/enderecos", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  EnderecoController.selectAllEnderecos(callback);
});

router.get("/enderecos/:id", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  EnderecoController.selectIdEndereco(callback, req.params.id);
});

router.delete("/enderecos/:id", (req, res) => {
  EnderecoController.deleteEndereco(req.params.id);
  res.sendStatus(200);
});
// ========================================================================

// ===================== Rifa ==========================================
router.post("/rifa", function (req, res) {
  const jsonReceived = req.body;
  function callback(rifaID) {
    res.json(rifaID);
  }
  RifaController.insertRifas(jsonReceived, callback);
});

router.get("/rifa", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  RifaController.selecionarTodasRifas(callback);
});

router.get("/rifa/pagination/:page", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  RifaController.selecionarTodasRifasPaginado(req.params.page, callback);
});

router.get("/rifa/pesquisar/pagination/:page", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  RifaController.selectPesquisaRifas(callback, req.body.nome, req.params.page);
});

router.get("/rifa/:id", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  RifaController.selectRifasID(callback, req.params.id);
});

router.get("/rifa/usuario/:id/pagination/:page", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  RifaController.selectRifasUsuarioPaginado(
    callback,
    req.params.id,
    req.params.page
  );
});

router.get("/rifa/status/:status/pagination/:page", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  RifaController.selectRifaStatusPaginado(
    callback,
    req.params.status,
    req.params.page
  );
});

router.get("/rifa/categoria/:categoria/pagination/:page", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  RifaController.selectRifaCategoriaPaginado(
    callback,
    req.params.categoria,
    req.params.page
  );
});
// ===================== Rifa ==========================================

// ===================== COTAS ==========================================
router.post("/cotas", function (req, res) {
  const jsonReceived = req.body;
  function callback(cotaID) {
    res.json(cotaID);
  }
  CotasController.insertCotas(jsonReceived, callback);
});

router.get("/cotas/rifa/:rifaID", function (req, res) {
  function callback(cotas) {
    res.json(cotas);
  }
  CotasController.getCotaRifa(req.params.rifaID, callback);
});

router.get("/cotas/usuario/:usuario", function (req, res) {
  function callback(cotas) {
    res.json(cotas);
  }
  CotasController.getCotaRifaUser(req.params.usuario, callback);
});

router.get("/raffle/quoata/:id/winner/prize", function (req, res) {
  function callback(cotas) {
    res.json(cotas);
  }
  CotasController.getWinnerRaffle(req.params.id, callback);
});

// ===================== COTAS ==========================================

// ===================== PREMIAÇÃO ==========================================
router.get("/premiacao/rifa/:rifa", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  PremiacaoController.selectPremiacao(req.params.rifa, callback);
});
// ===================== PREMIAÇÃO ==========================================

/**
 * Status
 * 0 - Cancelado
 * 1 - Pendende de confirmação
 * 2 - Confirmado
 * 3 - Em andamento
 * 4 - Pausado
 * 5 - Finalizado
 */
router.put("/rifa/status", (req, res) => {
  RifaController.atualizarStatusRifa(req.body);
  res.sendStatus(200);
});
// ========================================================================

// ===================== Usuário ==========================================
router.post("/usuarios", async function (req, res) {
  let nomeFoto = "";
  if (req.body.foto === undefined) {
    nomeFoto = "defaultUsuario.png";
  } else {
    await UsuarioController.salvarFotos(req.body.foto);
    nomeFoto = req.body.foto[0].name;
  }
  UsuarioController.insertUsuarios(
    req.body.nome,
    req.body.email,
    req.body.tipo,
    req.body.senha,
    nomeFoto
  );
  res.sendStatus(200);
});

router.post("/usuarios/mobile", async function (req, res) {
  function callback(row) {
    const user = row[0];
    res.json({
      ID: user.ID,
      email: user.email,
      nome: user.nome,
      imagem: user.imagem,
      socialID: user.socialID,
    });
  }

  if (req.body.socialID === undefined) {
    UsuarioController.insertUsuariosMobile(req.body, callback);
  } else {
    UsuarioController.validarUsuarioSocialID(req.body.socialID, callbackSocial);

    function callbackSocial(social) {
      if (social.length === 0) {
        UsuarioController.insertUsuariosMobile(req.body, callback);
      } else {
        social.socialID = req.body.socialID;
        res.json(social[0]);
      }
    }
  }
});

router.get("/usuarios/validar/celular/:celular", async function (req, res) {
  function callback(row) {
    res.json(row);
  }
  UsuarioController.validarUsuarioCelular(req.params.celular, callback);
});

router.get("/usuarios/id/:id", async function (req, res) {
  function callback(row) {
    res.json(row);
  }
  UsuarioController.selectIdUsuario(callback, req.params.id);
});

router.get("/usuarios/validar/email/:email", async function (req, res) {
  function callback(row) {
    res.json(row);
  }
  UsuarioController.validarUsuarioEmail(req.params.email, callback);
});

router.get("/usuarios/validar/socialID/:socialID", async function (req, res) {
  function callback(row) {
    res.json(row);
  }
  UsuarioController.validarUsuarioSocialID(req.params.socialID, callback);
});

router.get("/usuarios", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  UsuarioController.selectAllUsuarios(callback);
});

router.put("/usuarios/mobile", (req, res) => {
  UsuarioController.atualizarUsuarioMobile(req.body);
  res.sendStatus(200);
});

router.delete("/usuarios/:id", (req, res) => {
  UsuarioController.deleteUsuarios(req.params.id);
  res.sendStatus(200);
});

router.post("/usuarios/endereco", async function (req, res) {
  EnderecoController.insertEnderecoUsuarios(req.body);
  res.sendStatus(200);
});

router.put("/usuarios/atualizar/ficha", async function (req, res) {
  UsuarioController.updateFichaUsuario(req.body);
  res.sendStatus(200);
});

router.get("/usuarios/ficha/:usuarioID", (req, res) => {
  function callback(row) {
    res.json(row);
  }
  UsuarioController.selectFichaUsuario(req.params.usuarioID, callback);
});

// ========================================================================

router.get("/verification/prize", (req, res) => {
  RifaController.verificacaoSorteioRifas();
  res.sendStatus(200);
});

module.exports = router;
