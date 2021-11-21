import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Role {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>, role: string[]) {
    let authorized = false
    for (let i = 0; i < role.length; i++) {
      if (role[i] == auth.user?.role) {
        authorized = true
      }
    }
    if (authorized) {
      await next()
    } else {
      return response.unauthorized({ message: `${auth.user?.role} not allowed to access this route` })
    }
  }
}
