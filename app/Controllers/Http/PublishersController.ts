import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Publisher from 'App/Models/Publisher'
import PublisherValidator from 'App/Validators/PublisherValidator'

export default class PublishersController {
    public async index({ response }: HttpContextContract) {
      const publishers = await Publisher.all()
  
      if (!publishers.length) {
        return response.notFound({
          message: 'no data found'
        })
      }
  
      return response.ok({
        message: 'success get publishers',
        data: publishers
      })
    }
  
    public async store({ request, response }: HttpContextContract) {
      const payload = await request.validate(PublisherValidator)
  
      const publisher = new Publisher
      publisher.name = payload.name
      publisher.address = payload.address
      publisher.phone = payload.phone
      await publisher.save()
  
      return response.created({
        message: 'publisher created',
        data: publisher
      })
    }
  
    public async show({ response, params }: HttpContextContract) {
      const publisher = await Publisher.findOrFail(params.id)
  
      return response.ok({
        message: 'success get publisher by id',
        data: publisher
      })
    }
  
    public async update({ request, response, params }: HttpContextContract) {
      const payload = await request.validate(PublisherValidator)
  
      const publisher = await Publisher.findOrFail(params.id)
      publisher.name = payload.name
      publisher.address = payload.address
      publisher.phone = payload.phone
      await publisher.save()
  
      return response.ok({
        message: 'publisher updated',
        data: publisher
      })
    }
  
    public async destroy({ response, params }: HttpContextContract) {
      const publisher = await Publisher.findOrFail(params.id)
      await publisher.delete()
  
      return response.ok({ message: 'publisher deleted' })
    }
}
