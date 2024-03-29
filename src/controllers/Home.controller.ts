import { Controller } from '~CLASS/Controller'
import { CreditCardController } from '~CONTROLLERS/CreditCard.controller'
import { LendingQuery } from '~CONTROLLERS/LendingQuery.controller'
import { NewsController } from '~CONTROLLERS/News.controller'
import { PersonalDataController } from '~CONTROLLERS/PersonalData.controller'
import { DownloadController } from '~CONTROLLERS/Download.controller'
import { LendingsController } from '~CONTROLLERS/Lendings.controller'
import { InfoController } from '~CONTROLLERS/Info.controller'
import { EntryTableController } from '~CONTROLLERS/EntryTable.controller'
import { convertMessageInFullname } from '~UTILS/message.util'

export class HomeController extends Controller {
  async startDecisionTree(session: TSession) {
    let response = ''

    const options = `
    (11) Préstamos 💰
    (12) Tarjetas de crédito 💳
    (13) Consultas sobre préstamos 🧐
    (14) Noticias e informaciones del mes 📱
    (15) Datos personales 😊
    (16) Descargas 🤗
    (17) Informaciones varias 😄
    (18) Mesa de entrada
    (00) Cerrar Sesión ↩️`

    switch (this.message) {
      case 'menu':
        session.treeLevel = 'HOME'
        session.treeStep = ''

        const fullName = convertMessageInFullname(session.ande!.affiliate.nombre)

        response = `
        Bienvenido *${fullName}* en CAJA ANDE trabajamos para vos 🤓
        Revisa las opciones que tenemos desponible:
        ${options}_`
        break

      case '11':
        new LendingsController({
          ...this.data,
          message: 'menu'
        })
        break

      case '12':
        new CreditCardController({
          ...this.data,
          message: 'menu'
        })
        break

      case '13':
        new LendingQuery({
          ...this.data,
          message: 'menu'
        })
        break

      case '14':
        new NewsController({
          ...this.data,
          message: 'menu'
        })
        break

      case '15':
        new PersonalDataController({
          ...this.data,
          message: 'menu'
        })
        break

      case '16':
        new DownloadController({
          ...this.data,
          message: 'menu'
        })
        break

      case '17':
        new InfoController({
          ...this.data,
          message: 'menu'
        })
        break

      case '18':
        new EntryTableController({
          ...this.data,
          message: 'menu'
        })
        break

      case '00':
        session.treeLevel = 'MAIN'
        session.treeStep = ''
        session.ande = null
        session.store = {} as any
        response = 'Gracias por usar el Asistente Virtual de Caja Ande 👋_'
        break

      default:
        if (session.treeStep === 'STEP_8') {
          const fullName = convertMessageInFullname(session.ande!.affiliate.nombre)

          response = `
          Bienvenido *${fullName}* en CAJA ANDE trabajamos para vos 🤓
          Revisa las opciones que tenemos desponible:
          ${options}_`
        } else {
          response = `
          ❌ Opción invalida, las opciones disponibles son:
          ${options}_`
        }
        break
    }

    return this.sendMessage(response)
  }
}
