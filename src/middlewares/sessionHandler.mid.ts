import { Request, Response, NextFunction, Handler } from 'express'
import { SessionService } from '~SERVICES/Session.service'
import { getConfig } from '~UTILS/config.util'

export function sessionHandler(): Handler {
  const session = new SessionService()

  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { fromNumber, body } = req.body.data as TWassiRequest['data']

      // Validar la data del body de la petición POST
      if (!fromNumber || !body) throw new Error('Body is incorrect')

      // Descartar el número del bot entre los usuarios emisores
      if (fromNumber === getConfig().nroBot) res.end()
      else {
        await session.login(fromNumber)
        next()
      }
    } catch (error) {
      next(error)
    }
  }
}
