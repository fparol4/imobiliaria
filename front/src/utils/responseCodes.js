let codeStatus = {
    400: {
      "title": "Dados incorretos",
      "message": "Login e/ou senha Incorretos",
      "alert_type": "warning"
    },
    404: {
      "title": "Ops! Ocorreu um Erro",
      "message": "Login não encontrado!",
      "alert_type": "warning"
    },
    401: {
      "title": "Ops! Ocorreu um Erro",
      "message": "Login não encontrado!",
      "alert_type": "warning"
    },
    500: {
      "title": "Ops! Ocorreu um Problema",
      "message": "Ouve um erro no servidor, entre em contato com o Administrador!",
      "alert_type": "danger"
    }
  }

  module.exports = codeStatus;
