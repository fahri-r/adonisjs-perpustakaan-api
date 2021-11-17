import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Member from 'App/Models/Member'
import MemberValidator from 'App/Validators/MemberValidator'

export default class MembersController {
    public async index({ response }: HttpContextContract) {
      const members = await Member.all()
  
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
  
      const member = new Member
      member.name = payload.name
      member.address = payload.address
      member.phone = payload.phone
      await member.save()
  
      return response.created({
        message: 'member created',
        data: member
      })
    }
  
    public async show({ response, params }: HttpContextContract) {
      const member = await Member.findOrFail(params.id)
  
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
      await member.save()
  
      return response.ok({
        message: 'member updated',
        data: member
      })
    }
  
    public async destroy({ response, params }: HttpContextContract) {
      const member = await Member.findOrFail(params.id)
      await member.delete()
  
      return response.ok({ message: 'member deleted' })
    }
}
