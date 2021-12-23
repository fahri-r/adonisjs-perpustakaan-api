import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Book from 'App/Models/Book'
import BookValidator from 'App/Validators/BookValidator'

export default class BooksController {
  public async index({ request, response }: HttpContextContract) {
    let books = await Book.query()
    .preload('category')
    .preload('publisher')
    
    if (request.qs().title) {
      books = await Book.query()
      .preload('category')
      .preload('publisher')
      .where('title', 'like', `%${request.qs().title}%`)
    }

    if (!books.length) {
      return response.notFound({
        message: 'no data found'
      })
    }

    return response.ok({
      message: 'success get books',
      data: books
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(BookValidator)

    const book = new Book
    book.title = payload.title
    book.description = payload.description
    book.year = payload.year
    book.author = payload.author
    book.qty = payload.qty
    book.page = payload.page
    book.categoryId = payload.category_id
    book.publisherId = payload.publisher_id
    await book.save()

    return response.created({
      message: 'book created',
      data: book
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const book = await Book.query()
      .preload('category')
      .preload('publisher')
      .where('id', params.id)
      .firstOrFail()

    return response.ok({
      message: 'success get book',
      data: book
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(BookValidator)

    const book = await Book.findOrFail(params.id)
    book.title = payload.title
    book.description = payload.description
    book.year = payload.year
    book.author = payload.author
    book.qty = payload.qty
    book.page = payload.page
    book.categoryId = payload.category_id
    book.publisherId = payload.publisher_id
    await book.save()

    return response.ok({
      message: 'book updated',
      data: book
    })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const book = await Book.findOrFail(params.id)
    await book.delete()

    return response.ok({ message: 'book deleted' })
  }
}
