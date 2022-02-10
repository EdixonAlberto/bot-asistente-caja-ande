import { Controller } from '~CLASS/Controller'
import { HomeController } from '~CONTROLLERS/Home.controller'
import { MENU_BACK, MENU_RETURN } from '~ENTITIES/consts'
import { messageOptionInvalid } from '~UTILS/message.util'

export class PersonalDataController extends Controller {
  async startDecisionTree() {
    let response = ''
    const options = `
    (151) Cargar una foto (Reconocimiento facial)
    (152) Cargar domicilio (envío de ubicación)
    `

    switch (this.message) {
      case 'menu':
        TREE_LEVEL = 'PERSONAL_DATA'
        TREE_STEP = ''

        response = `
        Elige una de las siguiente opciones:
        ${options}

        ${MENU_BACK}
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

      case '0':
        TREE_LEVEL = 'HOME'
        new HomeController({
          ...this.data,
          message: 'menu'
        })
        break

      case '00':
        this.message = 'menu'
        this.startDecisionTree()
        break

      default:
        switch (TREE_STEP) {
          case 'STEP_1':
            response = `
            Su fotografía ha sido guardada correctamente ✅

            ${MENU_RETURN}
            `
            break

          case 'STEP_2':
            response = `
            Su fotografía ha sido guardada correctamente ✅

            ${MENU_RETURN}
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
