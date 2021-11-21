import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Verified {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    let authorized = false
    if (auth.user?.verified) {
      authorized = true
    }
    if (authorized) {
      await next()
    } else {
      return response.unauthorized({ message: `user hasn't verified email` })
    }
  }
}
