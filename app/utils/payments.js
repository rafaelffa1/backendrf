
var rp = require('request-promise')
var parser = require('xml2js').parseString

module.exports = {

    pay: function* () {
        try {
            //Recupere os dados do seu usuário, recomendo o squel para as           consultas sql
            var options = {
                method: 'POST',
                uri: 'https://ws.sandbox.pagseguro.uol.com.br/v2/pre-approvals/request',
                form: {
                    email: 'rafaelffa1@hotmail.com',
                    token: '8AB95E25A4144C50BBC42EEB95820798',
                    currency: 'BRL',
                    preApprovalCharge: 'auto',
                    preApprovalName: 'Assinatura 1',
                    preApprovalDetails: 'Cobranca mensal',
                    preApprovalAmountPerPayment: '249.91',
                    preApprovalPeriod: 'monthly',
                    preApprovalMaxTotalAmount: '249.91',
                    reference: '654987asd987asdf', //ID para vc identificar a venda
                    senderName: 'NOME_DO_CABA',
                    senderCPF: CPF,
                    senderAreaCode: 'TE',
                    senderPhone: 'LEFONE',
                    senderEmail: 'LEFONE',
                    senderHash: params.senderHash, //A API te retorna,
                    installmentQuantity: '1', // Parcelamento
                    installmentValue: '249.91',
                    noInterestInstallmentQuantity: '12',
                    creditCardToken: params.user.cardToken,
                    creditCardHolderName: 'Nome do usuário',
                    creditCardHolderCPF: 'CPF',
                    creditCardHolderBirthDate: 'DATA_NASCIMENTO',
                    creditCardHolderAreaCode: 'TE',
                    creditCardHolderPhone: 'LEFONE',
                    billingAddressStreet: 'LEFONE',
                    billingAddressNumber: 'LEFONE',
                    billingAddressComplement: 'LEFONE',
                    billingAddressDistrict: 'LEFONE',
                    billingAddressPostalCode: 'LEFONE',
                    billingAddressCity: 'LEFONE',
                    billingAddressState: 'LEFONE',
                    billingAddressCountry: 'BRA'
                }
            }

            var response = {}

            yield rp(options).then(function (xml) {
                parseString(xml, function (err, result) {
                    response = result
                })
            }).catch(function (err) {
                response = err
            })

            console.log(response);

        } catch {
            throw new Error('Erro no pagamento!')
        }
    }
}