import { Controller } from '~CLASS/Controller'
import { MENU_HOME } from '~ENTITIES/consts'
import { messageOptionInvalid } from '~UTILS/message.util'

export class PersonalDataController extends Controller {
  async startDecisionTree() {
    let response = ''
    const options = `
    (151) Cargar una foto (Reconocimiento facial)
    (152) Cargar domicilio (envío de ubicación)
    `

    let TREE_OPTION = this.message

    switch (TREE_OPTION) {
      case 'menu':
        TREE_STEP = ''

        response = `
        Elige una de las siguiente opciones:
        ${options}

        ${MENU_HOME}
        `
        break

      case '151':
        TREE_STEP = 'STEP_1'
        response =
          'Para comenzar con el reconocimiento facial tenés que cargar una foto. Debe ser una foto de color claro y no utilizar lentes de sol ni mascarillas 😬'
        break

      case '152':
        TREE_STEP = 'STEP_2'
        response =
          'Necesitamos saber tu domicilio, por favor envia tu dirección en un único mensaje. No olvides incluir el nombre de la calle y número de casa 🏡'
        break

      default:
        switch (TREE_STEP) {
          case 'STEP_1':
            response = `
            Su fotografía ha sido guardada correctamente ✅

            ${MENU_HOME}
            `
            break

          case 'STEP_2':
            response = `
            Su fotografía ha sido guardada correctamente ✅

            ${MENU_HOME}
            `
            break

          default:
            response = messageOptionInvalid(options)
            break
        }
        break
    }

    this.sendMessage(response)
  }
}
