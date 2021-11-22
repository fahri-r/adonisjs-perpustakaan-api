import Mail from '@ioc:Adonis/Addons/Mail'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Member from 'App/Models/Member'
import User from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'
import VerificationCode from 'App/Models/VerificationCode'
import MemberValidator from 'App/Validators/MemberValidator'

export default class MembersController {
    public async index({ response }: HttpContextContract) {
      const members = await Member.query()
      .preload('user')
  
      if (!members.length) {
        return response.notFound({
          message: 'no data found'
        })
      }
  
      return response.ok({
        message: 'success get members',
        data: members
      })
    }
  
    public async store({ request, response }: HttpContextContract) {
      const payload = await request.validate(MemberValidator)

      const user = new User
      user.email = payload.email
      user.role = 'member'
      if(payload.telegramId) {
        user.telegramId = payload.telegramId
      }
      user.password = payload.password ? payload.password : '12345678'
  
      const member = new Member
      member.name = payload.name
      member.address = payload.address
      member.phone = payload.phone
      member.image = payload.image
      await member.save()
    
      const code = Math.floor(100000 + Math.random() * 900000)
      const verificationCode = new VerificationCode
      verificationCode.code = code
  
      const url = Route.builder()
      .prefixUrl(process.env.APP_URL!)
      .make('AuthController.emailVerification')
  
      await Mail.send((message) => {
        message
          .from('admin@perpustakaan.com')
          .to(user.email)
          .subject('Welcome Onboard!')
          .htmlView('email_verification', { url, email: user.email, code })
      })

      try {
        await user.save()
        await member.related('user').associate(user)
        await verificationCode.related('user').associate(user)
      } catch (error) {
        return response.badRequest({ message: error.message })
      } 
      
      return response.created({
        message: 'member created, please verify your email',
        data: member
      })
    }
  
    public async show({ response, params }: HttpContextContract) {
      const member = await Member.query()
      .preload('user')
      .where('id', params.id)
      .firstOrFail()
  
      return response.ok({
        message: 'success get member by id',
        data: member
      })
    }
  
    public async update({ request, response, params }: HttpContextContract) {
      const payload = await request.validate(MemberValidator)
  
      const member = await Member.findOrFail(params.id)
      member.name = payload.name
      member.address = payload.address
      member.phone = payload.phone
      member.image = payload.image
      await member.save()

      const user = await User.findOrFail(member.userId)
      user.email = payload.email
      
      if(payload.password) {
        user.password = payload.password
      }

      if(payload.telegramId) {
        user.telegramId = payload.telegramId
      }
      
      try {
        await user.save()
        await member.related('user').associate(user)
      } catch (error) {
        return response.badRequest({ message: error.message })
      }  
  
      return response.ok({
        message: 'member updated',
        data: member
      })
    }
  
    public async destroy({ response, params }: HttpContextContract) {
      const member = await Member.findOrFail(params.id)
      const user = await User.findOrFail(member.userId)
      await user.delete()
  
      return response.ok({ message: 'member deleted' })
    }
}
