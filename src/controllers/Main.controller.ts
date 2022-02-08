import { Controller } from '~CLASS/Controller'
import { LoginController } from '~CONTROLLERS/Login.controller'

export class MainController extends Controller {
  async startDecisionTree() {
    let response = ''

    switch (this.message) {
      case '1':
        response = `
        Hola! soy el asistente virtual de los afiliados de la CAJA 🤓
        Nuestra caja, tu futuro!

        Por favor enviános tu número de CI para ayudarte
        `
        FLOW_STATE = 'login'
        break

      case '2':
        response = `
        Mesa de Entrada
        ( Opciones no disponible )
        `
        break

      default:
        if (FLOW_STATE === 'login') {
          new LoginController(this.data)
        } else
          response = `
          Hola 🤗 soy el Asistente Virtual de Caja Ande.
          Selecciona una opción para poder ayudarte:

          (1) Acceso para afiliados de la CAJA
          (2) No afiliados
          `
        break
    }

    this.sendMessage(response)
  }
}
