import { HttpClient } from 'class/HttpClient'

export class AndeService extends HttpClient {
  constructor() {
    const { apiUrl } = global.config.ande
    super({
      baseURL: apiUrl,
      defaultPath: '/cjppa/rest/chatbot'
    })
  }

  public async getAffiliateByPhone(phone: string): Promise<any | null> {
    try {
      const { data } = await this.http.get(`/afiliado/celular/${phone}`)
      console.log('CELULAR', data)

      return data
    } catch (_) {
      return null
    }
  }

  public async getAffiliateByCI(ci: string): Promise<any | null> {
    try {
      const { data } = await this.http.get(`/afiliado/cedula/${ci}`)
      console.log('CEDULA', data)

      return data
    } catch (_) {
      return null
    }
  }

  public async getAffiliateByNro(affiliate: string): Promise<TAffiliate | null> {
    try {
      const { data } = await this.http.get<TAffiliate>(`/opcionesmenu/${affiliate}`)
      console.log('opcionesmenu', data)

      return data
    } catch (_) {
      return null
    }
  }
}
