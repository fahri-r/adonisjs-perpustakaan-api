import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import User from 'App/Models/User'
import EmployeeStoreValidator from 'App/Validators/EmployeeStoreValidator'
import EmployeeUpdateValidator from 'App/Validators/EmployeeUpdateValidator'

export default class EmployeesController {
  public async index({ response }: HttpContextContract) {
    const employees = await Employee.query()
    .preload('user')

    if (!employees.length) {
      return response.notFound({
        message: 'no data found'
      })
    }

    return response.ok({
      message: 'success get employees',
      data: employees
    })
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(EmployeeStoreValidator)
    
    const user = new User
    user.email = payload.email
    user.password = payload.password
    
    const employee = new Employee
    employee.name = payload.name
    employee.address = payload.address
    employee.phone = payload.phone
    employee.image = payload.image

    try {
      await employee.save()
      await user.save()
    } catch (error) {
      return response.badRequest({ message: error.message })
    }  

    return response.created({
      message: 'employee created',
      data: employee
    })
  }

  public async show({ response, params }: HttpContextContract) {
    const employee = await Employee.query()
    .preload('user')
    .where('id', params.id)
    .firstOrFail()

    return response.ok({
      message: 'success get employee',
      data: employee
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const payload = await request.validate(EmployeeUpdateValidator)
    
    const employee = await Employee.findOrFail(params.id)
    employee.name = payload.name
    employee.address = payload.address
    employee.phone = payload.phone
    employee.image = payload.image

    const user = await User.findOrFail(employee.userId)
    user.email = payload.email
    
    if(payload.password) {
      user.password = payload.password
    }
    
    try {
      await user.save()
      await employee.related('user').associate(user)
    } catch (error) {
      return response.badRequest({ message: error.message })
    }  

    return response.ok({
      message: 'employee updated',
      data: employee
    })
  }

  public async destroy({ response, params }: HttpContextContract) {
    const employee = await Employee.findOrFail(params.id)
    const user = await User.findOrFail(employee.userId)
    await user.delete()

    return response.ok({ message: 'employee deleted' })}
}
