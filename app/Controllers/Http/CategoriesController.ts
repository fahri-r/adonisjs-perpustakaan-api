import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import CategoryValidator from 'App/Validators/CategoryValidator'

export default class CategoriesController {
  public async index({ response }: HttpContextContract) {
    const categories = await Category.all()

    if (!categories.length) {
      return response.notFound({
        message: 'no data found'
      })
    }

    return response.ok({
      message: 'success get categories',
      data: categories
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(CategoryValidator)

    const category = new Category
    category.name = payload.name
    await category.save()

    return response.created({
      message: 'category created',
      data: category
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    return response.ok({
      message: 'success get category by id',
      data: category
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(CategoryValidator)

    const category = await Category.findOrFail(params.id)
    category.name = payload.name
    await category.save()

    return response.ok({
      message: 'category updated',
      data: category
    })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const category = await Category.findOrFail(params.id)
    await category.delete()

    return response.ok({ message: 'category deleted' })
  }
}
