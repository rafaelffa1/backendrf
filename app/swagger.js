swaggerConfig = {
  openapi: '3.0.1',
  info: {
    version: '1.3.0',
    title: 'RabbitApp',
    description: 'User management API',
    termsOfService: 'http://api_url/terms/',
    contact: {
      name: 'Time do Schinaider',
      email: 'hello@wolox.co',
      url: 'https://www.wolox.com.ar/'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  servers: [
    {
      url: 'http://localhost:21170/',
      description: 'Local server'
    }
  ],
  tags: [
    {
      name: 'ENDEREÇO'
    },
    {
      name: 'PRODUTO'
    },
    {
      name: 'OPÇÃO DO PRODUTO'
    },
    {
      name: 'RESTAURANTE'
    },
    {
      name: 'USUÁRIO'
    },
    {
      name: 'CARRINHO'
    },
    {
      name: 'PEDIDO'
    },
    {
      name: 'ITEM DO PEDIDO'
    }
  ],
  paths: {
    // ENDERECO -----------------------------------------------------+
    '/enderecos': {
      get: {
        tags: ['ENDEREÇO'],
        description: 'Listar endereços',
        operationId: 'listAdresses',
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Lista de endereços'
          }
        }
      },
      post: {
        tags: ['ENDEREÇO'],
        description: 'Cadastrar endereço',
        operationId: 'addAdress',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  cep: {
                    type: 'string'
                  },
                  estado: {
                    type: 'string'
                  },
                  cidade: {
                    type: 'string'
                  },
                  bairro: {
                    type: 'string'
                  },
                  endereco: {
                    type: 'string'
                  },
                  numero: {
                    type: 'string'
                  },
                  lat: {
                    type: 'string'
                  },
                  long: {
                    type: 'string'
                  },
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Endereço cadastrado'
          }
        }
      }
    },
    '/enderecos/{id}': {
      get: {
        tags: ['ENDEREÇO'],
        description: 'Listar endereço por id',
        operationId: 'listAdress',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do endereço'
          }
        ],
        responses: {
          '200': {
            description: 'Endereço pesquisado'
          }
        }
      }
    },
    '/enderecos/{id}': {
      delete: {
        tags: ['ENDEREÇO'],
        description: 'Deletar endereço por id',
        operationId: 'delAdress',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do endereço'
          }
        ],
        responses: {
          '200': {
            description: 'Endereço deletado'
          }
        }
      }
    },
    // PRODUTO -----------------------------------------------------+
    '/produtos': {
      get: {
        tags: ['PRODUTO'],
        description: 'Listar produtos',
        operationId: 'listProducts',
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Lista de produtos'
          }
        }
      },
      post: {
        tags: ['PRODUTO'],
        description: 'Cadastrar produto',
        operationId: 'addProduct',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'object',
                    properties: {
                      nome_produto: {
                        type: 'string'
                      },
                      categoria: {
                        type: 'string'
                      },
                      desc_produto: {
                        type: 'string'
                      },
                      valor: {
                        type: 'string'
                      },
                      restauranteID: {
                        type: 'string'
                      },
                    }
                  },
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Produto cadastrado'
          }
        }
      }
    },
    '/restaurantes/{id}/produtos': {
      get: {
        tags: ['PRODUTO'],
        description: 'Listar produtos por restaurante',
        operationId: 'listProductsRest',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do restaurante'
          }
        ],
        responses: {
          '200': {
            description: 'Produtos pesquisados'
          }
        }
      }
    },
    '/produtos/{id}': {
      get: {
        tags: ['PRODUTO'],
        description: 'Listar produto por id',
        operationId: 'listProduct',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do produto'
          }
        ],
        responses: {
          '200': {
            description: 'Produto pesquisado'
          }
        }
      }
    },
    '/produtos/{id}': {
      delete: {
        tags: ['PRODUTO'],
        description: 'Deletar produto por id',
        operationId: 'delProduct',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do produto'
          }
        ],
        responses: {
          '200': {
            description: 'Produto deletado'
          }
        }
      }
    },
    // OPCAO PRODUTO -----------------------------------------------------+
    '/produtos/opcoes': {
      get: {
        tags: ['OPÇÃO DO PRODUTO'],
        description: 'Listar opções dos produtos',
        operationId: 'listOptionsProds',
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Lista de opções'
          }
        }
      },
      post: {
        tags: ['OPÇÃO DO PRODUTO'],
        description: 'Cadastrar opção do produto',
        operationId: 'addOptionProd',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'object',
                    properties: {
                      nome_opcao: {
                        type: 'string'
                      },
                      obrigatorio: {
                        type: 'string'
                      },
                      selecao: {
                        type: 'string'
                      },
                      produtoID: {
                        type: 'string'
                      },
                    }
                  },
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Opção do produto cadastrado'
          }
        }
      }
    },
    '/produtos/opcoes/{id}': {
      get: {
        tags: ['OPÇÃO DO PRODUTO'],
        description: 'Listar opção por id',
        operationId: 'listOption',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id da opção'
          }
        ],
        responses: {
          '200': {
            description: 'Opção pesquisada'
          }
        }
      }
    },
    '/produtos/{id}/opcoes': {
      get: {
        tags: ['OPÇÃO DO PRODUTO'],
        description: 'Listar opções de um produto',
        operationId: 'listOptionsProd',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do produto'
          }
        ],
        responses: {
          '200': {
            description: 'Opções do produto pesquisado'
          }
        }
      }
    },
    '/produtos/opcoes/{id}': {
      delete: {
        tags: ['OPÇÃO DO PRODUTO'],
        description: 'Deletar opção por id',
        operationId: 'delOption',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id da opção'
          }
        ],
        responses: {
          '200': {
            description: 'Opção deletada'
          }
        }
      }
    },
    // RESTAURANTE -----------------------------------------------------+
    '/restaurantes': {
      get: {
        tags: ['RESTAURANTE'],
        description: 'Listar restaurantes',
        operationId: 'listRests',
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Lista de restaurantes'
          }
        }
      },
      post: {
        tags: ['RESTAURANTE'],
        description: 'Cadastrar restaurante',
        operationId: 'addRest',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  cnpj: {
                    type: 'string'
                  },
                  razao_social: {
                    type: 'string'
                  },
                  nome_fantasia: {
                    type: 'string'
                  },
                  telefone: {
                    type: 'string'
                  },
                  servico_entrega: {
                    type: 'string'
                  },
                  especialidade: {
                    type: 'string'
                  },
                  enderecoID: {
                    type: 'string'
                  },
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Restaurante cadastrado'
          }
        }
      }
    },
    '/restaurantes/{id}': {
      get: {
        tags: ['RESTAURANTE'],
        description: 'Listar restaurante por id',
        operationId: 'listRest',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do restaurante'
          }
        ],
        responses: {
          '200': {
            description: 'Restaurante pesquisado'
          }
        }
      }
    },
    '/restaurantes/{id}': {
      delete: {
        tags: ['RESTAURANTE'],
        description: 'Deletar restaurante por id',
        operationId: 'delRest',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do restaurante'
          }
        ],
        responses: {
          '200': {
            description: 'Restaurante deletado'
          }
        }
      }
    },
    // USUARIO -----------------------------------------------------+
    '/usuarios': {
      get: {
        tags: ['USUÁRIO'],
        description: 'Listar usuários',
        operationId: 'listUsers',
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Lista de usuários'
          }
        }
      },
      post: {
        tags: ['USUÁRIO'],
        description: 'Cadastrar usuário',
        operationId: 'addUser',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  nome: {
                    type: 'string'
                  },
                  email: {
                    type: 'string'
                  },
                  tipo: {
                    type: 'string'
                  },
                  senha: {
                    type: 'string'
                  },
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Usuário cadastrado'
          }
        }
      }
    },
    '/usuarios/{id}': {
      delete: {
        tags: ['USUÁRIO'],
        description: 'Deletar usuário por id',
        operationId: 'delUser',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do usuário'
          }
        ],
        responses: {
          '200': {
            description: 'Usuário deletado'
          }
        }
      }
    },
    // Carrinho -----------------------------------------------------+
    '/carrinhos': {
      get: {
        tags: ['CARRINHO'],
        description: 'Listar carrinhos',
        operationId: 'listCarts',
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Lista de carrinhos'
          }
        }
      },
      post: {
        tags: ['CARRINHO'],
        description: 'Cadastrar carrinho',
        operationId: 'addCart',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  usuarioID: {
                    type: 'string'
                  },
                  restauranteID: {
                    type: 'string'
                  },
                  produtoID: {
                    type: 'string'
                  },
                  nomeProduto: {
                    type: 'string'
                  },
                  description: {
                    type: 'string'
                  },
                  quantidadeProduto: {
                    type: 'string'
                  },
                  valorProduto: {
                    type: 'string'
                  },
                  valorTotalProduto: {
                    type: 'string'
                  },
                  valorTotalOpcoes: {
                    type: 'string'
                  },
                  opcoesEscolhidas: {
                    type: 'string'
                  },
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Carrinho cadastrado'
          }
        }
      }
    },
    '/usuarios/{id}/carrinhos': {
      get: {
        tags: ['CARRINHO'],
        description: 'Listar carrinho por id do usuário',
        operationId: 'listCart',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do usuário'
          }
        ],
        responses: {
          '200': {
            description: 'Carrinho pesquisado'
          }
        }
      }
    },
    '/usuarios/{id}/carrinhos': {
      delete: {
        tags: ['CARRINHO'],
        description: 'Deletar carrinho do usuário',
        operationId: 'delCart',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do usuário'
          }
        ],
        responses: {
          '200': {
            description: 'Carrinho deletado'
          }
        }
      }
    },
    // Pedido -----------------------------------------------------+
    '/pedidos': {
      get: {
        tags: ['PEDIDO'],
        description: 'Listar pedidos',
        operationId: 'listOrders',
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Lista de pedidos'
          }
        }
      },
      post: {
        tags: ['PEDIDO'],
        description: 'Cadastrar pedido',
        operationId: 'addOrder',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  usuarioID: {
                    type: 'string'
                  },
                  restauranteID: {
                    type: 'string'
                  },
                  status: {
                    type: 'string'
                  },
                  valorTotal: {
                    type: 'string'
                  },
                  dataPedido: {
                    type: 'string'
                  },
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Pedido cadastrado'
          }
        }
      }
    },
    '/usuarios/{id}/pedidos': {
      get: {
        tags: ['PEDIDO'],
        description: 'Listar pedido por id do usuário',
        operationId: 'listOrder',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do usuário'
          }
        ],
        responses: {
          '200': {
            description: 'Pedido pesquisado'
          }
        }
      }
    },
    '/usuarios/{id}/realizar-pedido': {
      post: {
        tags: ['PEDIDO'],
        description: 'Realizar pedido do usuário',
        operationId: 'listSendOrder',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do usuário'
          }
        ],
        responses: {
          '200': {
            description: 'Pedido realizado'
          }
        }
      }
    },
    // Item Pedido -----------------------------------------------------+
    '/pedidos/item': {
      get: {
        tags: ['ITEM DO PEDIDO'],
        description: 'Listar itens dos pedidos',
        operationId: 'listItems',
        parameters: [
        ],
        responses: {
          '200': {
            description: 'Lista de itens'
          }
        }
      },
      post: {
        tags: ['ITEM DO PEDIDO'],
        description: 'Cadastrar item do pedido',
        operationId: 'addItem',
        parameters: [
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  pedidoID: {
                    type: 'string'
                  },
                  produtoID: {
                    type: 'string'
                  },
                  nomeProduto: {
                    type: 'string'
                  },
                  opcoesEscolhidas: {
                    type: 'string'
                  },
                  qtd: {
                    type: 'string'
                  },
                  valorProduto: {
                    type: 'string'
                  },
                  valorTotal: {
                    type: 'string'
                  },
                }
              }
            }
          },
        },
        responses: {
          '200': {
            description: 'Item cadastrado'
          }
        }
      }
    },
    '/pedidos/{id}/item': {
      get: {
        tags: ['ITEM DO PEDIDO'],
        description: 'Listar item por id do pedido',
        operationId: 'listItem',
        parameters: [
          {
            in: 'path',
            name: 'id',
            schema: {
              type: 'integer'
            },
            description: 'Id do pedido'
          }
        ],
        responses: {
          '200': {
            description: 'Item pesquisado'
          }
        }
      }
    },
  },
  //--------
};

module.exports = swaggerConfig;