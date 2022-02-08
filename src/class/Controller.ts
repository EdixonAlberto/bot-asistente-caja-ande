import { AndeService } from '~SERVICES/Ande.service'
import { WassiService } from '~SERVICES/Wassi.service'
import { botDebug } from '~UTILS/debug.util'

export class Controller {
  protected andeService: AndeService
  private wassiService: WassiService

  protected data: TDataController
  protected username: string
  protected message: string

  constructor(data: TDataController) {
    this.andeService = new AndeService()
    this.wassiService = new WassiService()

    this.data = data
    this.username = data.username
    this.message = data.message

    this.startDecisionTree()
  }

  protected async startDecisionTree(): Promise<void> {}

  protected async sendMessage(response: string): Promise<void> {
    if (response) {
      const wassiResponse = await this.wassiService.sendMessage(this.data.phone, response.trim())

      if (wassiResponse) {
        const message = wassiResponse.message.substring(0, 40) + '...'
        botDebug(`WASSI: Message sent successfully - STATUS: ${wassiResponse.status}, MESSAGE: ${message}`)
      }
    }
  }
}