import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Borrow from 'App/Models/Borrow'

export default class MembersBorrowsController {
  public async index({ request, response, params }: HttpContextContract) {
    let borrows = await Borrow.query()
                .preload('book')
                .preload('employee')
                .where('member_id', params.member_id)
    
    if (request.qs().return_date) {
        borrows = await Borrow.query()
                .preload('book')
                .preload('employee')
                .where('member_id', params.member_id)
                .andWhere('return_date', request.qs().return_date)
    }

    if (!borrows.length) {
      return response.notFound({
        message: 'no data found'
      })
    }

    return response.ok({
      message: 'success get members borrows',
      data: borrows
    })
  }
}
