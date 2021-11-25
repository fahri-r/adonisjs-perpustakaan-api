import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Borrow from 'App/Models/Borrow'
import Employee from 'App/Models/Employee'
import BorrowValidator from 'App/Validators/BorrowValidator'

export default class BorrowsController {
    public async index({ response }: HttpContextContract) {
        const borrows = await Borrow.query()
            .preload('employee')
            .preload('member')
            .preload('book')

        if (!borrows.length) {
            return response.notFound({
                message: 'no data found'
            })
        }

        return response.ok({
            message: 'success get borrows',
            data: borrows
        })
    }

    public async store({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(BorrowValidator)
        const employee = await Employee.findByOrFail('user_id', auth.user!.id)

        const borrow = new Borrow
        borrow.bookId = payload.book_id
        borrow.memberId = payload.member_id
        borrow.employeeId = employee.id
        borrow.borrowDate = payload.borrow_date
        borrow.returnDate = payload.return_date
        if(payload.status) {
            borrow.status = payload.status
        }
        await borrow.save()

        return response.created({
            message: 'borrow created',
            data: borrow
        })
    }

    public async show({ response, params }: HttpContextContract) {
        const borrow = await Borrow.query()
            .preload('employee')
            .preload('member')
            .preload('book')
            .where('id', params.id)
            .firstOrFail()

        return response.ok({
            message: 'success get borrow',
            data: borrow
        })
    }

    public async update({ request, response, params, auth }: HttpContextContract) {
        const payload = await request.validate(BorrowValidator)
        const employee = await Employee.findByOrFail('user_id', auth.user!.id)
    
        const borrow = await Borrow.findOrFail(params.id)
        borrow.bookId = payload.book_id
        borrow.memberId = payload.member_id
        borrow.employeeId = employee.id
        borrow.borrowDate = payload.borrow_date
        borrow.returnDate = payload.return_date
        if(payload.status) {
            borrow.status = payload.status
        }
        await borrow.save()
    
        return response.ok({
          message: 'borrow updated',
          data: borrow
        })
      }
    
    public async destroy({ response, params }: HttpContextContract) {
        const borrow = await Borrow.findOrFail(params.id)
        await borrow.delete()

        return response.ok({ message: 'borrow deleted' })
    }
}
