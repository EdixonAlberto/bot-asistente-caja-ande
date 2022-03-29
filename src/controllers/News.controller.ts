import { Controller } from '~CLASS/Controller'
import { HomeController } from '~CONTROLLERS/Home.controller'
import { convertArrayInMessage, messageOptionInvalid } from '~UTILS/message.util'

export class NewsController extends Controller {
  async startDecisionTree(session: TSession) {
    let response = ''

    const options = `
    (141) Fecha de pago de haberes
    (142) Enlaces de interés y noticias`

    switch (this.message) {
      case 'menu':
        session.treeLevel = 'NEWS'
        session.treeStep = ''

        response = `
        Elige una de las siguientes opciones:
        ${options}`
        break

      case '141':
        const paymentDate = await this.andeService.getPaymentDate()

        if (typeof paymentDate === 'object') {
          response = `
          No te olvides de tus fechas de cobro! 😇

          *Fecha*: ${paymentDate.mensaje}`
        } else response = paymentDate
        break

      case '142':
        const links = await this.andeService.getLinks()

        if (typeof links === 'object') {
          const enabledLinks = links.filter(link => link.estado)

          const linkList = convertArrayInMessage(enabledLinks, item => {
            return `
            *${item.nombre}*
            ${item.descripcion}`
          })

          response = `
          Las mejores promociones en un solo lugar 🌎
          ${linkList}`
        } else response = links
        break

      case '0':
        new HomeController({
          ...this.data,
          message: 'menu'
        })
        break

      default:
        response = messageOptionInvalid(options)
        break
    }

    return this.sendMessage(response)
  }
}
