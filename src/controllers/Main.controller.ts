import { Controller } from '~CLASS/Controller'
import { CreditCardController } from '~CONTROLLERS/CreditCard.controller'
import { HomeController } from '~CONTROLLERS/Home.controller'
import { LoginController } from '~CONTROLLERS/Login.controller'
import { messageOptionInvalid } from '~UTILS/message.util'

export class MainController extends Controller {
  async startDecisionTree() {
    let response = ''
    const options = `
    (1) Acceso para afiliados de la CAJA
    (2) No afiliados
    `

    switch (FLOW_STATE) {
      case 'MAIN_1':
        FLOW_STATE = 'MAIN_2'

        response = `
        Hola 🤗 soy el Asistente Virtual de Caja Ande.
        Selecciona una opción para poder ayudarte:
        ${options}
        `
        break

      case 'MAIN_2':
        switch (this.message) {
          case '1':
            FLOW_STATE = 'LOGIN_STEP_1'

            response = `
            Hola! soy el asistente virtual de los afiliados de la CAJA 🤓
            Nuestra caja, tu futuro!

            Por favor enviános tu número de CI para ayudarte
            `
            break

          case '2':
            response = `
            Mesa de Entrada
            ( Opciones no disponible )
            `
            break

          default:
            response = messageOptionInvalid(options)
            break
        }
        break

      case 'LOGIN_STEP_1':
        new LoginController(this.data)
        break

      case 'HOME':
        new HomeController(this.data)
        break

      case 'CREDIT_CARD':
        new CreditCardController(this.data)
        break

      default:
        if (FLOW_STATE === 'LOGIN_STEP_2') {
          new LoginController(this.data)
        }
        break
    }

    this.sendMessage(response)
  }
}
