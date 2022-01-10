import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Employee from 'App/Models/Employee'
import Member from 'App/Models/Member'
import User from 'App/Models/User'
import EmailVerificationValidator from 'App/Validators/EmailVerificationValidator'
import TelegramLoginValidator from 'App/Validators/TelegramLoginValidator'
import WebLoginValidator from 'App/Validators/WebLoginValidator'

export default class AuthController {
    public async webLogin({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(WebLoginValidator)
        try {
            const token = await auth.use('api').attempt(payload.email, payload.password, {
                expiresIn: '12hours'
            })
            return response.ok({ message: 'login success', token })
        } catch (error) {
            return response.badRequest({ message: error.messages })
        }
    }

    public async telegramLogin({ request, response, auth }: HttpContextContract) {
        const payload = await request.validate(TelegramLoginValidator)
        const user = await User.findByOrFail('telegram_id', payload.telegram_id)

        let data = {}

        if (user.role == 'member') {
            const member = await Member.findByOrFail('user_id', user.id)
            data['member_id'] = member.id
        }  else {
            const employee = await Employee.findByOrFail('user_id', user.id)
            data['employee_id'] = employee.id
        }
        
        const token = await auth.use('api').generate(user, {
            expiresIn: '12hours'
        })

        data['type'] = token.type
        data['token'] = token.token
        data['expires_at'] = token.expiresAt
        return response.ok({ message: 'login success', token: data })
    }

    public async emailVerification({ request, response }: HttpContextContract) {
        const payload = await request.validate(EmailVerificationValidator)
        let user = await User.query()
            .where('email', payload.email)
            .andWhereHas('verificationCode', (codeQuery) => {
                codeQuery.where('code', payload.code)
            })
            .firstOrFail()
        user.verified = true
        await user.save()

        return response.ok({ message: 'verification success' })
    }
}
