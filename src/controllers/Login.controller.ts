import { Controller } from '~CLASS/Controller'
import { HomeController } from '~CONTROLLERS/Home.controller'
import { MainController } from '~CONTROLLERS/Main.controller'
import { convertMessageInArray, convertPhoneInLocal } from '~UTILS/message.util'
import { isNumber, isPhoneParaguay } from '~UTILS/validation.util'

export class LoginController extends Controller {
  async startDecisionTree(session: TSession) {
    let response = ''

    const isParaguay = isPhoneParaguay(this.phone)

    switch (this.message) {
      case 'menu':
        session.treeLevel = 'LOGIN'

        this.initStore(session)

        response = 'Nuestra CAJA, tu futuro!\n'

        if (isParaguay) {
          session.treeStep = 'STEP_1'
          response += `
          Por favor envíanos tu número de CI para ayudarte`
        } else {
          session.treeStep = 'STEP_2'
          response += `
          Por favor envíanos tu número de CI, número de afiliado y número de celular separados por los espacios que desee

          *Ejemplo*: 1234567 12345 0123456789`
        }
        break

      case '0':
        session.treeLevel = 'MAIN'
        session.treeStep = ''

        this.initStore(session)

        new MainController(this.data)
        break

      default:
        switch (session.treeStep) {
          case 'STEP_1':
            if (isNumber(this.message)) {
              session.treeStep = 'STEP_2'
              session.store.login.ci = this.message

              response = 'Envíanos tu número de afiliado'
            } else response = '⚠️ Número Invalido, por favor envie un número de CI correcto'
            break

          case 'STEP_2':
            let nroCedula = '',
              nroAfiliado = '',
              nroCelular = ''

            if (isParaguay) {
              if (isNumber(this.message)) {
                nroCedula = session.store.login.ci
                nroAfiliado = this.message

                // Para realizar el inicio de sesión, el prefijo internacional +595 de Paraguay
                // debe ses reemplazado por un cero
                nroCelular = convertPhoneInLocal(this.phone)
              } else {
                response = '⚠️ Número Invalido, por favor envie un número de afiliado correcto'
                break
              }
            } else {
              // Convertimos en array el mensaje y verificamos que cada dato sea un número
              ;[nroCedula, nroAfiliado, nroCelular] = convertMessageInArray(this.message).filter(item => isNumber(item))
            }

            if (nroCedula && nroAfiliado && nroCelular) {
              const loginResponse = await this.andeService.login({
                nroCedula,
                nroAfiliado,
                nroCelular
              })

              if (typeof loginResponse === 'object') {
                // Guardar los datos del afiliado
                session.ande = {
                  affiliate: loginResponse.afiliado,
                  token: loginResponse.token
                }

                new HomeController({
                  ...this.data,
                  message: 'menu'
                })
              } else {
                if (isParaguay) session.treeStep = 'STEP_1'

                response = loginResponse
              }
            } else response = '⚠️ Formato incorrecto, verifique que los datos sean correctos e intente de nuevo'
            break
        }
    }

    return this.sendMessage(response)
  }

  private initStore(session: TSession): void {
    session.store = { login: {} } as any
  }
}
